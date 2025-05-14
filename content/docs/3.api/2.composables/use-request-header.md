---
title: "useRequestHeader"
description: 使用 useRequestHeader 访问特定的传入请求标头。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

你可以使用内置的 [`useRequestHeader`](/docs/api/composables/use-request-header) composable 来访问你的页面、组件和插件中的任何传入请求标头。

```ts
// Get the authorization request header
const authorization = useRequestHeader('authorization')
```

::tip
在浏览器中，`useRequestHeader` 将返回 `undefined`。
::

## 示例

我们可以使用 `useRequestHeader` 轻松判断用户是否已授权。

下面的示例读取 `authorization` 请求标头，以确定某人是否有权访问受限资源。

```ts [middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```
