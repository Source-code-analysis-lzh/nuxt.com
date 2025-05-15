<script lang="ts" setup>
// 定义组件 props，用于展示一个圆形能力图标卡片
const { logo } = defineProps<{
  logo: {
    src: string // 图标图片路径
    height?: number // 图片高度（可选）
    width?: number // 图片宽度（可选）
    color: string // 圆形背景渐变色
    alt?: string // 替代文本（可选）
  }
}>()

// 获取颜色值用于样式绑定
const color = logo.color
// 使用 useTemplateRef 获取 DOM 元素引用 'circle'
const circle = useTemplateRef('circle')
// 使用 useMouseInElement 监听鼠标在元素内的位置（x, y）
const { elementX, elementY } = useMouseInElement(circle)
</script>

<template>
  <div
    ref="circle"
    :style="{
      '--x': `${elementX}px`,
      '--y': `${elementY}px`
    }"
    class="relative group isolate ring-1 bg-muted ring-default before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-full lg:flex-1 flex flex-col shadow circle-gradient items-center justify-center rounded-full"
  >
    <div class="p-5 sm:p-6 flex-1 flex flex-col overflow-hidden rounded-full divide-y divide-default bg-muted hover:bg-opacity-90 transition-[background-opacity]">
      <NuxtImg :src="logo.src" :width="logo.width" :height="logo.height" :alt="logo.alt" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.circle-gradient::before {
  background: radial-gradient(
    70px circle at var(--x) var(--y),
    v-bind(color) 0%,
    transparent 100%
  );
  will-change: background;
}
</style>
