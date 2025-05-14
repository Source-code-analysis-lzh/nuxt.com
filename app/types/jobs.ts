/**
 * Job 接口定义了职位（Job）的数据结构
 * 包含职位名称、链接、描述、工作地点、组织信息和发布时间等字段
 */
export interface Job {
  // 职位名称（如：Frontend Developer）
  title: string
  // 职位详情链接（如：https://example.com/jobs/frontend-developer）
  link: string
  // 职位描述，包含职责、要求等信息
  description: string
  // 是否支持远程办公（如："Remote", "Hybrid", "On-site"）
  remote: string
  // 工作地点数组（如：["New York, USA", "London, UK"]）
  locations: string[]
  // 招聘组织信息
  organization: {
    // 组织名称（如：Tech Corp）
    name: string
    // 组织头像 URL（如：https://example.com/logo.png）
    avatar: string
  }
  // 职位发布时间（ISO 8601 格式字符串，如："2023-09-15T10:30:00Z"）
  published_at: string
}
