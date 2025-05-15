<template>
  <div class="w-full min-h-[500px] mx-auto mb-6 overflow-hidden text-3xl rounded-md sandbox mt-4">
    <iframe
      v-if="url"
      :src="url"
      title="Sandbox editor"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      class="w-full h-full min-h-[700px] overflow-hidden bg-gray-100 dark:bg-gray-800"
    />
    <span v-else class="flex-1 text-white">Loading Sandbox...</span>
  </div>
</template>

<script setup lang="ts">
// 定义组件 props
const props = defineProps({
  src: { // 可选自定义沙箱 URL
    type: String,
    default: ''
  },
  repo: { // GitHub 仓库名称
    type: String,
    default: ''
  },
  branch: { // 分支名称
    type: String,
    default: ''
  },
  dir: { // 目录路径
    type: String,
    default: ''
  },
  file: { // 默认展示的文件
    type: String,
    default: 'app.vue'
  }
})

// 使用 useColorMode 获取当前主题（light/dark）
const colorMode = useColorMode()
// 用于保存最终的 iframe 源地址
const url = ref('')

// 组件挂载时设置 iframe 的 src
onMounted(() => {
  url.value = props.src || `https://stackblitz.com/github/${props.repo}/tree/${props.branch}/${props.dir}?embed=1&file=${props.file}&theme=${colorMode.value}`
})
</script>

<style lang="postcss" scoped>
.sandbox,
.sandbox iframe {
  @apply w-full rounded-md rounded-tl-none rounded-tr-none overflow-hidden h-64;
  height: 700px;
}
</style>
