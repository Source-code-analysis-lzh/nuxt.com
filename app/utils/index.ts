import { splitByCase, upperFirst } from 'scule'

// 创建一个数字格式化器，使用英式英语格式，显示为紧凑形式（如 1.2K 表示 1200）
export const { format: formatNumber } = Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 })

// Case-insensitive RegExp, escaping special characters
// https://stackoverflow.com/a/38151393/3926832
/**
 * 将搜索查询转换为不区分大小写的正则表达式对象
 * 转义所有特殊字符，确保安全用于 RegExp 构造函数
 * @param query - 搜索字符串
 * @returns 匹配该查询的正则表达式
 */
export const searchTextRegExp = function (query = '') {
  return new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i')
}

/**
 * 根据指定语言环境格式化日期
 * @param locale - 语言代码，如 'en-US'
 * @param d - 日期对象、时间戳或可解析为日期的字符串
 * @returns 格式化的日期字符串
 */
export const formatDateByLocale = (locale: string, d: string | number | Date) => {
  return new Date(d).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * 将日期转换为相对时间字符串（如 "3天前"）
 * @param date - 日期对象、时间戳或可解析为日期的字符串
 * @returns 相对时间描述字符串
 */
export const toRelativeDate = (date: string | number | Date) => {
  const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  if (diff < 60) {
    return 'just now'
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`
  } else if (diff < 604800) {
    return `${Math.floor(diff / 86400)} days ago`
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 604800)} weeks ago`
  } else if (diff < 31536000) {
    return `${Math.floor(diff / 2592000)} months ago`
  } else {
    return `${Math.floor(diff / 31536000)} years ago`
  }
}

/**
 * 将字符串转换为 slug 格式
 * 转换规则：
 * - 转为小写
 * - 非字母数字字符替换为空格
 * - 多个空格/连字符合并为一个连字符
 * @param str - 原始字符串
 * @returns slug 格式字符串
 */
export const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9 -]/g, ' ').replace(/[\s-]+/g, '-')

/**
 * 从数组中随机返回一个元素
 * @param arr - 输入数组
 * @returns 数组中的一个随机元素
 */
export const random = (arr: Array<any>) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 从链接路径生成面包屑导航文本
 * @param link - 页面链接路径（如 '/docs/getting-started'）
 * @returns 面包屑文本（如 'Docs > Getting Started'）
 */
export const createBreadcrumb = (link: string = 'Missing link') => {
  if (link.startsWith('http')) {
    return link
  }
  return link.split('/').filter(Boolean).map(part => splitByCase(part).map(p => upperFirst(p)).join(' ')).join(' > ').replace('Api', 'API')
}
