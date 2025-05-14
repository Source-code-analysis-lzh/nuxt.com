---
title: 'clearNuxtState'
description: 删除 useState 的缓存状态。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
如果你想使 `useState` 的状态失效，这个方法很有用。
::

## 类型

```ts
clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

- `keys`: 一个或一个由 [`useState`](/docs/api/composables/use-state) 中使用的键组成的数组，用于删除其缓存状态。如果未提供任何键，**所有状态** 都将失效。
