import type { Module, Filter, Stats } from '~/types'

type ModuleStatsKeys = 'version' | 'downloads' | 'stars' | 'publishedAt' | 'createdAt'

const iconsMap = {
  Official: 'i-lucide-medal',
  Analytics: 'i-lucide-bar-chart',
  CMS: 'i-lucide-pencil',
  CSS: 'i-lucide-palette',
  Database: 'i-lucide-database',
  Devtools: 'i-lucide-wrench',
  Ecommerce: 'i-lucide-shopping-cart',
  Extensions: 'i-lucide-puzzle',
  Fonts: 'i-lucide-type',
  Images: 'i-lucide-image',
  Libraries: 'i-lucide-library',
  Monitoring: 'i-lucide-timer',
  Payment: 'i-lucide-credit-card',
  Performance: 'i-lucide-gauge',
  Request: 'i-lucide-unplug',
  Security: 'i-lucide-shield',
  SEO: 'i-lucide-search',
  UI: 'i-lucide-layout'
}

/**
 * 获取模块图标URL
 *
 * 该函数根据提供的图标名称和大小参数，返回对应的图标URL如果未提供图标名称或图标名称为空，
 * 则函数返回空如果图标名称是一个有效的URL，则直接返回该URL否则，构造一个默认的图标URL并返回
 *
 * @param icon 图标名称如果为空，则返回空如果以"http://"或"https://"开头，则认为是一个有效的URL
 * @param _size 图标大小，单位为像素目前未使用该参数
 * @returns 返回图标的URL如果输入无效，则返回空
 */
export const moduleImage = function (icon: string = '', _size: number = 80) {
  // 检查图标名称是否为空如果为空，则直接返回
  if (!icon) return

  // 检查图标名称是否为一个有效的URL如果是，则直接返回该URL
  if (/^https?:\/\//.test(icon)) return icon

  // 构造默认的图标URL并返回
  return `https://raw.githubusercontent.com/nuxt/modules/main/icons/${icon}`
  // 如果图标名称以 ".svg" 结尾，则构造一个默认的图标URL并返回
  // if (/\.svg$/.test(icon)) return `https://raw.githubusercontent.com/nuxt/modules/main/icons/${icon}`

  // 构造一个带大小参数的图标URL并返回
  // return `https://ipx.nuxt.com/s_${size},f_auto/gh/nuxt/modules/main/icons/${icon}`
}

/**
 * 根据类别返回对应的模块图标
 *
 * 此函数旨在为不同的模块类别提供视觉上的图标标识
 * 它通过传入的类别参数在图标映射中查找对应的图标并返回
 * 如果找不到对应的图标，则返回一个默认图标
 *
 * @param category 模块的类别，用作在图标映射中查找对应图标的键
 * @returns 返回找到的图标或默认图标
 */
export const moduleIcon = function (category: string) {
  // 使用传入的类别作为键值在图标映射中查找对应的图标
  // 如果找不到对应的图标，则返回一个默认图标
  return iconsMap[category as keyof typeof iconsMap] || 'i-lucide-box'
}

/**
 * 自定义 Hook，用于管理模块相关的操作和数据。
 * 该 Hook 从远程源获取模块数据，并管理与模块相关的状态，包括排序、过滤和类别管理。
 */
export const useModules = () => {
  // 路由相关对象，用于获取路由信息和执行路由导航
  const route = useRoute()
  const router = useRouter()

  // 模块统计信息的状态管理，初始化为默认值
  const stats = useState<Stats>('module-stats', () => ({
    maintainers: 0, // 维护者数量
    contributors: 0, // 贡献者数量
    modules: 0 // 模块总数
  }))

  // 模块列表的状态管理，初始化为空数组
  const modules = useState<Module[]>('modules', () => [])

  // 单个模块的状态管理，初始化为空对象
  const module = useState<Module>('module', () => ({} as Module))

  // Data fetching
  /**
   * 从服务器获取模块列表和统计信息。
   * 如果模块列表已经填充，则不再重新获取。
   */
  async function fetchList() {
    if (modules.value.length) {
      return
    }

    const res = await $fetch<{ modules: Module[], stats: Stats }>('https://api.nuxt.com/modules')
    if (res?.modules) {
      modules.value = res.modules
      stats.value = res.stats
    }
  }

  // Data
  // 排序选项
  const sorts: Filter[] = [
    { key: 'downloads', label: 'Downloads' },
    { key: 'stars', label: 'Stars' },
    { key: 'publishedAt', label: 'Updated' },
    { key: 'createdAt', label: 'Created' }
  ]

  // 排序顺序选项（升序/降序）
  const orders: Filter[] = [
    { key: 'desc', label: 'Desc', icon: 'i-lucide-arrow-down-wide-narrow' },
    { key: 'asc', label: 'Asc', icon: 'i-lucide-arrow-up-wide-narrow' }
  ]

  /**
   * 计算类别列表，基于图标映射和当前路由。
   * 返回包含每个类别的键、标签、激活状态、导航链接和图标的对象数组。
   */
  const categories = computed<Filter[]>(() => {
    return Object.keys(iconsMap)
      .map((category) => {
        return {
          key: category,
          label: category,
          active: route.query.category === category,
          to: { name: 'modules', query: category === route.query.category ? undefined : { category }, state: { smooth: '#smooth' } },
          icon: iconsMap[category as keyof typeof iconsMap] || undefined,
          click: (e: Event) => {
            if (route.query.category !== category) {
              return
            }

            e.preventDefault()

            router.replace({ query: { ...route.query, category: undefined } })
          }
        }
      })
  })

  // 获取当前选中的类别
  const selectedCategory = computed(() => {
    return categories.value.find(category => category.label === route.query.category)
  })

  // 获取当前选中的排序方式
  const selectedSort = computed(() => {
    return sorts.find(sort => sort.key === route.query.sortBy) || sorts[0]
  })

  // 获取当前选中的排序顺序
  const selectedOrder = computed(() => {
    return orders.find(order => order.key === route.query.orderBy) || orders[0]
  })

  // 获取当前的搜索查询文本
  const q = computed<string>(() => {
    return route.query.q as string
  })

  /**
   * 比较函数，用于将赞助商或官方模块排在前面。
   * @param a 第一个模块
   * @param b 第二个模块
   * @returns 排序结果
   */
  const isSponsorOrOfficial = (a: Module, b: Module) => {
    if (a.sponsor && !b.sponsor) {
      return -1
    } else if (!a.sponsor && b.sponsor) {
      return 1
    } else if (a.type === 'official' && b.type !== 'official') {
      return -1
    } else if (a.type !== 'official' && b.type === 'official') {
      return 1
    } else {
      return 0
    }
  }

  /**
   * 过滤并排序后的模块列表。
   * 根据所选筛选条件和排序选项对模块进行过滤和排序。
   */
  const filteredModules = computed<Module[]>(() => {
    let filteredModules = [...modules.value]
      .filter((module: Module) => {
        // 类别筛选
        if (selectedCategory.value) {
          if (selectedCategory.value.key === 'Official') {
            return module.type === 'official'
          }
          if (module.category !== selectedCategory.value.key) {
            return false
          }
        }
        // 搜索查询匹配
        const queryRegExp = searchTextRegExp(q.value as string)
        if (q.value && !['name', 'npm', 'category', 'description', 'repo'].map(field => module[field as keyof Module]).filter(Boolean).some(value => typeof value === 'string' && value.search(queryRegExp) !== -1)) {
          return false
        }

        return true
      })
      .sort((a: Module, b: Module) => {
        const sortKey = selectedSort.value?.key as ModuleStatsKeys
        if (sortKey && a.stats && b.stats) {
          return (b.stats[sortKey] as number) - (a.stats[sortKey] as number)
        }
        return 0
      })

    // 如果是升序，则反转数组
    if (selectedOrder.value?.key === 'asc') {
      filteredModules = filteredModules.reverse()
    }

    // sponsored & official modules in first place if no sort or order by
    // 如果没有指定排序或排序顺序，则将赞助商和官方模块排在前面
    if (!route.query.sortBy && !route.query.orderBy) {
      return filteredModules.sort(isSponsorOrOfficial)
    }
    return filteredModules
  })

  // 返回可供组件使用的函数和计算属性
  return {
    // Data fetching
    fetchList,
    // Data
    // versions,
    sorts,
    orders,
    // Computed
    stats,
    modules,
    filteredModules,
    module,
    categories,
    // types,
    // contributors,
    // stats,
    selectedCategory,
    // selectedType,
    // selectedVersion,
    selectedSort,
    selectedOrder,
    q
  }
}
