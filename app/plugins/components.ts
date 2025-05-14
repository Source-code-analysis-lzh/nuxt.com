// #components 是 Nuxt 自动导入机制中组件的虚拟模块入口，所有被自动扫描的组件（如 ~/components 目录下的组件和模块注册的组件）都会在此虚拟模块中注册。通过此路径可以直接访问这些组件，无需手动指定物理路径
import { UButton, UPageGrid, UPageCard, NuxtImg, NuxtLink } from '#components'

// Add them to main entry (useful for content usage)
// 添加这些组件到主入口（对 Markdown 内容渲染特别有用）
export default defineNuxtPlugin((nuxtApp) => {
  // 全局注册 NuxtLink 组件，用于页面间导航
  nuxtApp.vueApp.component('NuxtLink', NuxtLink)
  // 全局注册 NuxtImg 组件，用于优化图片加载
  nuxtApp.vueApp.component('NuxtImg', NuxtImg)
  // 全局注册 UButton 组件，用于统一按钮样式
  nuxtApp.vueApp.component('UButton', UButton)
  // 全局注册 UPageGrid 组件，用于布局页面网格结构
  nuxtApp.vueApp.component('UPageGrid', UPageGrid)
  // 全局注册 UPageCard 组件，用于展示卡片式内容区块
  nuxtApp.vueApp.component('UPageCard', UPageCard)
})
