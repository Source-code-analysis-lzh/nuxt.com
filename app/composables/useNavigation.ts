import { createSharedComposable } from '@vueuse/core'

/**
 * 获取页面头部链接数据
 *
 * 此函数用于动态生成网站头部导航栏的链接数据它根据当前路由信息，
 * 计算出一组结构化的链接对象，用于渲染导航栏每个链接对象包含标签、
 * 图标、路由地址、是否处于激活状态等信息此外，某些链接还包含子链接，
 * 用于实现多级导航栏结构
 *
 * @returns {Object} 返回一个包含头部链接数据的对象
 */
function _useHeaderLinks() {
  // 获取当前路由信息
  const route = useRoute()
  // 计算头部链接数据
  const headerLinks = computed(() => {
    // 返回一组结构化的链接对象
    return [{
      label: '文档',
      icon: 'i-lucide-book-marked',
      to: '/docs',
      search: false,
      active: route.path.startsWith('/docs'),
      children: [{
        label: '快速开始',
        description: '了解如何开始使用 Nuxt 构建你的第一个应用。',
        icon: 'i-lucide-rocket',
        to: '/docs/getting-started',
        active: route.path.startsWith('/docs/getting-started')
      }, {
        label: '指南',
        description: '获取关键概念、目录结构和最佳实践。',
        icon: 'i-lucide-book-open',
        to: '/docs/guide',
        active: route.path.startsWith('/docs/guide')
      }, {
        label: 'API',
        description: '探索 Nuxt 的组件、组合式函数、实用工具等。',
        icon: 'i-lucide-code-xml',
        to: '/docs/api',
        active: route.path.startsWith('/docs/api')
      }, {
        label: '示例',
        description: '探索和浏览官方及社区示例。',
        icon: 'i-lucide-app-window-mac',
        to: '/docs/examples',
        active: route.path.startsWith('/docs/examples')
      }, {
        label: '社区',
        description: '从社区寻找答案和支持。',
        icon: 'i-lucide-messages-square',
        to: '/docs/community',
        active: route.path.startsWith('/docs/community')
      }]
    }, {
      label: '集成',
      to: '/modules',
      icon: 'i-lucide-unplug',
      search: false,
      active: route.path.startsWith('/modules') || route.path.startsWith('/deploy'),
      children: [{
        label: '模块',
        description: '使用模块增强你的 Nuxt 项目。',
        icon: 'i-lucide-puzzle',
        to: '/modules'
      }, {
        label: '部署',
        description: '将你的 Nuxt 项目部署到任何地方。',
        icon: 'i-lucide-rocket',
        to: '/deploy'
      }]
    }, {
      label: '资源',
      icon: 'i-lucide-library',
      to: '/templates',
      search: false,
      active: route.path.startsWith('/templates') || route.path.startsWith('/video-courses') || route.path.startsWith('/showcase'),
      children: [{
        label: '模板',
        icon: 'i-lucide-app-window',
        description: '使用 Nuxt 模板开始你的下一个项目。',
        to: '/templates'
      }, {
        label: '视频课程',
        description: '通过观看视频课程学习 Nuxt。',
        icon: 'i-lucide-graduation-cap',
        to: '/video-courses'
      }, {
        label: '案例展示',
        description: '发现并探索使用 Nuxt 构建的项目。',
        icon: 'i-lucide-presentation',
        to: '/showcase'
      }, {
        label: 'Nuxt 认证',
        description: '获得你的能力认证。',
        icon: 'i-lucide-medal',
        to: 'https://certification.nuxt.com',
        target: '_blank'
      }]
    }, {
      label: '产品',
      icon: 'i-lucide-sparkle',
      search: false,
      children: [{
        label: 'Nuxt UI Pro',
        to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=header',
        description: '使用 Vue 或 Nuxt 的高级组件，构建得更快。',
        icon: 'i-lucide-panels-top-left',
        target: '_blank'
      }, {
        label: 'Nuxt Studio',
        to: 'https://content.nuxt.com/studio/?utm_source=nuxt-website&utm_medium=header',
        description: '使用可视化编辑器编辑你的 Nuxt Content 网站。',
        icon: 'i-lucide-pen',
        target: '_blank'
      }, {
        label: 'NuxtHub',
        to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=header',
        description: '部署和管理可伸缩的全栈 Nuxt 应用。',
        icon: 'i-lucide-rocket',
        target: '_blank'
      }]
    }, {
      label: '企业',
      icon: 'i-lucide-building-2',
      to: '/enterprise',
      search: false,
      children: [{
        label: '支持',
        to: '/enterprise/support',
        description: 'Nuxt 专家提供的专业支持。',
        icon: 'i-lucide-life-buoy'
      }, {
        label: '机构',
        to: '/enterprise/agencies',
        description: '专门从事 Nuxt 开发的机构。',
        icon: 'i-lucide-handshake'
      }, {
        label: '赞助商',
        to: '/enterprise/sponsors',
        description: '帮助我们维持 Nuxt 的开发。',
        icon: 'i-lucide-hand-heart'
      }]
    }, {
      label: '博客',
      icon: 'i-lucide-newspaper',
      to: '/blog'
    }]
  })
  // 返回计算得到的头部链接数据
  return { headerLinks }
}

// 将 useHeaderLinks 包装为客户端共享的可组合函数（支持跨组件复用）
export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks

// 定义 footerLinks 常量，用于构建网站底部导航栏的链接结构
const footerLinks = [{
  label: '社区',
  children: [{
    label: 'Nuxters',
    to: 'https://nuxters.nuxt.com',
    target: '_blank'
  }, {
    label: 'Team',
    to: '/team'
  }, {
    label: 'Design Kit',
    to: '/design-kit'
  }]
}, {
  label: '产品',
  children: [{
    label: 'Nuxt UI Pro',
    to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }, {
    label: 'Nuxt Studio',
    to: 'https://content.nuxt.com/studio/?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }, {
    label: 'NuxtHub',
    to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }]
}, {
  label: '企业',
  children: [{
    label: 'Support',
    to: '/enterprise/support'
  }, {
    label: 'Agencies',
    to: '/enterprise/agencies'
  }, {
    label: 'Sponsors',
    to: '/enterprise/sponsors'
  }]
}]

/**
 * 自定义钩子用于获取页脚链接数据
 *
 * 该钩子是为了提供一个简单的方式来获取页脚链接的信息，这些链接通常用于网页的底部，
 * 提供给用户快速访问网站的各个部分或其他重要信息页面
 *
 * @returns {Object} 返回一个对象，其中包含页脚链接的数据
 */
export const useFooterLinks = () => ({ footerLinks })

/**
 * 自定义导航管理 Hook
 *
 * 该函数用于集中管理与导航相关的功能，包括：
 * - 搜索关键词（searchTerm）
 * - 头部导航链接（headerLinks）
 * - 底部导航链接（footerLinks）
 * - 搜索快捷链接（searchLinks）
 * - 动态搜索分组（searchGroups）
 *
 * @returns 返回包含所有导航相关响应式数据的对象
 */
const _useNavigation = () => {
  // 获取 Nuxt 应用实例，用于访问全局属性和插件（如 $kapa AI 插件）
  const nuxtApp = useNuxtApp()
  // 响应式搜索关键词，用于控制搜索输入和动态过滤
  const searchTerm = ref<string>('')

  // 使用前面定义的头部和底部导航链接数据
  const { headerLinks } = useHeaderLinks()
  const { footerLinks } = useFooterLinks()

  /**
   * 计算属性：生成可用于命令面板或搜索菜单的快捷链接
   */
  const searchLinks = computed(() => [
    { // AI 搜索入口，点击后打开 AI 弹窗
      label: 'Ask AI',
      icon: 'i-lucide-wand', // Lucide 图标名称
      to: 'javascript:void(0);', // 空链接
      onSelect: () => nuxtApp.$kapa?.openModal() // 点击时触发 AI 弹窗
    },
    // 将 headerLinks 中的部分链接加入搜索菜单，并过滤掉不参与搜索的项（如 `/docs` 和 `/enterprise`）
    ...headerLinks.value.map((link) => {
      // Remove `/docs` and `/enterprise` links from command palette
      if (link.search === false) {
        return {
          label: link.label,
          icon: link.icon,
          children: link.children
        }
      }
      return link
    }).filter((link): link is NonNullable<typeof link> => Boolean(link)), {
      // 静态添加的额外搜索链接
      label: 'Team',
      icon: 'i-lucide-users',
      to: '/team'
    }, {
      label: 'Design Kit',
      icon: 'i-lucide-palette',
      to: '/design-kit'
    }, {
      label: 'Newsletter',
      icon: 'i-lucide-mail',
      to: '/newsletter'
    }])

  /**
   * 定义搜索分组的数据结构类型
   * 每个分组有 ID、标题、图标和一组条目
   */
  type SearchGroup = {
    id: string
    label: string
    icon?: string
    items: Array<{
      id: string
      label: string
      suffix?: string
      icon?: string
      avatar?: {
        src?: string
        ui?: {
          root: string
        }
      }
      to: string
      onSelect?: () => Promise<void>
    }>
  }

  /**
   * 计算属性：根据搜索词动态加载模块和托管服务等搜索结果
   */
  const searchGroups = computed<SearchGroup[]>(() => {
    // 初始化三个搜索分组
    const aiGroup: SearchGroup = {
      id: 'ask-ai-search',
      label: 'AI',
      icon: 'i-lucide-wand',
      items: []
    }

    const modulesGroup: SearchGroup = {
      id: 'modules-search',
      label: 'Modules',
      items: []
    }

    const hostingGroup: SearchGroup = {
      id: 'hosting-search',
      label: 'Hosting',
      items: []
    }

    const groups = [aiGroup, modulesGroup, hostingGroup]

    // 如果没有输入搜索词，则返回空的分组
    if (!searchTerm.value) {
      return groups
    }

    aiGroup.items = [{
      id: `ask-ai-${searchTerm.value}`,
      label: `Ask AI about "${searchTerm.value}"`,
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect() {
        // 通过 $kapa 访问 Kapa.ai 的 API 服务
        return nuxtApp.$kapa.openModal(searchTerm.value)
      }
    }]

    /**
     * 加载模块数据并过滤出匹配当前搜索词的模块
     */
    const loadModules = async () => {
      const { modules, fetchList } = useModules()
      if (!modules.value.length) {
        await fetchList() // 若尚未加载模块列表，则先加载
      }

      modulesGroup.items = modules.value
        .filter(module => ['name', 'npm', 'repo'].map(field => module[field as keyof typeof module]).filter(Boolean).some(value => typeof value === 'string' && value.search(searchTextRegExp(searchTerm.value)) !== -1))
        .map(module => ({
          id: `module-${module.name}`,
          label: module.npm,
          suffix: module.description,
          avatar: {
            src: moduleImage(module.icon),
            ui: {
              root: 'rounded-none bg-transparent'
            }
          },
          to: `/modules/${module.name}`
        }))
    }

    /**
     * 加载托管服务商数据并过滤出匹配当前搜索词的服务商
     */
    const loadHosting = async () => {
      const { providers, fetchList } = useHostingProviders()
      if (!providers.value.length) {
        await fetchList() // 若尚未加载服务商列表，则先加载
      }

      hostingGroup.items = providers.value
        .filter(hosting => ['title'].map(field => hosting[field as keyof typeof hosting]).filter(Boolean).some(value => typeof value === 'string' && value.search(searchTextRegExp(searchTerm.value)) !== -1))
        .map(hosting => ({
          id: `hosting-${hosting.path}`,
          label: hosting.title,
          suffix: hosting.description,
          icon: hosting.logoIcon,
          avatar: hosting.logoSrc
            ? {
                src: hosting.logoSrc,
                ui: {
                  root: 'rounded-none bg-transparent'
                }
              }
            : undefined,
          to: hosting.path
        }))
    }

    // 组件挂载后异步加载模块和托管服务商数据
    onMounted(() => {
      Promise.all([
        loadModules(),
        loadHosting()
      ]).catch(error => console.error('Error loading search results:', error))
    })

    return groups
  })

  // 返回所有可用的导航数据，供组件或其他 Composable 使用
  return {
    searchTerm, // 搜索词
    headerLinks, // 头部链接
    footerLinks, // 底部链接
    searchLinks, // 搜索链接
    searchGroups // 搜索分组
  }
}

// 将 `_useNavigation` 函数封装为一个可在客户端共享复用的组合式函数
// 如果当前运行环境是客户端（import.meta.client 为 true），则使用 createSharedComposable 包装，确保在多个组件中共享状态，避免重复初始化
// 否则（如在服务端）直接返回原始函数，以保证 SSR 兼容性，确保每次请求生成新实例（避免跨用户状态污染）
export const useNavigation = import.meta.client ? createSharedComposable(_useNavigation) : _useNavigation
