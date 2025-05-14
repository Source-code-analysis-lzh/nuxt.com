---
title: 'useLazyFetch'
description: 这个 useFetch 的包装器会立即触发导航。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

## 描述

默认情况下，[`useFetch`](/docs/api/composables/use-fetch) 会阻塞导航，直到其异步处理函数解析完成。`useLazyFetch` 提供了一个 [`useFetch`](/docs/api/composables/use-fetch) 的包装器，它通过将 `lazy` 选项设置为 `true`，在处理函数解析之前触发导航。

::note
`useLazyFetch` 具有与 [`useFetch`](/docs/api/composables/use-fetch) 相同的签名。
::

::note
在这种模式下等待 `useLazyFetch` 仅确保调用已初始化。在客户端导航时，数据可能不会立即可用，你应该确保在你的应用中处理 pending 状态。
::

:read-more{to="/docs/api/composables/use-fetch"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* Navigation will occur before fetching is complete.
 * Handle 'pending' and 'error' states directly within your component's template
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // Because posts might start out null, you won't have access
  // to its contents immediately, but you can watch it.
})
</script>

<template>
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- do something -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch` 是一个被编译器转换的保留函数名，因此你不应该将你自己的函数命名为 `useLazyFetch`。
::

:read-more{to="/docs/getting-started/data-fetching"}
