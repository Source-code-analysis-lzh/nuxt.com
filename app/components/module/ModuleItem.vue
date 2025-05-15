<script setup lang="ts">
import type { Module } from '~/types'

// 接收组件 props：module（模块数据）和 showBadge（是否显示徽章）
const { module, showBadge = true } = defineProps<{
  module: Module
  showBadge?: boolean
}>()

// 使用剪贴板功能，用于复制安装命令
const { copy } = useClipboard()

// 获取当前选择的排序方式（用于时间展示）
const { selectedSort } = useModules()

// 根据排序字段动态计算时间展示（创建时间或发布时间）
const date = computed(() => {
  if (selectedSort.value.key === 'publishedAt') {
    return useTimeAgo(module.stats.publishedAt)
  }

  return useTimeAgo(module.stats.createdAt)
})

// 复制 Nuxt 模块安装命令到剪贴板
function copyInstallCommand(moduleName: string) {
  const command = `npx nuxi@latest module add ${moduleName}`
  copy(command, { title: 'Command copied to clipboard:', description: command })
}
</script>

<template>
  <UPageCard
    :to="`/modules/${module.name}`"
    :title="module.npm"
    :description="module.description"
    class="group"
    variant="subtle"
    :ui="{
      description: 'line-clamp-2 text-muted text-sm',
      container: 'flex flex-col',
      wrapper: 'flex flex-col min-h-0 items-start',
      body: 'flex-none',
      footer: 'w-full mt-auto pointer-events-auto pt-4 z-[1]'
    }"
  >
    <template #leading>
      <UAvatar
        :src="moduleImage(module.icon)"
        :icon="moduleIcon(module.category)"
        :alt="module.name"
        size="md"
        class="rounded-md bg-transparent"
      />
    </template>

    <UBadge
      v-if="showBadge && module.type === 'official'"
      class="shine absolute top-4 right-4 sm:top-6 sm:right-6"
      variant="subtle"
      color="primary"
      label="Official"
    />

    <UBadge
      v-if="showBadge && module.sponsor"
      class="shine absolute top-4 right-4 sm:top-6 sm:right-6"
      variant="subtle"
      color="important"
      label="Sponsor"
    />

    <template #footer>
      <USeparator type="dashed" class="mb-4" />

      <div class="flex items-center justify-between gap-3 -my-1 text-muted">
        <div class="flex items-center gap-3 flex-wrap">
          <UTooltip text="Monthly NPM Downloads">
            <NuxtLink
              class="flex items-center gap-1 hover:text-highlighted"
              :to="`https://npm.chart.dev/${module.npm}`"
              target="_blank"
            >
              <UIcon name="i-lucide-circle-arrow-down" class="size-4 shrink-0" />
              <span class="text-sm font-medium whitespace-normal">{{ formatNumber(module.stats.downloads) }}</span>
            </NuxtLink>
          </UTooltip>

          <UTooltip text="GitHub Stars">
            <NuxtLink
              class="flex items-center gap-1 hover:text-highlighted"
              :to="`https://github.com/${module.repo}`"
              target="_blank"
            >
              <UIcon name="i-lucide-star" class="size-4 shrink-0" />
              <span class="text-sm font-medium whitespace-normal">{{ formatNumber(module.stats.stars || 0) }}</span>
            </NuxtLink>
          </UTooltip>

          <UTooltip v-if="selectedSort.key === 'publishedAt'" :text="`Updated ${formatDateByLocale('en', module.stats.publishedAt)}`">
            <NuxtLink
              class="flex items-center gap-1 hover:text-highlighted"
              :to="`https://github.com/${module.repo}`"
              target="_blank"
            >
              <UIcon name="i-lucide-radio" class="size-4 shrink-0" />
              <span class="text-sm font-medium whitespace-normal">{{ date }}</span>
            </NuxtLink>
          </UTooltip>

          <UTooltip v-if="selectedSort.key === 'createdAt'" :text="`Created ${formatDateByLocale('en', module.stats.createdAt)}`">
            <NuxtLink
              class="flex items-center gap-1 hover:text-highlighted"
              :to="`https://github.com/${module.repo}`"
              target="_blank"
            >
              <UIcon name="i-lucide-package" class="size-4 shrink-0" />
              <span class="text-sm font-medium whitespace-normal">{{ date }}</span>
            </NuxtLink>
          </UTooltip>
        </div>

        <UTooltip text="Copy install command">
          <UButton
            icon="i-lucide-terminal"
            color="neutral"
            size="xs"
            variant="outline"
            @click="copyInstallCommand(module.name)"
          >
            <span class="sr-only">Copy command to install {{ module.name }}</span>
          </UButton>
        </UTooltip>
      </div>
    </template>
  </UPageCard>
</template>

<style lang="postcss" scoped>
.shine {
  text-decoration: none;
  display: inline-block;
  mask-image: linear-gradient(-75deg, rgba(255,255,255,.8) 30%, #fff 50%, rgba(255,255,255,.8) 70%);
  mask-size: 200%;
  animation: shine 2s linear infinite;
}

@keyframes shine {
  from { -webkit-mask-position: 150%; }
  to { -webkit-mask-position: -50%; }
}
</style>
