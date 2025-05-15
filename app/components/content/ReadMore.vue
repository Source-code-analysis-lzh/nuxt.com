<script setup lang="ts">
// 从 scule 库中导入字符串处理函数
import { splitByCase, upperFirst } from 'scule'

// 定义组件 props
const props = defineProps({
  to: {
    type: String,
    required: true // 必填，表示链接的目标路径
  },
  title: {
    type: String,
    required: false,
    default: '' // 可选标题，如果不传则自动生成
  }
})

// 根据路径生成面包屑导航格式的标题
const createBreadcrumb = (link: string = 'Missing link') => {
  if (link.startsWith('http')) {
    // 如果是外部链接，直接返回原链接
    return link
  }

  // 处理内部路径：按 '/' 分割，过滤空值，转换为可读性更好的格式
  return link
    .split('/')
    .filter(Boolean)
    .map(part =>
      splitByCase(part) // 按大小写分割单词，如 "readMore" -> ["read", "More"]
        .map(p => upperFirst(p)) // 首字母大写
        .join(' ')
    )
    .join(' > ') // 使用 " > " 连接符组成面包屑结构
    .replace('Api', 'API') // 特殊替换 Api -> API
}

// 计算属性：优先使用传入的 title，否则使用 createBreadcrumb 生成
const computedTitle = computed<string>(() => props.title || createBreadcrumb(props.to))
</script>

<template>
  <ProseCallout icon="i-lucide-bookmark" :to="to" :aria-label="computedTitle">
    <slot mdc-unwrap="p">
      Read more in <span class="font-bold" v-text="computedTitle" />.
    </slot>
  </ProseCallout>
</template>
