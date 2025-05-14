---
title: 'useRequestFetch'
description: 使用 useRequestFetch composable 转发服务器端 fetch 请求的请求上下文和标头。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

你可以使用 `useRequestFetch` 在进行服务器端 fetch 请求时转发请求上下文和标头。

当进行客户端 fetch 请求时，浏览器会自动发送必要的标头。
然而，当在服务器端渲染期间发起请求时，出于安全考虑，我们需要手动转发标头。

::note
**不打算转发** 的标头将 **不会包含** 在请求中。这些标头例如包括：
`transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`
::

::tip
[`useFetch`](/docs/api/composables/use-fetch) composable 在底层使用了 `useRequestFetch` 来自动转发请求上下文和标头。
::

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
// This will forward the user's headers to the `/api/cookies` event handler
// Result: { cookies: { foo: 'bar' } }
const requestFetch = useRequestFetch()
const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))

// This will NOT forward anything
// Result: { cookies: {} }
const { data: notForwarded } = await useAsyncData(() => $fetch('/api/cookies')) 
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const cookies = parseCookies(event)

  return { cookies }
})
```

::

::tip
在客户端导航期间的浏览器中，`useRequestFetch` 的行为将与普通的 [`$fetch`](/docs/api/utils/dollarfetch) 完全相同。
::
