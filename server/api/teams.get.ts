// 定义 TeamMember 接口，用于描述团队成员的信息结构
interface TeamMember {
  name: string // 成员姓名
  login: string // 登录名（唯一标识）
  avatarUrl: string // 头像地址
  pronouns?: string // 代词（可选）
  location?: string // 地理位置（可选）
  websiteUrl?: string // 网站链接（可选）
  sponsorsListing?: string // 赞助信息（可选）
  socialAccounts: Record<string, { displayName: string, url: string }> // 社交账号信息
}

// 导出一个带有缓存机制的事件处理函数，用于获取团队数据
export default defineCachedEventHandler(async () => {
  // 获取核心团队成员列表
  const core = await $fetch<TeamMember[]>('https://api.nuxt.com/teams/core')
  // 获取生态系统团队成员列表
  let ecosystem = await $fetch<TeamMember[]>('https://api.nuxt.com/teams/ecosystem')

  // 过滤掉与核心团队重复的成员，并修正网站链接格式
  ecosystem = ecosystem.filter(t => !core.some(c => c.login === t.login))
    .map((m) => {
      return {
        ...m,
        // 如果网站链接为空或不以 http/https 开头，则添加 https 协议前缀
        websiteUrl: !m.websiteUrl || m.websiteUrl.startsWith('http://') || m.websiteUrl.startsWith('https://') ? m.websiteUrl : `https://${m.websiteUrl}`
      }
    })

  // 返回整理后的团队信息
  return {
    core, // 核心团队
    ecosystem // 生态系统团队
  }
}, {
  maxAge: 60 * 60, // 1 hour // 缓存最大生存时间：1 小时
  getKey: () => 'teams' // 缓存键值
})
