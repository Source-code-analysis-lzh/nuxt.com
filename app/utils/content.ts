import type { ContentNavigationItem, DocsCollectionItem } from '@nuxt/content'

/**
 * 从导航树中根据路径查找对应的页面节点
 * @param path - 要查找的页面路径（如 '/docs/introduction'）
 * @param tree - 当前层级的导航项数组（树形结构）
 * @returns 匹配的导航项，若未找到则返回 undefined
 */
export function navPageFromPath(path: string, tree: ContentNavigationItem[]): ContentNavigationItem | undefined {
  for (const file of tree) {
    // 直接匹配路径
    if (file.path === path) {
      return file
    }

    // 如果有子项，递归查找子树
    if (file.children) {
      const result = navPageFromPath(path, file.children)
      if (result) {
        return result
      }
    }
  }
}

/**
 * 查找页面使用的标题模板（titleTemplate）
 * 优先使用页面自身的 titleTemplate，否则向上查找最近的父级模板
 * @param page - 当前页面对象（响应式引用）
 * @param navigation - 导航树（响应式引用）
 * @returns 解析后的标题模板字符串，默认为 '%s · Nuxt'
 */
export function findTitleTemplate(page: Ref<DocsCollectionItem>, navigation: Ref<ContentNavigationItem[]>): string {
  // 如果页面自身定义了 titleTemplate，则直接使用
  if (page.value.titleTemplate)
    return page.value.titleTemplate

  // If titleTemplate is not set, we check the navigation for the closest parent with a titleTemplate
  // 否则从导航结构中查找最近的父级 titleTemplate
  const parts = page.value.path.split('/')
  const items = []
  let current = navigation.value

  // 逐级遍历路径，寻找带有 titleTemplate 的祖先节点
  for (let index = 1; index < parts.length; index += 1) {
    const prefix = parts.slice(0, index + 1).join('/')
    const node = current.find(item => item.path === prefix)

    if (!node) {
      break
    }

    current = node.children
    items.unshift(node) // 将祖先节点按从父到子的顺序保存
  }

  // 返回第一个具有 titleTemplate 的祖先模板，否则使用默认值
  return items.find(item => typeof item.titleTemplate === 'string')?.titleTemplate || '%s · Nuxt'
}
