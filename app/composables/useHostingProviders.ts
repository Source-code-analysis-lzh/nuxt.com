import type { DeployCollectionItem } from '@nuxt/content'

/**
 * 自定义钩子用于获取托管提供商列表
 *
 * 该钩子初始化一个状态来存储托管提供商列表，并提供一个函数来获取这些提供商
 * 使用 useState 来管理 providers 状态，该状态是一个 DeployCollectionItem 数组
 *
 * @returns 返回一个对象，包含 providers 状态和 fetchList 函数
 */
export const useHostingProviders = () => {
  // 初始化托管提供商列表状态
  const providers = useState<DeployCollectionItem[]>('hostingProviders', () => [])

  /**
   * 异步函数，用于从服务器获取托管提供商列表
   *
   * 如果 providers 状态已经有值，则不执行任何操作，以避免重复获取
   * 使用 useAsyncData 和 queryCollection 来获取托管提供商数据，并过滤掉路径为 '/deploy' 的项
   * 如果请求失败，重置 providers 状态并返回错误
   */
  async function fetchList() {
    if (providers.value.length) {
      return
    }

    try {
      // 使用 useAsyncData 获取托管提供商数据
      const { data } = await useAsyncData('hosting-provider', () => queryCollection('deploy').all())

      // 更新 providers 状态，过滤掉不需要的项
      providers.value = data.value?.filter(article => article.path !== '/deploy') || []
    } catch (e) {
      // 如果获取失败，重置 providers 状态并返回错误
      providers.value = []
      return e
    }
  }

  // 返回 providers 状态和 fetchList 函数
  return {
    providers,
    fetchList
  }
}
