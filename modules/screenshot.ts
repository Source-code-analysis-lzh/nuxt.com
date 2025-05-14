import { defineNuxtModule } from '@nuxt/kit'
import { existsSync } from 'node:fs'
import { join } from 'pathe'
import captureWebsite from 'capture-website'
import { kebabCase } from 'scule'

// 用于描述内容文件的数据结构，包含可能的截图配置字段
// 支持三种类型的截图生成：
//  模板页面（/templates/）
//  视频课程页面（/video-courses/）
//  案例展示页面（showcase.yml）
interface ContentFile {
  id?: string
  slug?: string
  screenshotUrl?: string
  demo?: string
  url?: string
  screenshotOptions?: Record<string, any>
  websites?: Array<{
    name: string
    url: string
    hostname: string
    screenshotUrl?: string
    screenshotOptions?: Record<string, any>
  }>
}

// 该模块是一个 Nuxt 自动截图模块，主要用于在构建过程中自动为以下三类内容生成网页截图：
// 1. 模板页面（/templates/）
// 2. 视频课程页面（/video-courses/）
// 3. 案例展示页面（showcase.yml）
// 通过监听 content:file:afterParse 钩子，读取文件中的 URL 配置，调用 capture-website 工具自动生成图片，并保存到 public/assets/ 路径下。适用于自动化文档、课程封面或案例展示场景。
export default defineNuxtModule((options, nuxt) => {
  // 监听 Nuxt Content 的 content:file:afterParse 事件，在解析完 Markdown/YAML 等内容文件后执行
  nuxt.hook('content:file:afterParse', async ({ content: file }: { content: ContentFile }) => {
    // Handle individual template files
    // 1. 处理模板页面截图（/templates/）
    // 如果是 /templates/ 下的内容文件，则尝试根据 screenshotUrl 或 demo 字段截图
    if (file.id?.includes('/templates/')) {
      const template = file
      const url = template.screenshotUrl || template.demo
      if (!url) {
        console.error(`Template ${template.slug} has no "demo" or "screenshotUrl" to take a screenshot from`)
        return
      }
      const filename = join(process.cwd(), 'public/assets/templates', `${template.slug}.png`)
      // 若截图已存在则跳过
      if (existsSync(filename)) {
        return
      }
      console.log(`Generating screenshot for Template ${template.slug} hitting ${url}...`)
      // 使用 capture-website 进行网页截图
      await captureWebsite.file(url, filename, {
        ...(template.screenshotOptions || {}),
        launchOptions: { headless: true }
      })
    }

    // Handle individual video course files
    // 2. 处理视频课程截图（/video-courses/）
    // 如果是 /video-courses/ 下的内容文件，则尝试根据 screenshotUrl 或 url 字段截图
    if (file.id?.includes('/video-courses/')) {
      const course = file
      const url = course.screenshotUrl || course.url
      if (!url) {
        console.error(`Video Course ${course.slug} has no "url" or "screenshotUrl" to take a screenshot from`)
        return
      }
      const filename = join(process.cwd(), 'public/assets/video-courses', `${course.slug}.png`)
      if (existsSync(filename)) {
        return
      }
      console.log(`Generating screenshot for Video Course ${course.slug} hitting ${url}...`)
      await captureWebsite.file(url, filename, {
        ...(course.screenshotOptions || {}),
        launchOptions: { headless: true },
        width: 1920, // 设置默认截图尺寸为 1920x960
        height: 960
      })
    }

    // 3. 处理案例展示截图（showcase.yml）
    // 如果是 showcase.yml 文件，并且有 websites 数组字段，则对每个网站进行截图
    if (file.id?.includes('showcase.yml') && file.websites) {
      for (const website of file.websites) {
        const url = website.screenshotUrl || website.url
        if (!website.name) {
          throw new Error(`Showcase ${website.hostname} has no "name" to take a screenshot from`)
          continue
        }
        if (!url) {
          console.error(`Showcase ${website.name} has no "url" or "screenshotUrl" to take a screenshot from`)
          continue
        }
        if (website.screenshotUrl) {
          continue
        }

        // 使用 kebab-case 格式化名称作为文件名
        const filename = join(process.cwd(), 'public/assets/websites', `${kebabCase(website.name.replace(/ /g, ''))}.png`)
        if (existsSync(filename)) {
          continue
        }

        console.log(`Generating screenshot for Showcase ${website.name} hitting ${url}...`)
        // 设置固定分辨率 1920x1080 和指定 User-Agent
        await captureWebsite.file(url, filename, {
          ...(website.screenshotOptions || {}),
          launchOptions: { headless: true },
          width: 1920,
          height: 1080,
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
        }).catch((err) => {
          console.warn(`Could not generate screenshot for ${url}: ${err.message}`)
        })
      }
    }
  })
})
