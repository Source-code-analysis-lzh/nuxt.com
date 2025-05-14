---
title: 'refreshNuxtData'
description: 刷新 Nuxt 中全部或特定的 asyncData 实例。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`refreshNuxtData` 用于重新获取全部或特定的 `asyncData` 实例，包括来自 [`useAsyncData`](/docs/api/composables/use-async-data)、[`useLazyAsyncData`](/docs/api/composables/use-lazy-async-data)、[`useFetch`](/docs/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/api/composables/use-lazy-fetch) 的实例。

::note
如果您的组件被 `<KeepAlive>` 缓存并进入非激活状态，组件内部的 `asyncData` 仍然会被重新获取，直到组件被卸载。
::

## 类型

```ts
refreshNuxtData(keys?: string | string[])
```

## 参数

* `keys`: 一个字符串或字符串数组，用作获取数据的键。此参数是可选的。当没有明确指定 `keys` 时，所有 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`useFetch`](/docs/api/composables/use-fetch) 的键都会被重新获取。

## 返回值

`refreshNuxtData` 返回一个 Promise，当全部或特定的 `asyncData` 实例刷新完毕后 resolve。

## 示例

### 刷新所有数据

以下示例刷新 Nuxt 应用程序中使用 `useAsyncData` 和 `useFetch` 获取的所有数据。

```vue [pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refreshAll () {
  refreshing.value = true
  try {
    await refreshNuxtData()
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div>
    <button :disabled="refreshing" @click="refreshAll">
      Refetch All Data
    </button>
  </div>
</template>
```

### 刷新特定数据

以下示例仅刷新键与 `count` 和 `user` 匹配的数据。

```vue [pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refresh () {
  refreshing.value = true
  try {
    // you could also pass an array of keys to refresh multiple data
    await refreshNuxtData(['count', 'user'])
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div v-if="refreshing">
    Loading
  </div>
  <button @click="refresh">Refresh</button>
</template>
```

::note
如果您可以访问 `asyncData` 实例，建议使用其 `refresh` 或 `execute` 方法作为重新获取数据的首选方式。
::

:read-more{to="/docs/getting-started/data-fetching"}
