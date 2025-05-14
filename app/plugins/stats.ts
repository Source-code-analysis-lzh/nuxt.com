import type { Stats } from '~/composables/useStats'

/**
 * Nuxt 插件：用于加载和初始化网站统计信息（如模块数量、贡献者数量等）
 * 在服务器端优先加载，若失败或未在服务端运行，则在客户端加载
 */
export default defineNuxtPlugin(async () => {
  // 获取全局的 stats 状态（可能来自 useState）
  const stats = useStats()

  // 如果当前是服务器端渲染（SSR）
  if (import.meta.server) {
    // 从 API 获取统计数据并赋值给 stats.value
    // 若请求失败则设为 null，避免阻塞渲染
    stats.value = await $fetch<Stats>('https://api.nuxt.com/stats').catch(() => null)
  }
  // 当 Nuxt 应用准备就绪时执行（客户端）
  onNuxtReady(async () => {
    // 如果 stats 尚未加载成功（可能是客户端或服务端请求失败）
    if (!stats.value) {
      // 再次尝试从 API 获取统计数据
      stats.value = await $fetch<Stats>('https://api.nuxt.com/stats')
    }
  })
})
