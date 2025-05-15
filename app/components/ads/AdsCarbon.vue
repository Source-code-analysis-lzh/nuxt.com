<script setup lang="ts">
// 使用 useTemplateRef 获取模板中的 DOM 元素引用 'carbonads'
const carbonads = useTemplateRef('carbonads')

// 在组件挂载后执行
onMounted(() => {
  if (carbonads.value) {
    // 创建一个 script 元素用于加载 Carbon Ads 的脚本
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', 'https://cdn.carbonads.com/carbon.js?serve=CWYD553E&placement=nuxtcom')
    script.setAttribute('id', '_carbonads_js')
    // 将脚本插入到 carbonads 容器中
    carbonads.value.appendChild(script)
  }
})
</script>

<template>
  <!-- 使用 ref="carbonads" 标记该 div，供 JS 引用以注入广告脚本 -->
  <div ref="carbonads" class="carbon" />
</template>

<style scoped>
@reference "../../assets/css/main.css";

.carbon :deep(#carbonads) {
  @apply relative border border-default rounded-md hover:bg-elevated/50 w-full transition-colors min-h-[220px] p-2;

  .carbon-img {
    @apply flex justify-center w-full;

    & > img {
      @apply !max-w-full w-full rounded-sm;
    }
  }

  .carbon-text {
    @apply text-sm text-muted transition-colors text-center text-pretty flex pt-2;
  }

  .carbon-poweredby {
    @apply block text-xs text-center text-muted pt-2;
  }

  &:hover {
    .carbon-text {
      @apply text-default;
    }
  }
}
</style>
