---
title: 'defineRouteRules'
description: '页面级混合渲染的路由规则。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
此功能为实验性功能，要使用它，您必须在 `nuxt.config` 中启用 `experimental.inlineRouteRules` 选项。
::

## 用法

```vue [pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true
})
</script>

<template>
  <h1>Hello world!</h1>
</template>
```

将会被转换为：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  }
})
```

::note
当运行 [`nuxt build`](/docs/api/commands/build) 时，首页将在 `.output/public/index.html` 中预渲染并静态提供。
::

## 注意事项

- 在 `~/pages/foo/bar.vue` 中定义的规则将应用于 `/foo/bar` 请求。
- 在 `~/pages/foo/[id].vue` 中定义的规则将应用于 `/foo/**` 请求。

- 为了获得更精细的控制，例如当您在页面的 [`definePageMeta`](/docs/api/utils/define-page-meta) 中使用了自定义的 `path` 或 `alias` 时，您应该直接在 `nuxt.config` 中设置 `routeRules`。

::read-more{to="/docs/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
阅读更多关于 `routeRules` 的信息。
::
