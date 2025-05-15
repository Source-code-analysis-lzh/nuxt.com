<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="inline-block mr-1 text-primary hover:text-primary/80"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
// 引入工具函数：判断是否包含协议、拼接 URL
import { hasProtocol, joinURL } from 'ufo'

// 获取当前路由信息
const route = useRoute()
// 从 useNuxtData 中获取模块数据，key 为 `module-${slug}`
const { data: module } = useNuxtData(`module-${route.params?.slug}`)

// 定义组件 props
const props = defineProps({
  href: { // 外部传入的链接地址
    type: String,
    default: ''
  },
  target: { // 可选：打开方式，如 `_blank`
    type: String,
    default: undefined,
    required: false
  }
})

// 计算属性：动态生成最终的 href 链接
const href = computed(() => {
  // 如果 href 包含协议（如 http://），则直接返回
  if (hasProtocol(props.href) || !module.value?.github) return props.href
  // 否则基于模块的 GitHub 地址和默认分支构建完整 URL
  return joinURL(module.value.github, 'blob', module.value.stats?.defaultBranch || 'main', props.href)
})
</script>
