/**
 * 自定义钩子用于管理过滤器状态
 * 该钩子旨在通过更新路由查询参数来添加或更新过滤条件，以便于在前端实现基于URL的过滤功能
 * @param entity 实体名称，用于标识路由名称
 * @returns 返回一个包含替换路由函数的对象
 */
export const useFilters = (entity: string) => {
  // 获取当前路由信息
  const route = useRoute()
  // 获取路由实例以进行导航
  const router = useRouter()

  /**
   * 替换当前路由的查询参数
   * 此函数用于更新URL中的过滤参数，允许传入一个名称和一个参数值或参数对象
   * 如果参数是字符串，则直接使用该字符串作为查询参数值；如果参数是对象，则使用其key属性作为查询参数值
   * @param name 查询参数的名称，通常代表某种过滤条件
   * @param param 查询参数的值，可以是字符串或包含key属性的对象
   */
  const replaceRoute = (name: string, param: string | { key: string | number }) => {
    router.replace({
      name: entity,
      query: {
        ...route.query,
        [name]: typeof param === 'string' ? param : param?.key || undefined
      },
      state: {
        smooth: '#smooth'
      }
    })
  }

  // 返回替换路由函数，以便于在组件中使用
  return {
    replaceRoute
  }
}
