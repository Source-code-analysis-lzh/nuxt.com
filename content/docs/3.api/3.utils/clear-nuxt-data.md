---
title: 'clearNuxtData'
description: 删除 useAsyncData 和 useFetch 的缓存数据、错误状态和待处理的 Promise。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
这个方法在你想使另一个页面的数据获取失效时非常有用。
::

## 类型

```ts
clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

* `keys`: 一个或多个在 [`useAsyncData`](/docs/api/composables/use-async-data) 中使用的键名，用于删除它们的缓存数据。如果没有提供任何键名，则 **所有数据** 都将失效。
