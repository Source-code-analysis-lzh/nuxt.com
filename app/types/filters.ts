import type { LinkProps } from '@nuxt/ui'

/**
 * Filter 接口扩展自 LinkProps（排除 type 字段）
 * 表示一个通用的过滤器项，常用于导航、分类、筛选等功能
 *
 * 它继承自 @nuxt/ui 的 LinkProps 类型，但去除了 type 字段，以避免冲突并保持语义清晰
 */
export interface Filter extends Omit<LinkProps, 'type'> {
  // 唯一标识符，可以是字符串或数字
  key: string | number
  // 标题（可选），用于显示在界面上
  title?: string
  // 标签（可选），通常用于更简洁的展示
  label?: string
  // 图标名称（可选），用于显示图标（如 'i-lucide-search'）
  icon?: string
}
