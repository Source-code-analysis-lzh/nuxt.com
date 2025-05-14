/**
 * SponsorType 类型定义了赞助商的等级分类
 * 表示不同级别的赞助类型，用于区分赞助商的贡献程度
 */
export type SponsorType = 'platinum' | 'silver' | 'gold' | 'bronze' | 'backers'

/**
 * Sponsor 接口定义了赞助商的数据结构
 * 包含赞助商 ID、名称、Logo、链接、赞助金额和等级等信息
 */
export interface Sponsor {
  // 赞助商唯一标识符（如 UUID 或自定义 ID）
  sponsorId: string
  // 赞助商名称
  sponsorName: string
  // 赞助商 Logo 的 URL 地址
  sponsorLogo: string
  // 赞助商官网链接
  sponsorUrl: string
  // 每月赞助金额（以美元为单位，字符串形式表示）
  monthlyPriceInDollars: string
  // 赞助商等级，取值为 SponsorType 中的一种
  tier: SponsorType
}
