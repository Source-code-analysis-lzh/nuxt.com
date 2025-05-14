/**
 * Starter 接口定义了启动模板（Starter Template）的数据结构
 * 包含名称、描述、代码仓库信息、演示链接等字段
 */
export interface Starter {
  // 模板名称（如：Nuxt 3 + Tailwind CSS）
  name: string
  // URL 友好格式的标识符（如：nuxt-tailwind-starter）
  slug: string
  // 模板功能简要描述（用于展示在卡片或列表中）
  description: string
  // 模板预览图 URL（可选）
  image?: string
  // GitHub 仓库地址（如：https://github.com/nuxt/starter-template）
  repo: string
  // 默认分支名称（如：main 或 master）
  branch: string
  // 项目子目录路径（适用于单仓库多模板的情况，可选）
  dir?: string
  // 在线演示地址（如：https://demo.nuxtstarter.com）
  demo?: string
  // 文档说明链接（如：https://docs.nuxt.com/starters/...）
  docs?: string
}
