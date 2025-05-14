// TODO: Update later
import { SitemapStream, streamToPromise } from 'sitemap'
import type { H3Event } from 'h3'
import type { Collections, CollectionQueryBuilder } from '@nuxt/content'
import { queryCollection } from '#imports'

// - 此脚本通过 @nuxt/content 模块获取所有文档内容。
// - 使用 sitemap 库动态构建 sitemap.xml 文件。
// - 每个文档的路径被格式化后写入 sitemap，并标记为每周更新一次。
// - 最终输出一个基于流的 sitemap XML 内容。
// 定义带 event 参数的 queryCollection 类型，用于从 content 模块查询数据
type queryCollectionWithEvent = <T extends keyof Collections>(event: H3Event, collection: T) => CollectionQueryBuilder<Collections[T]>

// 导出一个事件处理函数，用于生成 sitemap.xml 文件
export default defineEventHandler(async (event: H3Event) => {
  // 使用 queryCollection 查询 'docs' 集合中的所有文档内容
  const docs = await (queryCollection as queryCollectionWithEvent)(event, 'docs').all()

  // 创建一个 sitemap 流对象，并设置站点域名为 https://nuxt.com
  const sitemap = new SitemapStream({
    hostname: 'https://nuxt.com'
  })

  // 遍历所有文档，将每个文档路径写入 sitemap
  for (const doc of docs) {
    sitemap.write({
      // 去除路径中的 /_dir 后缀作为 URL
      url: doc.path?.replace(/\/_dir$/, ''),
      changefreq: 'weekly' // 页面更新频率设为每周
    })
  }
  // 结束 sitemap 数据写入
  sitemap.end()
  // 将 sitemap 流转换为 Promise 并返回，以便 Nuxt 能够响应客户端请求
  return streamToPromise(sitemap)
})
