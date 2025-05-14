---
title: "$fetch"
description: Nuxt 使用 ofetch 来全局暴露用于发起 HTTP 请求的 $fetch 助手函数。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

Nuxt 使用 [ofetch](https://github.com/unjs/ofetch) 在你的 Vue 应用程序或 API 路由中全局暴露 `$fetch` 助手函数，用于发起 HTTP 请求。

::tip{icon="i-lucide-rocket"}
在服务器端渲染期间，调用 `$fetch` 来获取你的内部 [API 路由](/docs/guide/directory-structure/server) 将直接调用相关的函数（模拟请求），**从而节省额外的 API 调用**。
::

::note{color="blue" icon="i-lucide-info"}
在组件中使用 `$fetch` 而不使用 [`useAsyncData`](/docs/api/composables/use-async-data) 包裹会导致数据被获取两次：初始在服务器端获取一次，然后在客户端水合期间再次获取，因为 `$fetch` 不会将状态从服务器传输到客户端。因此，由于客户端必须再次获取数据，因此将在两端执行 fetch 操作。
::

## 用法

我们建议使用 [`useFetch`](/docs/api/composables/use-fetch) 或 [`useAsyncData`](/docs/api/composables/use-async-data) + `$fetch` 来防止在获取组件数据时重复获取数据。

```vue [app.vue]
<script setup lang="ts">
// During SSR data is fetched twice, once on the server and once on the client.
const dataTwice = await $fetch('/api/item')

// During SSR data is fetched only on the server side and transferred to the client.
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// You can also useFetch as shortcut of useAsyncData + $fetch
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/getting-started/data-fetching"}

你可以在任何仅在客户端执行的方法中使用 `$fetch`。

```vue [pages/contact.vue]
<script setup lang="ts">
async function contactForm() {
  await $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world '}
  })
}
</script>

<template>
  <button @click="contactForm">Contact</button>
</template>
```

::tip
`$fetch` 是在 Nuxt 中进行 HTTP 调用的首选方式，而不是为 Nuxt 2 制作的 [@nuxt/http](https://github.com/nuxt/http) 和 [@nuxtjs/axios](https://github.com/nuxt-community/axios-module)。
::

::note
如果在开发环境中使用 `$fetch` 调用带有自签名证书的 (外部) HTTPS URL，你需要设置环境变量 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::

### 传递 Headers 和 Cookies

当我们在浏览器中调用 `$fetch` 时，用户的 headers（例如 `cookie`）将直接发送到 API。

然而，在服务器端渲染期间，由于存在诸如 服务器端请求伪造 (SSRF) 或 身份验证滥用 等安全风险，`$fetch` 不会包含用户的浏览器 cookie，也不会传递 fetch 响应中的 cookie。

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
// This will NOT forward headers or cookies during SSR
const { data } = await useAsyncData(() => $fetch('/api/cookies'))
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const foo = getCookie(event, 'foo')
  // ... Do something with the cookie
})
```
::

如果你需要在服务器上转发 headers 和 cookies，你必须手动传递它们：

```vue [pages/index.vue]
<script setup lang="ts">
// This will forward the user's headers and cookies to `/api/cookies`
const requestFetch = useRequestFetch()
const { data } = await useAsyncData(() => requestFetch('/api/cookies'))
</script>
```

然而，当在服务器上使用相对 URL 调用 `useFetch` 时，Nuxt 将使用 [`useRequestFetch`](/docs/api/composables/use-request-fetch) 来代理 headers 和 cookies（不打算转发的 headers 除外，例如 `host`）。
