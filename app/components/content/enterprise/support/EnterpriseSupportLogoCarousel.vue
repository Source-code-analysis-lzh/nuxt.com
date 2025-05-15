<script lang="ts" setup>
// 定义 Logo 类型结构，包含 light/dark 模式图片路径、宽高和替代文本
interface Logo {
  src: string
  width: number
  height: number
  alt: string
  light: string
  dark: string
}

// 接收组件 props：一组 logo 数据
const { logos } = defineProps({
  logos: {
    type: Array as () => Logo[], // 必填，logo 数组
    required: true
  }
})

// 获取 carousel 元素引用，用于控制动画播放状态
const carousel = useTemplateRef('carousel')

// 停止动画的方法
const stopAnimation = () => {
  if (carousel.value) {
    carousel.value.style.animationPlayState = 'paused'
  }
}

// 恢复动画的方法
const startAnimation = () => {
  if (carousel.value) {
    carousel.value.style.animationPlayState = 'running'
  }
}
</script>

<template>
  <div class="overflow-hidden whitespace-nowrap relative h-12">
    <div class="h-12 w-[50px] sm:w-[100px] md:w-[200px] lg:w-[400px] bg-gradient-to-r from-white dark:from-slate-950 via-transparent to-transparent absolute left-0 z-10" />
    <div class="h-12 w-[50px]sm:w-[100px] md:w-[200px] lg:w-[400px] bg-gradient-to-r to-white dark:to-slate-950 via-transparent from-transparent absolute right-0 z-10" />
    <div
      ref="carousel"
      class="flex carousel"
      @mouseover="stopAnimation"
      @mouseleave="startAnimation"
    >
      <div v-for="({ light, dark, width, height, alt }, index) in logos ? [...logos, ...logos] : []" :key="index" class="carousel-item items-center">
        <UColorModeImage :light="light" :dark="dark" :width="width" :height="height" :alt="alt" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.carousel {
  animation: scroll 30s linear infinite;
  animation-play-state: running;
}

.carousel-item {
  flex: 0 0 auto;
  margin-right: 68px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-166%));
  }
}
</style>
