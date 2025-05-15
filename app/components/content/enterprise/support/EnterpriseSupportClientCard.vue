<script setup lang="ts">
// 定义组件 props，用于展示客户评价卡片
defineProps<{
  quote: string // 引用语（客户的评价内容）
  author: string // 作者姓名
  job: string // 作者职位
  logo: {
    light: string // 浅色模式下的 Logo 路径
    dark: string // 深色模式下的 Logo 路径
    alt?: string // Logo 的替代文本
    width?: number // Logo 的宽度
    height?: number // Logo 的高度
  }
  achievements: Array<{
    label: string // 成就标签名称（例如 "Performance Improvement"）
    color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'important' | 'neutral'  // 标签颜色样式
  }>
}>()
</script>

<template>
  <UPageCard variant="subtle">
    <template #description>
      {{ quote }}
    </template>

    <div class="flex flex-col justify-end h-full gap-y-4">
      <div class="flex justify-between gap-x-8 pt-6">
        <div>
          <div class="font-semibold text-highlighted">
            {{ author }}
          </div>
          <div class="text-sm text-muted">
            {{ job }}
          </div>
        </div>

        <UColorModeImage
          :light="logo.light"
          :dark="logo.dark"
          :width="logo.width"
          :height="logo.height"
          :alt="logo.alt"
          class="h-6 shrink-0 max-w-[140px] grayscale"
        />
      </div>

      <ul class="flex gap-x-1 flex-wrap gap-2">
        <li v-for="achievement in achievements" :key="achievement.label">
          <UBadge v-bind="achievement" variant="subtle" />
        </li>
      </ul>
    </div>
  </UPageCard>
</template>
