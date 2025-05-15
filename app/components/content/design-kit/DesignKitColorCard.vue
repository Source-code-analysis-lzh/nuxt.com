<script setup lang="ts">
// 定义组件 props
const props = defineProps<{
  name: string // 颜色名称，用于展示
  background: string // 颜色值（如 #fff 或 rgba 等），用于背景和显示
}>()

// 使用 useClipboard 提供的 copy 方法实现复制功能
const { copy } = useClipboard()

// 当用户点击“Copy”按钮时，复制颜色值到剪贴板，并显示提示信息
function copyLink() {
  copy(props.background, {
    title: 'Copied to clipboard', // 提示标题
    icon: 'i-lucide-copy-check' // 提示图标
  })
}
</script>

<template>
  <div>
    <UCard class="p-16 sm:p-16" :style="{ background }" />

    <div class="flex items-center justify-between pt-2">
      <h5 class="font-semibold text-highlighted text-base">
        {{ name }}
      </h5>
      <UButton variant="link" label="Copy" size="sm" @click="copyLink" />
    </div>
    <p class="text-muted text-sm">
      {{ background }}
    </p>
  </div>
</template>
