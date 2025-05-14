---
title: 'useAsyncData'
description: useAsyncData 提供对在 SSR 友好的可组合函数中异步解析的数据的访问。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用 useAsyncData 来访问异步解析的数据。

::note
[`useAsyncData`](/docs/api/composables/use-async-data) 是一个旨在直接在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用的可组合函数。它返回响应式的可组合函数，并处理将响应添加到 Nuxt 的 payload 中，以便它们可以在页面 hydration 时从服务器传递到客户端，**而无需在客户端重新获取数据**。
::

## 用法

```vue [pages/index.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>
```

::warning
如果你正在使用自定义的 useAsyncData 包装器，请不要在可组合函数中 await 它，因为这可能会导致意外的行为。请参考 [此方案](/docs/guide/recipes/custom-usefetch#custom-usefetch) 以获取关于如何创建自定义异步数据获取器的更多信息。
::

::note
`data`、`status` 和 `error` 是 Vue 的 ref，当在 `<script setup>` 中使用时，应该通过 `.value` 访问，而 `refresh`/`execute` 和 `clear` 是普通的函数。
::

### 监听参数

内置的 `watch` 选项允许在检测到任何更改时自动重新运行 fetcher 函数。

```vue [pages/index.vue]
<script setup lang="ts">
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  () => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value
    }
  }), {
    watch: [page]
  }
)
</script>
```

### 响应式键

你可以使用计算 ref、普通 ref 或 getter 函数作为键，从而实现动态数据获取，当键更改时，数据会自动更新：

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// When the route changes and userId updates, the data will be automatically refetched
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id)
)
</script>
```

::warning
[`useAsyncData`](/docs/api/composables/use-async-data) 是一个被编译器转换的保留函数名，因此你不应该将你自己的函数命名为 [`useAsyncData`](/docs/api/composables/use-async-data)。
::

:read-more{to="/docs/getting-started/data-fetching#useasyncdata"}

## 参数

- `key`: 一个唯一的键，用于确保跨请求正确地对数据获取进行去重。如果你不提供键，则会为你生成一个对于 `useAsyncData` 实例的文件名和行号唯一的键。
- `handler`: 一个必须返回真值（例如，它不应该是 `undefined` 或 `null`）的异步函数，否则请求可能会在客户端重复执行。
::warning
`handler` 函数应该是 **无副作用的**，以确保在 SSR 和 CSR hydration 期间行为可预测。如果需要触发副作用，请使用 [`callOnce`](/docs/api/utils/call-once) 工具来完成。
::
- `options`:
  - `server`: 是否在服务器端获取数据（默认为 `true`）
  - `lazy`: 是否在加载路由后解析异步函数，而不是阻塞客户端导航（默认为 `false`）
  - `immediate`: 设置为 `false` 时，将阻止请求立即触发。（默认为 `true`）
  - `default`: 一个工厂函数，用于在异步函数解析之前设置 `data` 的默认值 - 对于 `lazy: true` 或 `immediate: false` 选项很有用
  - `transform`: 一个函数，可用于在解析后更改 `handler` 函数的结果
  - `getCachedData`: 提供一个返回缓存数据的函数。返回 `null` 或 `undefined` 将触发获取。默认情况下，它是：
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
      ? nuxtApp.payload.data[key] 
      : nuxtApp.static.data[key]
    ```
    这仅在启用 `nuxt.config` 的 `experimental.payloadExtraction` 时缓存数据。
  - `pick`: 仅从 `handler` 函数结果中选取此数组中指定的键
  - `watch`: 监听响应式来源以自动刷新
  - `deep`: 在一个深度的 ref 对象中返回数据（默认值为 `true`）。可以将其设置为 `false` 以在一个浅度的 ref 对象中返回数据，如果你的数据不需要深度响应式，这可以提高性能。
  - `dedupe`: 避免一次获取具有相同键的请求多次（默认为 `cancel`）。可能的选项:
    - `cancel` - 当发出新请求时取消现有请求
    - `defer` - 如果存在挂起的请求，则根本不发出新请求

::note
在底层，`lazy: false` 使用 `<Suspense>` 在数据获取完成之前阻止路由的加载。考虑使用 `lazy: true` 并实现一个加载状态，以获得更流畅的用户体验。
::

::read-more{to="/docs/api/composables/use-lazy-async-data"}
你可以使用 `useLazyAsyncData` 来获得与 `useAsyncData` 的 `lazy: true` 相同的行为。
::

:video-accordion{title="观看 Alexander Lichter 关于使用 getCachedData 进行客户端缓存的视频" videoId="aQPR0xn-MMk"}

### 共享状态和选项一致性

当对多个 `useAsyncData` 调用使用相同的键时，它们将共享相同的 `data`、`error` 和 `status` ref。这确保了组件之间的一致性，但需要选项一致性。

对于具有相同键的所有调用，以下选项 **必须保持一致**：

- `handler` 函数
- `deep` 选项
- `transform` 函数
- `pick` 数组
- `getCachedData` 函数
- `default` 值

以下选项可以 **不同** 而不会触发警告：
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ❌ This will trigger a development warning
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { deep: false })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { deep: true })

// ✅ This is allowed
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: true })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: false })
```

## 返回值

- `data`: 传入的异步函数的结果。
- `refresh`/`execute`: 一个可以用来刷新 `handler` 函数返回的数据的函数。
- `error`: 如果数据获取失败，则为一个错误对象。
- `status`: 一个字符串，指示数据请求的状态：
  - `idle`: 请求尚未开始时，例如：
    - 当尚未调用 `execute` 且设置了 `{ immediate: false }` 时
    - 当在服务器上渲染 HTML 且设置了 `{ server: false }` 时
  - `pending`: 请求正在进行中
  - `success`: 请求已成功完成
  - `error`: 请求失败
- `clear`: 一个将 `data` 设置为 `undefined`，将 `error` 设置为 `null`，将 `status` 设置为 `'idle'`，并将任何当前挂起的请求标记为已取消的函数。

默认情况下，Nuxt 会等待 `refresh` 完成后才能再次执行。

::note
如果你没有在服务器端获取数据（例如，使用 `server: false`），那么数据将不会在 hydration 完成之前获取。这意味着即使你在客户端 await 了 [`useAsyncData`](/docs/api/composables/use-async-data)，在 <script setup> 中 `data` 仍然会是 `null`。
::

## 类型

```ts [Signature]
function useAsyncData<DataT, DataE>(
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): AsyncData<DataT, DataE>
function useAsyncData<DataT, DataE>(
  key: string | Ref<string> | ComputedRef<string>,
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): Promise<AsyncData<DataT, DataE>>

type AsyncDataOptions<DataT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT | Ref<DataT> | null
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[] | false
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
}

type AsyncDataRequestContext = {
  /** The reason for this data request */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
};

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/getting-started/data-fetching"}
