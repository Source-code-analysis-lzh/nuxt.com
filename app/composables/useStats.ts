/**
 * 定义 Stats 接口，表示 Nuxt 项目的统计信息
 */
export interface Stats {
  id: number // 统计项的唯一标识符
  name: string // 项目名称（如 "nuxt"）
  repo: string // GitHub 仓库地址
  description: string // 项目描述
  createdAt: string // 项目创建时间（ISO 格式）
  updatedAt: string // 最后更新时间（ISO 格式）
  pushedAt: string // 最后推送时间（用于判断活跃度）
  stars: number // GitHub 星标数
  watchers: number // 关注者数量
  forks: number // 分支数量
  defaultBranch: string // 默认分支名称（如 "main"）
  version: string // 当前版本号
  monthlyDownloads: number // npm 每月下载量
}

/**
 * 使用 useState 创建响应式的 stats 状态
 * 初始值为 null，表示尚未加载数据
 * 可在多个组件之间共享该状态
 */
export const useStats = () => {
  return useState<Stats | null>('stats', () => null)
}
