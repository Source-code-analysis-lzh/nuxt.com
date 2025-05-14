import type { ParsedContentFile } from '@nuxt/content'

/**
 * Stats 接口定义了模块相关的统计信息
 */
export interface Stats {
  maintainers: number // 维护者数量
  contributors: number // 贡献者数量
  modules: number // 模块总数
}

/**
 * ModuleUser 接口定义了模块维护者或贡献者的用户信息
 */
export interface ModuleUser {
  name: string // 用户名称
  github: string // GitHub 用户名或链接
  twitter?: string // Twitter 用户名（可选）
  bluesky?: string // Bluesky 用户名（可选）
}

/**
 * Module 接口定义了 Nuxt 模块的数据结构
 * 包含基本信息、统计信息、作者信息等
 */
export interface Module {
  name: string // 模块名称
  description: string // 模块描述
  repo: string // GitHub 仓库地址
  npm: string // NPM 包名
  icon: string // 模块图标（URL 或标识符）
  github: string // GitHub 链接（可能与 repo 相同）
  website: string // 官方网站链接
  learn_more: string // 学习更多链接（如文档页）
  category: string // 所属类别（如 CMS、数据库等）
  type: string // 模块类型（如 'official' 表示官方模块）
  sponsor: boolean // 是否为赞助商模块
  // tags: string[]
  compatibility: { // 兼容性信息
    nuxt: string // 支持的 Nuxt 版本（如 '3.x'）
    requires: { bridge: boolean } // 是否需要桥接模块
  }
  stats: { // 模块统计信息
    version: string // 当前版本号
    downloads: number // 下载次数
    stars: number // GitHub 星标数
    publishedAt: number // 发布时间戳（毫秒）
    createdAt: number // 创建时间戳（毫秒）
  }
  maintainers: { // 模块维护者列表
    name: string // 维护者名称
    github: string // 维护者 github
    twitter?: string // 维护者 twitter
    bluesky?: string // 维护者 bluesky
  }[]
  contributors: { // 贡献者信息
    id: number // GitHub 用户 ID
    username: string // GitHub 用户名
    contributions: number // 贡献次数
  }[]
  readme?: ParsedContentFile // 解析后的模块 README 文件内容（可选）
}
