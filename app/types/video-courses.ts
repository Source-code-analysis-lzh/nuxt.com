/**
 * VideoCourse 接口定义了视频课程的数据结构
 * 包含课程名称、描述、链接、标识符和可选徽章信息
 */
export interface VideoCourse {
  // 课程名称（如："Nuxt 3 入门到精通"）
  name: string
  // URL 友好的唯一标识符（如："nuxt3-from-zero-to-hero"）
  slug: string
  // 课程简要描述，用于展示在卡片或列表中
  description: string
  // 课程链接地址（如：https://example.com/courses/nuxt3）
  url: string
  // 可选徽章信息（如："推荐", "热门", "免费" 等，用于 UI 标记）
  badge?: string
}
