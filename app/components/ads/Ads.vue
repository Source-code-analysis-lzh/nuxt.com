<script setup lang="ts">
// 通过 插件 provide 方法注入到 nuxtApp 中，这里再取出
const { $ads } = useNuxtApp()
// 获取当前路由信息
const route = useRoute()
// 创建一个响应式状态 uiProAd，初始值为随机整数（0 或 1）
const uiPro = useState('uiProAd', () => Math.round(Math.random()))
// 如果不是在 hydration 阶段，则重新生成随机数并赋值给 uiPro
if (!useNuxtApp().isHydrating) {
  uiPro.value = Math.round(Math.random())
}
</script>

<template>
  <div class="space-y-3">
    <AdsUIPro v-if="uiPro" />
    <AdsFallback v-else-if="$ads.adBlocked.value" />
    <LazyAdsCarbon v-else :key="route.path" />
  </div>
</template>
