---
title: useLazyAsyncData
description: 这个 useAsyncData 的包装器会立即触发导航。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## 描述

默认情况下，[`useAsyncData`](/docs/api/composables/use-async-data) 会阻塞导航，直到其异步处理函数解析完成。`useLazyAsyncData` 提供了一个 [`useAsyncData`](/docs/api/composables/use-async-data) 的包装器，它通过将 `lazy` 选项设置为 `true`，在处理函数解析之前触发导航。

::note
`useLazyAsyncData` 具有与 [`useAsyncData`](/docs/api/composables/use-async-data) 相同的签名。
::

:read-more{to="/docs/api/composables/use-async-data"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* Navigation will occur before fetching is complete.
  Handle 'pending' and 'error' states directly within your component's template
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // Because count might start out null, you won't have access
  // to its contents immediately, but you can watch it.
})
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Loading' : count }}
  </div>
</template>
```

::warning
`useLazyAsyncData` 是一个被编译器转换的保留函数名，因此你不应该将你自己的函数命名为 `useLazyAsyncData`。
::

:read-more{to="/docs/getting-started/data-fetching"}
