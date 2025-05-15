<script setup>
import { vIntersectionObserver } from '@vueuse/components'

// 使用 useImage() 获取图像处理能力（用于预加载头像）
const getImage = useImage()
// 当前显示头像块的起始索引
const start = ref(0)
// 每页显示数量：6列 × 4行 = 24个头像
const total = 6 * 4
// 存储所有贡献者用户名列表（响应式状态）
const contributors = useState('contributors-grid', () => [])
// 标记当前是否进入视口，用于控制自动播放
const intersecting = ref(false)
let _contributors // 临时存储获取到的贡献者数据
let currentTimeout // 定时器引用，用于轮播

// IntersectionObserver 回调函数：检测组件是否进入视口
function onIntersectionObserver([{ isIntersecting }]) {
  intersecting.value = isIntersecting
  if (isIntersecting) {
    if (_contributors) {
      contributors.value = _contributors // 如果已有数据则恢复显示
    }
    startTimer() // 开启轮播定时器
  } else {
    stopTimer() // 离开视口则停止轮播
  }
}
// Fetch on client-side
// 页面挂载后请求贡献者数据
onMounted(async () => {
  if (contributors.value.length) return // 已有缓存数据则跳过请求
  // 请求 GitHub 贡献者数据
  _contributors = await $fetch('https://api.nuxt.com/contributors').then(data => data.slice(0, total * 10).map(c => c.username)) // 取部分数据并提取用户名
  await loadImages(_contributors.slice(0, total)) // 预加载前 24 张头像图片
  if (!contributors.value.length && intersecting.value) {
    contributors.value = _contributors // 若仍在视口内，则赋值渲染
  }
})
// 组件卸载前清除定时器
onBeforeUnmount(stopTimer)

// 计算属性：返回当前要展示的贡献者头像数组
const $contributors = computed(() => contributors.value.length ? contributors.value.slice(start.value, start.value + total) : Array.from({ length: total }).fill(null)) // 占位符，避免 SSR 错误

// 启动定时器：每隔一段时间切换一组贡献者头像
function startTimer(ms = 5000) {
  currentTimeout = setTimeout(nextContributors, ms)
}

// 停止定时器
function stopTimer() {
  clearTimeout(currentTimeout)
  currentTimeout = null
}

// 加载指定用户名的头像图片（预加载）
async function loadImages(usernames) {
  const size = window.devicePixelRatio === 2 ? '160px' : '80px'
  await Promise.all(usernames.map((username) => {
    const img = new Image()
    img.src = getImage(`/gh_avatar/${username}`, { height: size, width: size, format: 'auto' }, { provider: 'ipx' })

    return new Promise((resolve) => {
      img.onload = resolve
      img.onerror = resolve
    })
  }))
}

// 切换下一批贡献者头像，并重新启动定时器
async function nextContributors() {
  const newStart = (start.value + total >= contributors.value.length ? 0 : start.value + total)
  await loadImages(contributors.value.slice(newStart, newStart + total))
  start.value = newStart
  startTimer()
}
</script>

<template>
  <div
    v-intersection-observer="onIntersectionObserver"
    class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-6 gap-4 sm:gap-8 lg:gap-6 xl:gap-8 xl:p-8"
    @mouseenter="stopTimer()"
    @mouseleave="startTimer(2500)"
  >
    <div
      v-for="(username, index) in $contributors"
      :key="index"
      class="pt-[100%] relative"
    >
      <Transition
        name="avatar"
        mode="out-in"
        appear
      >
        <a
          v-if="username"
          :key="username"
          :href="`https://nuxters.nuxt.com/${username}`"
          target="_blank"
          class="absolute inset-0 flex transition-all"
          :style="{
            'transition-delay': `${(index % 8 + Math.floor(index / 8)) * 20}ms`
          }"
        >
          <UTooltip :text="username" class="w-full">
            <NuxtImg
              :src="`/gh_avatar/${username}`"
              provider="ipx"
              densities="x1 x2"
              height="80"
              format="auto"
              width="80"
              :alt="username"
              loading="lazy"
              :title="username"
              class="rounded-xl w-full h-full transition lg:hover:scale-125 bg-muted"
            />
          </UTooltip>
        </a>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.avatar-enter-active,
.avatar-leave-active {
  transition: all 0.4s ease;
}

.avatar-enter-from,
.avatar-leave-to {
  opacity: 0.1;
  transform: scale(0.5);
}
</style>
