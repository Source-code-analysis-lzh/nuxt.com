/**
 * Nuxt 插件：处理 Newsletter 订阅确认逻辑
 * 当 URL 中包含 email 和 confirmation 参数时，自动发送订阅确认请求
 */
export default defineNuxtPlugin(() => {
  // 获取全局的 toast 提示组件，用于显示成功或错误消息
  const toast = useToast()

  // 在应用挂载完成后执行
  useNuxtApp().hook('app:mounted', () => {
    // 从当前路由的查询参数中获取 email 和 confirmation
    const { email, confirmation } = useRoute().query
    // 如果存在 email 和 confirmation 参数，则进行订阅确认
    if (email && confirmation) {
      // 向后端 API 发送 POST 请求进行验证
      $fetch('https://api.nuxt.com/newsletter/confirm', {
        method: 'POST',
        body: { email, confirmation }
      }).then(() => {
        // 成功：弹出成功提示
        toast.add({ title: 'Subscription succeed', description: 'You have been successfully subscribed to Nuxt newsletter.', color: 'success' })
      }).catch((err) => {
        // 失败：弹出错误提示，显示后端返回的消息
        toast.add({ title: 'Subscription failed', description: err.data?.message || '', color: 'error' })
      })
    }
  })
})
