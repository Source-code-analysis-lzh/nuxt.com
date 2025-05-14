---
title: 'useRequestURL'
description: 使用 useRequestURL composable 访问传入的请求 URL。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` 是一个辅助函数，它返回一个在服务器端和客户端都可用的 [URL 对象](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)。

::important
当使用带有缓存策略的 [混合渲染](/docs/guide/concepts/rendering#hybrid-rendering) 时，通过 [Nitro 缓存层](https://nitro.unjs.io/guide/cache) 处理缓存的响应时，所有传入的请求标头都会被丢弃（这意味着 `useRequestURL` 对于 `host` 将返回 `localhost`）。

你可以定义 [`cache.varies` 选项](https://nitro.unjs.io/guide/cache#options) 来指定在缓存和提供响应时将考虑的标头，例如多租户环境中的 `host` 和 `x-forwarded-host`。
::

::code-group

```vue [pages/about.vue]
<script setup lang="ts">
const url = useRequestURL()
</script>

<template>
  <p>URL is: {{ url }}</p>
  <p>Path is: {{ url.pathname }}</p>
</template>
```

```html [Result in development]
<p>URL is: http://localhost:3000/about</p>
<p>Path is: /about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
在 MDN 文档上阅读关于 URL 实例属性的内容。
::
