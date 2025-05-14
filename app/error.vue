<script setup lang="ts">
import type { NuxtError } from '#app'

// 设置 SEO 元信息，用于 404 页面展示
useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

// 定义组件接收的 props，包含一个 NuxtError 对象
defineProps<{ error: NuxtError }>()

// 使用 useNavigation 获取搜索相关的数据：分组、链接和搜索词
const { searchGroups, searchLinks, searchTerm } = useNavigation()

// 并行加载导航和搜索文件数据
const [{ data: navigation }, { data: files }] = await Promise.all([
  // 使用 useAsyncData 加载导航数据（用于构建侧边栏或菜单）
  useAsyncData('navigation', () => {
    return Promise.all([
      // nuxt/content 模块中用来生成给定集合的导航树
      queryCollectionNavigation('docs'), // 查询 docs 集合的导航结构
      queryCollectionNavigation('blog') // 查询 blog 集合的导航结构
    ])
  }, {
    // 将返回的二维数组展平为一维数组，便于后续使用
    transform: data => data.flat()
  }),
  // 使用 useLazyAsyncData 延迟加载搜索数据（仅在客户端执行）
  useLazyAsyncData('search', () => {
    return Promise.all([
      queryCollectionSearchSections('docs'), // 查询 docs 的搜索内容模块
      queryCollectionSearchSections('blog') // 查询 blog 的搜索内容模块
    ])
  }, {
    server: false, // 禁止在服务端执行此请求
    // 同样对搜索结果进行展平处理
    transform: data => data.flat()
  })
])

// 获取模块数据并挂载到页面，onNuxtReady 表示等 Nuxt 准备好后执行
const { fetchList } = useModules()
onNuxtReady(() => fetchList())

// 提供 navigation 数据给子组件使用（依赖注入）
provide('navigation', navigation)
</script>

<template>
  <UApp>
    <AppHeader />

    <UError :error="error" />

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
