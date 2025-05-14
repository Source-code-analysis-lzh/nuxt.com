---
title: "useRequestHeaders"
description: 使用 useRequestHeaders 访问传入的请求标头。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

你可以使用内置的 [`useRequestHeaders`](/docs/api/composables/use-request-headers) composable 来访问你的页面、组件和插件中的传入请求标头。

```js
// Get all request headers
const headers = useRequestHeaders()

// Get only cookie request header
const headers = useRequestHeaders(['cookie'])
```

::tip
在浏览器中，`useRequestHeaders` 将返回一个空对象。
::

## 示例

我们可以使用 `useRequestHeaders` 来访问并在 SSR 期间将初始请求的 `authorization` 标头代理到任何未来的内部请求。

下面的示例将 `authorization` 请求标头添加到一个同构的 `$fetch` 调用中。

```vue [pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization'])
})
</script>
```
