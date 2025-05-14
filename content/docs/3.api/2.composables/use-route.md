---
title: "useRoute"
description: useRoute composable 返回当前路由。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
在 Vue 组件的模板中，你可以使用 `$route` 访问当前路由。
::

## 示例

在以下示例中，我们通过 [`useFetch`](/docs/api/composables/use-fetch) 使用动态页面参数 `slug` 作为 URL 的一部分来调用 API。

```html [~/pages/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data: mountain } = await useFetch(`/api/mountains/${route.params.slug}`)
</script>

<template>
  <div>
    <h1>{{ mountain.title }}</h1>
    <p>{{ mountain.description }}</p>
  </div>
</template>
```

如果你需要访问路由查询参数（例如路径 `/test?example=true` 中的 `example`），那么你可以使用 `useRoute().query` 而不是 `useRoute().params`。

## API

除了动态参数和查询参数之外，`useRoute()` 还提供了以下与当前路由相关的计算引用：

- `fullPath`: 与当前路由关联的编码 URL，包含路径、查询和哈希
- `hash`: URL 中以 # 开头的解码哈希部分
- `query`: 访问路由查询参数
- `matched`: 包含当前路由位置的标准化匹配路由数组
- `meta`: 附加到记录的自定义数据
- `name`: 路由记录的唯一名称
- `path`: URL 的编码路径名部分
- `redirectedFrom`: 在最终到达当前路由位置之前尝试访问的路由位置

::note
浏览器在发出请求时不会发送 [片段](https://url.spec.whatwg.org/#concept-url-fragment)（例如 `#foo`）。因此，在你的模板中使用 `route.fullPath` 可能会触发 hydration 问题，因为这将在客户端包含片段，但在服务器端不包含。
::

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/#RouteLocationNormalizedLoaded"}
