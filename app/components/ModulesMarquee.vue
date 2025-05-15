<script setup lang="ts">
import { moduleImage, moduleIcon } from '~/composables/useModules'
import type { Module } from '~/types'

// 接收组件 props：模块列表
const props = defineProps<{
  modules: Module[] // 必填，模块数据数组
}>()

// Fisher-Yates 洗牌算法：打乱数组顺序，用于随机展示模块图标
const shuffleArray = (array: Module[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled
}

// 使用 useState 缓存三行滚动模块数据（避免重复初始化）
const marqueeModulesData = useState<Module[][]>('marqueeModules', () => [])

// 根据行索引和项索引生成一个随机延迟值，用于动画错峰显示
const getRandomDelay = (rowIndex: number, index: number) => {
  const baseDelay = (rowIndex * 0.3) + (index * 0.05)
  const randomOffset = ((rowIndex * 13) + index) % 10 * 0.1
  return baseDelay + randomOffset
}

// 初始化滚动模块数据：生成三行打乱后的模块列表
const initMarqueeModules = () => {
  if (marqueeModulesData.value.length) return

  const allModules: Module[] = props.modules
  const limitedModules = shuffleArray(allModules).slice(0, 50)

  const row1: Module[] = shuffleArray(limitedModules)
  const row2: Module[] = shuffleArray(limitedModules)
  const row3: Module[] = shuffleArray(limitedModules)

  marqueeModulesData.value = [row1, row2, row3]
}

// 监听 modules 数据变化，当模块加载完成时初始化 marquee 数据
watch(() => props.modules, (newVal?: Module[]) => {
  if (newVal?.length && !marqueeModulesData.value.length) {
    initMarqueeModules()
  }
}, { immediate: true })
</script>

<template>
  <div class="absolute isolate inset-0 overflow-hidden">
    <div class="flex flex-col justify-between pt-4">
      <UPageMarquee
        v-for="(row, rowIndex) in marqueeModulesData"
        :key="rowIndex"
        :reverse="rowIndex % 2 === 1"
        :overlay="false"
        :ui="{
          root: `[--gap:--spacing(4)] [--duration:400s]`
        }"
        class="mb-(--gap)"
      >
        <Motion
          v-for="(module, index) in row"
          :key="`${rowIndex}-${index}`"
          :initial="{
            scale: 0.5,
            opacity: 0,
            filter: 'blur(10px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            delay: getRandomDelay(rowIndex, index)
          }"
          class="flex items-center justify-center size-16 rounded-lg bg-muted p-2 border border-default dark:shadow-lg"
        >
          <UAvatar
            :src="moduleImage(module.icon)"
            :icon="moduleIcon(module.category)"
            :alt="module.name"
            size="lg"
            class="rounded-none bg-transparent"
          />
        </Motion>
      </UPageMarquee>
    </div>

    <div class="absolute left-0 top-0 bottom-0 w-1/2 z-10 bg-linear-to-bl from-default/30 to-default to-40%" />
    <div class="absolute right-0 top-0 bottom-0 w-1/2 z-10 bg-linear-to-br from-default/30 to-default to-40%" />
    <div class="absolute top-0 left-0 right-0 size-full z-10 bg-linear-to-t from-default to-default/15" />
  </div>
</template>
