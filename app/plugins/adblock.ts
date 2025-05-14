/**
 * Nuxt 插件：检测用户是否启用了广告拦截器
 * 如果检测到广告被拦截，则设置 adBlocked 为 true
 */
export default defineNuxtPlugin(() => {
  // 创建一个响应式变量，用于跟踪广告是否被拦截
  const adBlocked = ref(false)

  // 在 Nuxt 应用准备就绪后执行检测
  onNuxtReady(async () => {
    if (await adsBlocked()) {
      adBlocked.value = true
    }
  })

  /**
   * 检测广告是否被拦截的方法
   * 通过尝试加载 Carbon Ads 的脚本资源来判断
   * 如果请求失败（被拦截），则认为广告被屏蔽
   */
  const adsBlocked = async () => {
    return await $fetch('https://cdn.carbonads.com/carbon.js?serve=CWYD553E&placement=nuxtcom', {
      method: 'HEAD',
      mode: 'no-cors'
    })
      .then(() => false) // 成功加载，广告未被拦截
      .catch(() => true) // 加载失败，可能广告被拦截
  }

  // 提供 adBlocked 状态给应用其他部分使用
  return {
    provide: {
      ads: {
        adBlocked
      }
    }
  }
})
