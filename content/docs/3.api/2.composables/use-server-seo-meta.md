---
title: 'useServerSeoMeta'
description: useServerSeoMeta composable 允许你将站点的 SEO 元标签定义为一个扁平对象，并提供完整的 TypeScript 支持。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

就像 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 一样，`useServerSeoMeta` composable 允许你将站点的 SEO 元标签定义为一个扁平对象，并提供完整的 TypeScript 支持。

:read-more{to="/docs/api/composables/use-seo-meta"}

在大多数情况下，元数据不需要是响应式的，因为机器人只会扫描初始加载。因此，我们建议使用 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) 作为一个注重性能的工具，它在客户端不会执行任何操作（也不会返回 `head` 对象）。

```vue [app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})
</script>
```

参数与 [`useSeoMeta`](/docs/api/composables/use-seo-meta) 完全相同。

:read-more{to="/docs/getting-started/seo-meta"}
