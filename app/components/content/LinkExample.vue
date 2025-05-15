<template>
  <ProseCallout icon="lucide-app-window-mac">
    Read and edit a live example in
    <NuxtLink :to="to">
      {{ computedTitle }}
    </NuxtLink>.
  </ProseCallout>
</template>

<script setup lang="ts">
// 引入 Vue 的 ComputedRef 类型
import type { ComputedRef } from 'vue'

// 定义组件接收的 props
const props = defineProps<{
  to: string // 链接的目标路径
  title?: string // 可选标题，默认使用 createBreadcrumb(to) 自动生成
}>()

// 计算属性 computedTitle，基于 to 路径生成标题
const computedTitle: ComputedRef<string> = computed(() => createBreadcrumb(props.to))
</script>
