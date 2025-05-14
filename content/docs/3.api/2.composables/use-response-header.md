---
title: "useResponseHeader"
description: 使用 useResponseHeader 设置服务器响应标头。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
此 composable 在 Nuxt v3.14+ 版本中可用。
::

你可以使用内置的 [`useResponseHeader`](/docs/api/composables/use-response-header) composable 在你的页面、组件和插件中设置任何服务器响应标头。

```ts
// Set the a custom response header
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';
```

## 示例

我们可以使用 `useResponseHeader` 轻松地在每个页面的基础上设置响应标头。

```vue [pages/test.vue]
<script setup>
// pages/test.vue
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';
</script>

<template>
  <h1>Test page with custom header</h1>
  <p>The response from the server for this "/test" page will have a custom "X-My-Header" header.</p>
</template>
```

例如，我们可以在 Nuxt [中间件](/docs/guide/directory-structure/middleware) 中使用 `useResponseHeader` 为所有页面设置响应标头。

```ts [middleware/my-header-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header');
  header.value = `I'm Always here!`;
});

```
