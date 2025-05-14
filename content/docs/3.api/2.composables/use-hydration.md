---
title: 'useHydration'
description: 允许完全控制 hydration 周期，以便从服务器设置和接收数据。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

::note
这是一个高级的可组合函数，主要设计用于插件内部，多被 Nuxt 模块使用。
::

::note
`useHydration` 的设计目的是 **确保 SSR 期间的状态同步和恢复**。如果你需要在 Nuxt 中创建一个全局响应式的、SSR 友好的状态，建议选择 [`useState`](/docs/api/composables/use-state)。
::

`useHydration` 是一个内置的可组合函数，它提供了一种在每次新的 HTTP 请求时在服务器端设置数据，并在客户端接收该数据的方式。通过这种方式，`useHydration` 允许你完全控制 hydration 周期。

服务器端 `get` 函数返回的数据存储在 `nuxtApp.payload` 中，其键是作为 `useHydration` 第一个参数提供的唯一键。在 hydration 期间，这些数据然后在客户端被检索，从而避免了冗余的计算或 API 调用。

## 用法

::code-group

```ts [Without useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      nuxtApp.payload.myStoreState = myStore.getState()
    })
  }

  if (import.meta.client) {
    nuxt.hooks.hook('app:created', () => {
      myStore.setState(nuxtApp.payload.myStoreState)
    })
  }
})
```

```ts [With useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  useHydration(
    'myStoreState', 
    () => myStore.getState(), 
    (data) => myStore.setState(data)
  )
})
```
::

## 类型

```ts [signature]
useHydration <T> (key: string, get: () => T, set: (value: T) => void) => void
```

## 参数

- `key`: 一个唯一的键，用于标识你的 Nuxt 应用中的数据。
- `get`: 一个 **仅在服务器端** 执行的函数（在 SSR 渲染完成时调用），用于设置初始值。
- `set`: 一个 **仅在客户端** 执行的函数（在初始 Vue 实例创建时调用），用于接收数据。
