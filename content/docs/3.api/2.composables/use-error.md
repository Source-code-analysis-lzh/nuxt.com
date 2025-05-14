---
title: "useError"
description: useError composable 返回当前正在处理的全局 Nuxt 错误。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

该 composable 返回当前正在处理的全局 Nuxt 错误，并且在客户端和服务器端都可用。

```ts
const error = useError()
```

`useError` 在状态中设置一个错误，并创建一个响应式的、SSR 友好的全局 Nuxt 错误，该错误可在所有组件中使用。

Nuxt 错误具有以下属性：

```ts
interface {
  //  HTTP response status code
  statusCode: number
  // HTTP response status message
  statusMessage: string
  // Error message
  message: string
}
```

:read-more{to="/docs/getting-started/error-handling"}
