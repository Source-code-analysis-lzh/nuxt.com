<script setup lang="ts">
//  @nuxtjs/color-mode
const colorMode = useColorMode()
// composables
const { searchGroups, searchLinks, searchTerm } = useNavigation()
const { fetchList } = useModules()

// 主题颜色切换
const color = computed(() => colorMode.value === 'dark' ? '#020420' : 'white')

// 使用 Promise.all 并行执行两个异步数据请求
const [{ data: navigation }, { data: files }] = await Promise.all([
  // 第一个请求：获取导航数据
  useAsyncData('navigation', () => {
    return Promise.all([
      // 查询 'docs' 集合的导航信息，指定字段为 ['titleTemplate']
      queryCollectionNavigation('docs', ['titleTemplate']),
      // 查询 'blog' 集合的导航信息
      queryCollectionNavigation('blog')
    ])
  }, {
    // 数据转换：将二维数组展平为一维数组
    transform: data => data.flat()
  }),
  // 第二个请求：获取搜索相关的数据（仅在客户端执行）
  useLazyAsyncData('search', () => {
    return Promise.all([
      // 查询 'docs' 集合的搜索段落信息
      queryCollectionSearchSections('docs'),
      // 查询 'blog' 集合的搜索段落信息
      queryCollectionSearchSections('blog')
    ])
  }, {
    server: false, // 禁止在服务器端执行
    // 数据转换：将二维数组展平为一维数组
    transform: data => data.flat()
  })
])

// 当 Nuxt 应用准备就绪时，调用 fetchList 函数加载模块列表数据
onNuxtReady(() => fetchList())

// 设置页面头部信息（客户端和服务器端通用）
useHead({
  // 动态设置页面标题
  titleTemplate: title => title ? `${title} · Nuxt` : 'Nuxt: The Intuitive Web Framework',
  // 设置主题颜色 meta 标签
  meta: [
    { key: 'theme-color', name: 'theme-color', content: color }
  ]
})

// 仅在服务器端执行的头部和 SEO 设置
if (import.meta.server) {
  // 设置基础 meta、link 和 html 属性
  useHead({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ],
    htmlAttrs: {
      lang: 'en'
    }
  })
  // 设置 SEO 相关的 meta 标签
  useSeoMeta({
    ogSiteName: 'Nuxt', // 定义网站在 Open Graph 协议中的全局名称，通常用于跨页面统一标识网站来源
    ogType: 'website', // 指定页面内容的类型，帮助社交媒体平台正确解析页面属性
    twitterCard: 'summary_large_image', // 定义 Twitter 卡片类型，控制链接在 Twitter 上的展示形式
    twitterSite: 'nuxt_js' // 关联网站官方 Twitter 账号，提升品牌曝光
  })
}

// Provide with non-null assertion since this is top level app setup
// 提供导航数据给子组件使用，使用非空断言操作符确保 navigation 不为 null
provide('navigation', navigation!)

// 获取当前路由对象
const route = useRoute()
// 根据路由元信息中的 heroBackground 字段生成背景类名，若无则返回空字符串
const heroBackgroundClass = computed(() => route.meta?.heroBackground || '')
// 从 useLoadingIndicator 中解构出 isLoading 状态，用于指示页面加载状态
const { isLoading } = useLoadingIndicator()
// 定义 appear 和 appeared 响应式变量，用于控制 Hero 背景的动画效果
const appear = ref(false) // 控制是否开始显示动画
const appeared = ref(false) // 控制是否完成动画

// 在组件挂载后执行动画逻辑
onMounted(() => {
  setTimeout(() => {
    // 第一帧：触发 appear 动画
    appear.value = true
    // 第二帧：1秒后触发 appeared 动画，表示动画完成
    setTimeout(() => {
      appeared.value = true
    }, 1000)
  }, 0)
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <!--    菜单 banner 上面的通知 -->
    <UBanner
      id="nuxt-tips-michael"
      title="Learn Nuxt with a Collection of 100+ Tips!"
      icon="i-lucide-wand"
      to="https://michaelnthiessen.com/nuxt-tips-collection?aff=J0Emk"
      close
      :actions="[
        {
          label: 'View Tips',
          color: 'neutral',
          variant: 'outline',
          trailingIcon: 'i-lucide-arrow-right',
          to: 'https://michaelnthiessen.com/nuxt-tips-collection?aff=J0Emk'
        }
      ]"
    />
    <!-- 网页头 -->
    <AppHeader />

    <UMain class="relative">
      <HeroBackground
        class="absolute w-full -top-px transition-all text-primary shrink-0 -z-10"
        :class="[
          isLoading ? 'animate-pulse' : (appear ? heroBackgroundClass : 'opacity-0'),
          appeared ? 'duration-[400ms]' : 'duration-1000'
        ]"
      />

      <NuxtPage />
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        v-model:search-term="searchTerm"
        :files="files"
        :navigation="navigation"
        :groups="searchGroups"
        :links="searchLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
