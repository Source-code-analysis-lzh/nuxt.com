import type { Agency, Filter } from '../types'
import { slugify, random } from '../utils'

/**
 * 自定义 Hook：用于管理企业机构（Agency）数据及筛选逻辑
 * 提供了数据获取、服务/地区/位置过滤、选中状态跟踪和随机广告展示功能
 */
export const useEnterpriseAgencies = () => {
  // 获取当前路由信息，用于读取查询参数
  const route = useRoute()
  // 使用 useState 管理机构列表，初始为空数组
  const agencies = useState<Agency[]>('enterprise-agencies', () => [])

  // Data fetching
  /**
   * 从服务器获取机构列表数据
   * 如果已有数据则不再重复获取
   * 对原始数据进行转换处理，包括 services, regions, location 字段的格式化
   */
  async function fetchList() {
    if (agencies.value.length) {
      return
    }

    try {
      // 从集合中获取所有机构数据
      const { data: agenciesData } = await useAsyncData('agencies', () => queryCollection('agencies').all())

      if (agenciesData.value && Array.isArray(agenciesData.value)) {
        // 数据格式转换：将字符串字段转为 Filter 类型对象，并使用 slugify 格式化 key
        agencies.value = agenciesData.value.map((agency: any) => ({
          ...agency,
          services: (agency.services || []).map((service: string) => ({
            key: slugify(service),
            title: service
          })),
          regions: (agency.regions || []).map((region: string) => ({
            key: slugify(region),
            title: region
          })),
          location: agency.location
            ? {
                key: slugify(agency.location),
                title: agency.location
              }
            : null
        })) as Agency[]
      }
    } catch (e) {
      // 出现错误时清空数据并返回错误
      agencies.value = []
      return e
    }
  }

  // Computed
  /**
   * 根据当前选中的服务和区域筛选机构
   * 返回一个 computed 响应式属性，自动更新当筛选条件变化时
   */
  const filteredAgencies = computed<Agency[]>(() => {
    return [...agencies.value]
      .filter((agency) => {
        // 按服务筛选
        if (selectedService.value && !agency.services.find(service => service.key === selectedService.value?.key)) {
          return false
        }
        // 按区域筛选
        if (selectedRegion.value && !agency.regions.find(region => region.key === selectedRegion.value?.key)) {
          return false
        }

        return true
      })
  })

  /**
   * 提取所有唯一的服务选项（services）
   * 并计算每个服务是否被当前查询选中
   */
  const services = computed<Filter[]>(() => {
    const ids = new Set<string>()
    // 扁平化所有机构的服务项，并去重
    const services = agencies.value.flatMap((agency) => {
      return agency.services.filter((r) => {
        if (ids.has(r.key as string)) {
          return false
        }
        ids.add(r.key as string)
        return true
      })
    })
    // 添加 active 和 to 字段用于 UI 展示和导航
    return services
      .map((service) => {
        const currentService = route.query.service?.toString() || ''
        const isSelected = currentService === service.key

        return {
          ...service,
          exactQuery: true,
          active: isSelected,
          to: {
            name: 'enterprise-agencies',
            query: {
              ...route.query,
              service: isSelected ? undefined : service.key
            },
            state: { smooth: '#smooth' }
          }
        }
      })
      .sort((a, b) => {
        // 按标题排序
        if (a.title && b.title) {
          return a.title.localeCompare(b.title)
        }
        return 0
      })
  })

  /**
   * 提取所有唯一的地点选项（locations）
   * 并计算每个地点是否被当前查询选中
   */
  const locations = computed<Filter[]>(() => {
    // 去重并过滤 null 值
    return [...new Set(agencies.value
      .map(agency => agency.location)
      .filter((location): location is NonNullable<typeof location> => location !== null)
    )]
      .map((location) => {
        const currentLocation = route.query.location?.toString() || ''
        const isSelected = currentLocation === location.key

        return {
          key: location.key,
          title: location.title,
          exactQuery: true,
          active: isSelected,
          to: {
            name: 'enterprise-agencies',
            query: {
              ...route.query,
              location: isSelected ? undefined : location.key
            },
            state: { smooth: '#smooth' }
          }
        }
      })
      .sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title)
        }
        return 0
      })
  })

  /**
   * 提取所有唯一的区域选项（regions）
   * 并计算每个区域是否被当前查询选中
   */
  const regions = computed<Filter[]>(() => {
    const ids = new Set<string>()
    const regions = agencies.value.flatMap((agency) => {
      return agency.regions.filter((r) => {
        if (ids.has(r.key as string)) {
          return false
        }
        ids.add(r.key as string)
        return true
      })
    })
    return regions
      .map((region) => {
        const currentRegion = route.query.region?.toString() || ''
        const isSelected = currentRegion === region.key

        return {
          key: region.key,
          title: region.title,
          exactQuery: true,
          active: isSelected,
          to: {
            name: 'enterprise-agencies',
            query: {
              ...route.query,
              region: isSelected ? undefined : region.key
            },
            state: { smooth: '#smooth' }
          }
        }
      })
      .sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title)
        }
        return 0
      })
  })

  /**
   * 计算当前选中的服务项
   */
  const selectedService = computed(() => {
    return services.value.find(service => service.key === route.query.service)
  })

  /**
   * 计算当前选中的区域项
   */
  const selectedRegion = computed(() => {
    return regions.value.find(region => region.key === route.query.region)
  })

  /**
   * 随机选择一个机构作为广告合作伙伴
   */
  const adPartner = computed(() => random(agencies.value))

  // 返回所有方法和 computed 属性供组件使用
  return {
    fetchList,
    filteredAgencies,
    services,
    locations,
    regions,
    selectedService,
    selectedRegion,
    adPartner
  }
}
