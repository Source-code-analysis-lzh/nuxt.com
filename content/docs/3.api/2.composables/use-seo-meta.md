---
title: 'useSeoMeta'
description: useSeoMeta composable 允许你将站点的 SEO 元标签定义为一个扁平对象，并提供完整的 TypeScript 支持。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

这有助于你避免常见的错误，例如使用 `name` 而不是 `property`，以及拼写错误 - 超过 100 个元标签都经过完整的类型定义。

::important
这是向你的站点添加元标签的推荐方式，因为它具有 XSS 安全性并提供完整的 TypeScript 支持。
::

:read-more{to="/docs/getting-started/seo-meta"}

## 用法

```vue [app.vue]
<script setup lang="ts">
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

当插入响应式的标签时，你应该使用计算 getter 语法 (`() => value`)：

```vue [app.vue]
<script setup lang="ts">
const title = ref('My title')

useSeoMeta({
  title,
  description: () => `This is a description for the ${title.value} page`
})
</script>
```

## 参数

有超过 100 个参数。请参阅 [源代码中的完整参数列表](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035)。

:read-more{to="/docs/getting-started/seo-meta"}

## 性能

在大多数情况下，SEO 元标签不需要是响应式的，因为搜索引擎机器人主要扫描初始页面加载。

为了获得更好的性能，当元标签不需要是响应式的时候，你可以将你的 `useSeoMeta` 调用包裹在仅服务器端的条件中：

```vue [app.vue]
<script setup lang="ts">
if (import.meta.server) {
  // These meta tags will only be added during server-side rendering
  useSeoMeta({
    robots: 'index, follow',
    description: 'Static description that does not need reactivity',
    ogImage: 'https://example.com/image.png',
    // other static meta tags...
  })
}

const dynamicTitle = ref('My title')
// Only use reactive meta tags outside the condition when necessary
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

这以前使用 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) composable，但为了支持这种方法，它已被弃用。
