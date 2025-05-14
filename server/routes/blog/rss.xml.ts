import { Feed } from 'feed'
import { joinURL } from 'ufo'
import type { H3Event } from 'h3'
import type { Collections, CollectionQueryBuilder } from '@nuxt/content'
import { queryCollection } from '#imports'

// 定义带 event 参数的 queryCollection 类型，用于从 content 模块查询数据
type queryCollectionWithEvent = <T extends keyof Collections>(event: H3Event, collection: T) => CollectionQueryBuilder<Collections[T]>

// 导出一个事件处理函数，用于生成 blog 的 RSS XML 文件
export default defineEventHandler(async (event) => {
  // 定义基础 URL 和博客站点 URL
  const baseUrl = 'https://nuxt.com'
  const siteUrl = joinURL(baseUrl, 'blog')

  // 初始化 Feed 实例，并配置博客的基本信息
  const feed = new Feed({
    title: 'The Nuxt Blog', // RSS 标题
    description: 'News and updates about Nuxt.', // 描述
    id: siteUrl, // 唯一标识符
    link: siteUrl, // 博客首页链接
    language: 'en', // 语言
    image: joinURL(baseUrl, 'icon.png'), // 图标
    favicon: joinURL(baseUrl, 'favicon.png'), // 网站图标
    copyright: `Copyright © 2016-${new Date().getFullYear()} Nuxt All Rights Reserved`, // 版权信息
    feedLinks: { // RSS 订阅链接
      rss: `${siteUrl}/rss.xml`
    }
  })

  // 查询 blog 集合中的所有文章，并按日期降序排列
  const articles = await (queryCollection as queryCollectionWithEvent)(event, 'blog')
    .order('date', 'DESC')
    .all()

  // 遍历文章列表，将非草稿文章添加到 RSS 中
  for (const article of articles) {
    if (article.draft) { // 跳过草稿文章
      continue
    }
    feed.addItem({
      link: joinURL(baseUrl, article.path), // 文章链接
      image: joinURL(baseUrl, article.image), // 文章图片
      title: article.title, // 文章标题
      date: new Date(article.date), // 发布日期
      description: article.description, // 摘要描述
      category: [{ // 分类信息
        name: article.category
      }]
      // author: article.authors, INF0: Cannot work without an email field in the author object https://github.com/jpmonette/feed/issues/141
    })
  }

  // 设置响应头为 application/xml
  appendHeader(event, 'Content-Type', 'application/xml')

  // 返回生成的 RSS 2.0 格式内容
  return feed.rss2()
})
