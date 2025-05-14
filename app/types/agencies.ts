import type { Filter } from './filters'
import type { LinkProps } from '@nuxt/ui'

/**
 * Agency 接口定义了机构（Agency）的数据结构
 * 包含基本信息、社交媒体链接、Logo、地区、服务等字段
 */
export interface Agency {
  // 基本信息
  title: string // 机构名称
  description: string // 简短描述
  fullDescription: string // 完整描述
  path: string // 页面路径（如：/agencies/example-agency）
  link: string // 主页链接

  // 社交媒体链接
  twitter: string // Twitter 用户名或完整 URL
  x: string // X（原 Twitter）用户名或 URL（可能与 twitter 相同）
  github: string // GitHub 链接
  linkedin: string // LinkedIn 链接
  instagram: string // Instagram 链接

  // Logo 路径（支持亮色和暗色模式）
  logo: {
    light: string // 亮色模式下的 Logo 路径或 URL
    dark: string // 暗色模式下的 Logo 路径或 URL
  }

  // 分类信息
  regions: Filter[] // 所属地区（使用 Filter 类型，包含 key、label 等字段）
  services: Filter[] // 提供的服务类型

  // 可选资源链接列表
  resources?: LinkProps[] // 附加资源链接（如案例研究、客户评价等）

  // 地理位置信息
  location: Filter // 机构所在地，使用 Filter 类型表示
}
