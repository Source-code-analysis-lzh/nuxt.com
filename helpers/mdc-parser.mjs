import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import rehypeHighlight from '@nuxtjs/mdc/runtime/highlighter/rehype-nuxt'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import { createJavaScriptRegexEngine } from 'shiki'

/**
 * 创建Shiki高亮器
 *
 * 此函数用于初始化并返回一个代码高亮器，该高亮器可以根据给定的配置对代码进行语法高亮
 * 它支持自定义语言、主题、以及各种高亮选项
 *
 * @param {Object} config - 配置对象
 * @param {string[]} config.langs - 需要加载的语言
 * @param {string[]} config.themes - 需要加载的主题
 * @param {Object} config.bundledLangs - 捆绑的语言包
 * @param {Object} config.bundledThemes - 捆绑的主题包
 * @param {Function} config.getMdcConfigs - 获取MDC配置的函数
 * @param {Object} config.options - Shiki的配置选项
 * @param {string} config.engine - 使用的引擎
 * @returns {Promise<Function>} - 返回一个高亮函数，用于对代码进行语法高亮
 */
export function createShikiHighlighter({
  langs = [],
  themes = [],
  bundledLangs = {},
  bundledThemes = {},
  getMdcConfigs,
  options: shikiOptions,
  engine
} = {}) {
  let shiki
  let configs

  /**
   * 获取Shiki实例
   *
   * 此函数负责初始化Shiki高亮器核心，并加载配置的语法和主题
   * 它还定义了一些用于代码高亮的转换器
   *
   * @returns {Promise<Object>} - 返回包含Shiki实例和其他高亮工具的对象
   */
  async function _getShiki() {
    const { createHighlighterCore, addClassToHast, isSpecialLang, isSpecialTheme } = await import('shiki/core')
    const { transformerNotationDiff, transformerNotationErrorLevel, transformerNotationFocus, transformerNotationHighlight } = await import('@shikijs/transformers')
    const shiki2 = await createHighlighterCore({
      langs,
      themes,
      engine: engine || createJavaScriptRegexEngine()
    })
    for await (const config of await getConfigs()) {
      await config.shiki?.setup?.(shiki2)
    }
    return {
      shiki: shiki2,
      addClassToHast,
      isSpecialLang,
      isSpecialTheme,
      transformers: [
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
        transformerNotationFocus(),
        transformerNotationHighlight()
      ]
    }
  }

  /**
   * 获取Shiki实例
   *
   * 此函数确保Shiki实例只被初始化一次，并在后续调用中返回相同的实例
   *
   * @returns {Promise<Object>} - 返回Shiki实例
   */
  async function getShiki() {
    if (!shiki) {
      shiki = _getShiki()
    }
    return shiki
  }

  /**
   * 获取配置
   *
   * 此函数负责获取MDC配置，确保配置只被加载一次
   *
   * @returns {Promise<Array>} - 返回MDC配置数组
   */
  async function getConfigs() {
    if (!configs) {
      configs = Promise.resolve(getMdcConfigs?.() || [])
    }
    return configs
  }

  /**
   * 高亮函数
   *
   * 此函数用于对给定的代码进行语法高亮，根据指定的语言和主题
   * 它还支持各种高亮选项，如添加额外的语法上下文和处理空行
   *
   * @param {string} code - 需要高亮的代码
   * @param {string} lang - 代码的语言
   * @param {string} theme - 高亮的主题
   * @param {Object} options - 高亮选项
   * @returns {Promise<Object>} - 返回包含高亮树、类名、内联样式和样式的信息对象
   */
  const highlighter = async (code, lang, theme, options = {}) => {
    const {
      shiki: shiki2,
      addClassToHast,
      isSpecialLang,
      isSpecialTheme,
      transformers: baseTransformers
    } = await getShiki()
    const codeToHastOptions = {
      defaultColor: false,
      meta: {
        __raw: options.meta
      }
    }
    if (lang === 'ts-type' || lang === 'typescript-type') {
      lang = 'typescript'
      codeToHastOptions.grammarContextCode = 'let a:'
    } else if (lang === 'vue-html' || lang === 'vue-template') {
      lang = 'vue'
      codeToHastOptions.grammarContextCode = '<template>'
    }
    const themesObject = { ...typeof theme === 'string' ? { default: theme } : theme || {} }
    const loadedThemes = shiki2.getLoadedThemes()
    const loadedLanguages = shiki2.getLoadedLanguages()
    if (typeof lang === 'string' && !loadedLanguages.includes(lang) && !isSpecialLang(lang)) {
      if (bundledLangs[lang]) {
        await shiki2.loadLanguage(bundledLangs[lang])
      } else {
        if (import.meta.dev) {
          console.warn(`[@nuxtjs/mdc] Language "${lang}" is not loaded to the Shiki highlighter, fallback to plain text. Add the language to "mdc.highlight.langs" to fix this.`)
        }
        lang = 'text'
      }
    }
    for (const [color, theme2] of Object.entries(themesObject)) {
      if (typeof theme2 === 'string' && !loadedThemes.includes(theme2) && !isSpecialTheme(theme2)) {
        if (bundledThemes[theme2]) {
          await shiki2.loadTheme(bundledThemes[theme2])
        } else {
          if (import.meta.dev) {
            console.warn(`[@nuxtjs/mdc] Theme "${theme2}" is not loaded to the Shiki highlighter. Add the theme to "mdc.highlight.themes" to fix this.`)
          }
          themesObject[color] = 'none'
        }
      }
    }
    const transformers = [
      ...baseTransformers
    ]
    for (const config of await getConfigs()) {
      const newTransformers = typeof config.shiki?.transformers === 'function' ? await config.shiki?.transformers(code, lang, theme, options) : config.shiki?.transformers || []
      transformers.push(...newTransformers)
    }
    const root = shiki2.codeToHast(code.trimEnd(), {
      lang,
      ...codeToHastOptions,
      themes: themesObject,
      transformers: [
        ...transformers,
        {
          name: 'mdc:highlight',
          line(node, line) {
            if (options.highlights?.includes(line))
              addClassToHast(node, 'highlight')
            node.properties.line = line
          }
        },
        {
          name: 'mdc:newline',
          line(node) {
            if (code?.includes('\n')) {
              if (node.children.length === 0 || (node.children.length === 1 && node.children[0].type === 'element' && node.children[0].children.length === 1 && node.children[0].children[0].type === 'text' && node.children[0].children[0].value === '')) {
                node.children = [{
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    emptyLinePlaceholder: true
                  },
                  children: [{ type: 'text', value: '\n' }]
                }]
                return
              }
              const last = node.children.at(-1)
              if (last?.type === 'element' && last.tagName === 'span') {
                const text = last.children.at(-1)
                if (text?.type === 'text')
                  text.value += '\n'
              }
            }
          }
        }
      ]
    })
    const preEl = root.children[0]
    const codeEl = preEl.children[0]
    const wrapperStyle = shikiOptions?.wrapperStyle
    preEl.properties.style = wrapperStyle ? typeof wrapperStyle === 'string' ? wrapperStyle : preEl.properties.style : ''
    const styles = []
    Object.keys(themesObject).forEach((color) => {
      const colorScheme = color !== 'default' ? `.${color}` : ''
      styles.push(
        wrapperStyle ? `${colorScheme} .shiki,` : '',
        `html .${color} .shiki span {`,
        `color: var(--shiki-${color});`,
        `background: var(--shiki-${color}-bg);`,
        `font-style: var(--shiki-${color}-font-style);`,
        `font-weight: var(--shiki-${color}-font-weight);`,
        `text-decoration: var(--shiki-${color}-text-decoration);`,
        '}'
      )
      styles.push(
        `html${colorScheme} .shiki span {`,
        `color: var(--shiki-${color});`,
        `background: var(--shiki-${color}-bg);`,
        `font-style: var(--shiki-${color}-font-style);`,
        `font-weight: var(--shiki-${color}-font-weight);`,
        `text-decoration: var(--shiki-${color}-text-decoration);`,
        '}'
      )
    })
    return {
      tree: codeEl.children,
      className: Array.isArray(preEl.properties.class) ? preEl.properties.class.join(' ') : preEl.properties.class,
      inlineStyle: preEl.properties.style,
      style: styles.join('')
    }
  }
  return highlighter
}

// 定义了一组懒加载语言包，用于按需加载 Shiki 支持的语法。
// 每个键表示一个语言名称，对应的值是一个函数，返回动态导入该语言模块的 Promise。
// 支持的语言包括：SQL、Diff、INI、Vue、JavaScript、TypeScript、TSX、JSX、JSON 等。
const bundledLangs = {
  sql: () => import('shiki/langs/sql.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
  ini: () => import('shiki/langs/ini.mjs'),
  properties: () => import('shiki/langs/ini.mjs'),
  vue: () => import('shiki/langs/vue.mjs'),
  js: () => import('shiki/langs/js.mjs'),
  ts: () => import('shiki/langs/ts.mjs'),
  tsx: () => import('shiki/langs/tsx.mjs'),
  jsx: () => import('shiki/langs/jsx.mjs'),
  json: () => import('shiki/langs/json.mjs')

}

// 定义了两个支持的主题，分别是：
//  material-theme-lighter: 浅色主题
//  material-theme-palenight: 深色主题
// 使用动态导入方式加载主题文件，并通过 .then(r => r.default) 提取默认导出内容。
const bundledThemes = {
  'material-theme-lighter': () => import('shiki/themes/material-theme-lighter.mjs').then(r => r.default),
  'material-theme-palenight': () => import('shiki/themes/material-theme-palenight.mjs').then(r => r.default)
}

// 设置高亮器的默认主题配置
// 默认使用 material-theme-lighter，深色模式使用 material-theme-palenight
const options = { theme: { light: 'material-theme-lighter', default: 'material-theme-lighter', dark: 'material-theme-palenight' } }
let configs

// 获取 MDC 插件配置
export function getMdcConfigs() {
  if (!configs) {
    configs = Promise.all([
      // import('/Users/far/projects/nuxt/nuxt.com/node_modules/.pnpm/nuxt-content-twoslash@0.1.2_@nuxtjs+mdc@0.16.1_magicast@0.3.5__magicast@0.3.5/node_modules/nuxt-content-twoslash/dist/runtime/mdc.config').then(m => m.default)
    ])
  }
  return configs
}

// 初始化 Shiki 的正则引擎为基于 WebAssembly 的 Oniguruma 引擎
const engine = createOnigurumaEngine(() => import('shiki/wasm'))
// 创建代码高亮器实例
const highlighter = createShikiHighlighter({ bundledLangs, bundledThemes, options, getMdcConfigs, engine })

/**
 * 解析Markdown内容，并应用特定的高亮样式
 *
 * 此函数使用`parseMarkdown`函数处理给定的`content`，并配置了特定的Markdown解析选项
 * 主要目的是为了在Markdown内容中实现代码块的语法高亮，特别是针对JavaScript和Vue语言
 * 它还配置了两种主题样式，以适应不同的视觉偏好
 *
 * @param {string} content - 需要解析的Markdown内容
 * @returns {Promise} - 返回解析后的结果
 */
export async function parseMdc(content) {
  return await parseMarkdown(content, {
    // 配置rehype插件，用于处理Markdown内容的高级解析
    rehype: {
      plugins: {
        highlight: {
          instance: rehypeHighlight
        }
      }
    },
    // 配置highlight.js用于代码块的语法高亮
    highlight: {
      highlighter,
      langs: ['js', 'vue'], // 指定需要高亮支持的编程语言
      theme: {
        default: 'material-theme-lighter', // 设置默认的主题样式
        dark: 'material-theme-palenight' // 设置暗色模式下的主题样式
      }
    }
  })
}
