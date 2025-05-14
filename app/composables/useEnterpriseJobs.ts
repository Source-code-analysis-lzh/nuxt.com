import type { Filter, Job } from '../types'
import { toRelativeDate } from '../utils'

/**
 * 自定义钩子用于获取和处理企业职位信息
 *
 * 该钩子主要负责从远程API获取职位数据，并根据用户选择的地点和工作类型过滤职位信息
 * 它还计算出唯一的地点和工作类型列表，用于驱动过滤选项
 */
export const useEnterpriseJobs = () => {
  // 获取当前路由信息
  const route = useRoute()
  // 状态管理，用于存储职位信息列表
  const jobs = useState<Job[]>('jobs', () => [])

  /**
   * 将远程工作类型代码映射为人类可读的字符串
   *
   * @param remoteType 远程工作类型代码，'ONLY'、'ALLOWED' 或其他（默认为'Onsite'）
   * @returns 返回对应的远程工作类型字符串
   */
  const mapRemote = (remoteType: string) => {
    switch (remoteType) {
      case 'ONLY':
        return 'Remote Only'
      case 'ALLOWED':
        return 'Remote Allowed'
      default:
        return 'Onsite'
    }
  }

  // Data fetching

  /**
   * 从API获取职位列表数据
   * 如果已经有职位数据，则不会重复获取
   * 否则，获取数据后，将每个职位的远程工作类型和发布日期进行处理
   */
  async function fetchList() {
    if (jobs.value.length) {
      return
    }

    const res = await $fetch<Job[]>('https://api.nuxt.com/jobs')

    jobs.value = res.map((job) => {
      return { ...job, remote: mapRemote(job.remote), published_at: toRelativeDate(job.published_at) }
    })
  }

  // Computed
  /**
   * 根据用户选择的地点和工作类型过滤职位列表
   * 过滤条件包括地点和远程工作类型，如果设置了相应的筛选条件，则只返回匹配的职位
   */
  const filteredJobs = computed<Job[]>(() => {
    return [...jobs.value]
      .filter((job) => {
        if (selectedLocation.value && !job.locations.includes(selectedLocation.value.key as string)) {
          return false
        }
        if (selectedType.value && job.remote !== selectedType.value.key) {
          return false
        }
        return true
      })
  })

  /**
   * 计算唯一的地点列表，用于地点过滤选项
   * 从所有职位中提取地点，去重后排序，以便于用户选择
   */
  const locations = computed<Filter[]>(() => {
    const locations = jobs.value?.map(job => job.locations).flat() || []
    return [...new Set(locations)]
      .map(l => ({ key: l, label: l }))
      .sort((a, b) => a.label.localeCompare(b.label))
  })

  /**
   * 计算工作类型列表，用于类型过滤选项
   * 从所有职位中提取远程工作类型，去重后，以便于用户选择
   */
  const types = computed<Filter[]>(() => {
    const types = jobs.value?.map(job => job.remote)
    return [...new Set(types)]
      .map((t) => {
        return { key: t, label: t }
      })
  })

  /**
   * 根据路由参数获取用户选择的地点
   * 如果路由参数中包含地点信息，则找到对应的地点对象
   */
  const selectedLocation = computed(() => {
    return locations.value.find(location => location.key === route.query.location)
  })

  /**
   * 根据路由参数获取用户选择的工作类型
   * 如果路由参数中包含类型信息，则找到对应的工作类型对象
   */
  const selectedType = computed(() => {
    return types.value.find(type => type.key === route.query.type)
  })

  // 返回数据和方法供外部使用
  return {
    fetchList,
    filteredJobs,
    locations,
    types,
    selectedLocation,
    selectedType
  }
}
