<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts">
// 引入 URL 工具函数：判断是否包含协议、拼接 URL
import { hasProtocol, joinURL } from 'ufo'

// 获取当前路由信息
const route = useRoute()
// 从 useNuxtData 中获取模块数据，key 为 `module-${slug}`
const { data: module } = useNuxtData(`module-${route.params?.slug}`)
// 定义组件 props
const props = defineProps({
  src: { // 图片路径（相对或绝对）
    type: String,
    default: ''
  },
  alt: { // 替代文本
    type: String,
    default: ''
  },
  width: { // 可选宽度
    type: [String, Number],
    default: undefined
  },
  height: { // 可选高度
    type: [String, Number],
    default: undefined
  }
})
// 计算属性：动态生成最终的图片地址
const src = computed(() => {
  // 如果 src 包含协议（如 http://），则直接返回
  if (hasProtocol(props.src) || !module.value?.repo) return props.src
  // 否则基于模块的 GitHub 仓库地址和默认分支构建完整图片 URL
  const repo = module.value.repo.split('#')[0] // 去除 hash 部分
  return joinURL('https://raw.githubusercontent.com/', repo, module.value.stats.defaultBranch, props.src)
})
</script>
