import { writeFile } from 'node:fs/promises'
import type { Schema } from 'untyped'
import { upperFirst } from 'scule'

/**
 * 为给定的 schema 生成 Markdown 格式的文档。
 *
 * 此函数递归解析 schema 对象，生成 Markdown 格式的文档行。
 * 处理了标题、描述、类型、默认值等元信息，并将其格式化为 Markdown 文本。
 *
 * @param schema 待解析的 schema 对象。
 * @param title 用于文档标题的字符串。
 * @param level 指定 Markdown 标题级别（如 '#' 表示 H1）。
 * @returns 返回一个字符串数组，每一项代表一行生成的 Markdown 内容。
 */
function generateMarkdown(schema: Schema, title: string, level: string) {
  const lines: string[] = []

  // Skip private 跳过带有 @private 标签的属性
  if (schema.tags?.includes('@private')) {
    return []
  }

  // Render heading 生成带标题级别的 Markdown
  lines.push(`${level} ${title}`, '')

  // Render title 添加标题和描述
  if (schema.title) {
    lines.push(schema.title, '')
  }

  // Render description
  if (schema.description) {
    lines.push(schema.description, '')
  }

  // Render meta info
  if (schema.type !== 'object' || !schema.properties) {
    // Type and default
    if (schema.type !== 'any') {
      lines.push(`- **Type**: \`${schema.type}\``)
    }
    const defaultValue = formatValue(schema.default)
    if (defaultValue && defaultValue.length) {
      if (defaultValue.length === 1) {
        lines.push(`- **Default:** ${defaultValue[0]}`)
      } else {
        lines.push('- **Default**', ...defaultValue)
      }
    }

    // lines.push(`- **Version**: ${versions.join(', ')}`)

    lines.push('')
  }
  // 处理标签（如 @note, @warning）并渲染为对应的提示块
  // Render @ tags
  if (schema.tags) {
    lines.push(...schema.tags.map(renderTag).flat())
  }

  // Render properties
  if (schema.type === 'object') {
    const keys = Object.keys(schema.properties || {}).sort()
    for (const key of keys) {
      const val = schema.properties[key] as Schema
      // 如果是对象类型，则递归处理其属性
      const propLines = generateMarkdown(val, `\`${key}\``, level + '#')
      if (propLines.length) {
        lines.push('', ...propLines)
      }
    }
  }

  return lines
}

// 正则表达式，用于匹配以 @ 开头的标签
const TAG_REGEX = /^@(\w+)\s/

// 定义支持的标签类型及其对应的 Markdown 提示块样式
// 用于将特定标签转换为文档中的提示区块（callout）
const TagAlertType = {
  note: 'note', // @note
  warning: 'warning', // @warning
  deprecated: 'caution' // @deprecated
}

// 一个集合，包含内部使用或应被隐藏的标签名称
const InternalTypes = new Set([
  'version',
  'deprecated'
])

/**
 * 格式化给定的值为特定格式的字符串或字符串数组
 * 该函数主要用于准备值的可视化展示，特别是对于JSON数据
 *
 * @param {any} val - 需要格式化的值，可以是任何JSON兼容的数据类型
 * @returns {string[] | null} - 返回格式化后的字符串数组或null
 */
function formatValue(val) {
  // 将给定的值序列化为JSON字符串，使用缩进以便于阅读
  const stringified = JSON.stringify(val, null, 2)

  // 检查序列化后的字符串是否为空或仅包含空对象/数组
  if (!stringified || stringified === '{}' || stringified === '[]') {
    // 在这种情况下，返回null表示没有有意义的数据可以展示
    return null
  }
  // 检查序列化后的字符串是否包含换行符，即是否为多行格式
  if (stringified.includes('\n')) {
    // 如果是多行格式，为其添加代码块标记，以便在Markdown中展示为代码格式
    return ['```json', stringified, '```']
  } else {
    // 如果不是多行格式，简单地为其添加单行代码标记
    return ['`' + stringified + '`']
  }
}

/**
 * 渲染标签字符串，根据不同的标签类型进行相应的格式化处理
 * @param tag 待渲染的标签字符串
 * @returns 返回渲染后的字符串或字符串数组
 */
function renderTag(tag: string) {
  // 提取标签中的类型
  const type = tag.match(TAG_REGEX)?.[1]

  // 如果没有类型，则返回带有标签的注释
  if (!type) {
    return [`<!-- ${tag} -->`]
  }

  // 如果类型是内部类型，则不渲染，返回空数组
  if (InternalTypes.has(type)) {
    return []
  }

  // 替换标签中的类型为格式化后的字符串，并移除不必要的部分
  tag = tag.replace(`@${type}`, `**${upperFirst(type)}**:`)
    .replace('js\'node:fs\'', 'js') // hotfix
  // 如果类型是警告类型，则使用特定的格式包裹标签
  if (TagAlertType[type]) {
    return ['::callout', tag, '::', '']
  }
  // 其他情况，直接返回处理后的标签
  return tag + '\n'
}

import { defineNuxtModule } from '@nuxt/kit'

// 创建一个 Nuxt 自定义模块
// 该段代码是一个 Nuxt 模块，主要职责是在构建过程中自动从远程拉取 Nuxt 配置的 JSON schema，然后根据这个 schema 自动生成 Markdown 格式的配置文档，并插入到指定的 Markdown 文件中。支持自动替换、错误捕获和调试输出，适用于自动化文档生成场景。
export default defineNuxtModule((options, nuxt) => {
  // 注册钩子，当 Nuxt Content 模块即将解析 Markdown 文件前触发此钩子，用于在解析前修改文件内容。
  nuxt.hook('content:file:beforeParse', async ({ file }) => {
    // Disable docs readme
    if (file.id === 'nuxt-docs:docs:README.md') {
      // 禁用 README.md 的导航生成
      file.body = '---\nnavigation: false\n---'
    }
    // 通过添加 YAML Front Matter 控制内容展示行为
    // Generate the markdown from the schema
    const GENERATE_KEY = '<!-- GENERATED_CONFIG_DOCS -->'
    // 作为 Markdown 文件中的插入标记，表示需要自动生成配置文档的位置
    // 判断是否需要生成文档，如果文件内容是字符串类型，并且包含 GENERATE_KEY，则继续执行文档生成逻辑
    if (typeof file.body === 'string' && file.body.includes(GENERATE_KEY)) {
      let generatedDocs = ''
      try {
        // 获取远程 schema 数据
        // 从 CDN（如 https://unpkg.com）获取最新的 Nuxt 配置 schema JSON 文件
        const rootSchema = await fetch('https://unpkg.com/@nuxt/schema@latest/schema/config.schema.json').then(res => res.json()) as Schema
        // 开始生成文档
        const start = Date.now() // 记录开始时间以计算性能
        console.log(`Generating config docs on ${file.id}`)
        // 提取所有配置项名称并排序，确保输出有序
        const keys = Object.keys(rootSchema.properties).sort()

        // 如果运行到这里才发现没有占位符，则发出警告并退出
        if (!file.body.includes(GENERATE_KEY)) {
          return console.warn(`Could not find ${GENERATE_KEY} in ${file.id}`)
        }

        // Generate each section 逐个生成每个配置项的 Markdown 内容
        for (const key of keys) {
          const schema = rootSchema.properties[key]
          // 对每个配置项调用 generateMarkdown() 函数生成 Markdown 内容
          const lines = generateMarkdown(schema, key, '##')

          // Skip empty sections，如果内容太短（少于 3 行），跳过该配置项
          if (lines.length < 3) {
            continue
          }

          // Add lines to new file content 合并所有生成的内容为一个完整字符串
          generatedDocs += lines.join('\n') + '\n'
        }
        // 将 Markdown 文件中的 <!-- GENERATED_CONFIG_DOCS --> 占位符替换为实际生成的配置文档内容
        file.body = file.body.replace(GENERATE_KEY, generatedDocs)
        // 输出整个文档生成过程所耗费的时间（以秒为单位）
        console.log(`Config docs generated in ${(Date.now() - start) / 1000} seconds!`)
      } catch (err) {
        console.error('Could not generate config docs', err)
        // 将已生成的内容保存到本地文件 debug-config-docs.md 中，便于调试分析
        await writeFile('debug-config-docs.md', generatedDocs)
      }
    }
  })
})
