<script setup lang="ts">
// 定义组件接收的 props
defineProps<{
  name: string // 图标名称，用于展示
  path: string // 图标路径（相对于 /assets/design-kit/）
  background?: string // 可选背景色样式类名
  full?: boolean // 是否使用全尺寸内边距
}>()
</script>

<template>
  <div class="not-prose">
    <UCard :ui="{ body: full ? 'p-11 sm:p-11' : 'p-8 sm:p-8' }" :class="background">
      <img :src="`/assets/design-kit/${path}.svg`" :alt="name" class="mx-auto" :class="full ? 'h-10' : 'h-16'">
    </UCard>

    <div class="flex items-center justify-between pt-2">
      <h5 class="font-semibold text-gray-900 dark:text-white text-base">
        {{ name }}
      </h5>

      <div class="flex items-center">
        <UButton
          variant="link"
          label="svg"
          size="sm"
          :to="`/assets/design-kit/${path}.svg`"
          download
          external
          aria-label="Download svg"
        />
        <UButton
          variant="link"
          label="png"
          size="sm"
          :to="`/assets/design-kit/${path}.png`"
          download
          external
          aria-label="Download png"
        />
      </div>
    </div>
  </div>
</template>
