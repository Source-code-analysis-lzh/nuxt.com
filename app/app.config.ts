// 使用 defineAppConfig 定义全局应用配置，主要用于 UI 主题和组件样式定制
// 集中管理颜色、间距、字体大小等 UI 层面的样式变量
export default defineAppConfig({
  // 配置 UI 主题颜色
  ui: {
    colors: {
      primary: 'green', // 主色调为绿色
      neutral: 'slate', // 中性色使用 slate（石板灰）
      important: 'violet' // 重要元素使用紫色
    }
  },
  // 针对 @nuxt/ui-pro 组件库进行高级样式定制
  uiPro: {
    // 页面 Hero 区域的自定义类名配置
    pageHero: {
      slots: {
        container: 'py-10 sm:py-20 lg:py-20', // 容器垂直内边距
        title: 'sm:text-5xl' // 标题在中小屏幕及以上使用 5xl 字号
      }
    },
    // 富文本 Prose 组件样式定制
    prose: {
      img: {
        base: 'w-full' // 图片默认宽度占满容器
      },
      // 自定义代码树（codeTree）组件的样式
      codeTree: {
        slots: {
          root: 'bg-default m-0', // 根节点背景色和无外边距
          content: '[&>div>pre]:rounded-r-none' // 去除 pre 元素右侧圆角
        }
      }
    }
  }
})
