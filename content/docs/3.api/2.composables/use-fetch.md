---
title: 'useFetch'
description: '使用 SSR 友好的可组合函数从 API 端点获取数据。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

这个可组合函数为 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`$fetch`](/docs/api/utils/dollarfetch) 提供了一个便捷的包装器。
它基于 URL 和 fetch 选项自动生成一个键，为基于服务器路由的请求 URL 提供类型提示，并推断 API 响应类型。

::note
`useFetch` 是一个旨在直接在 setup 函数、插件或路由中间件中调用的可组合函数。它返回响应式的可组合函数，并处理将响应添加到 Nuxt 的 payload 中，以便它们可以在页面 hydration 时从服务器传递到客户端，而无需在客户端重新获取数据。
::

## 用法

```vue [pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title']
})
</script>
```

::warning
如果你正在使用自定义的 useFetch 包装器，请不要在可组合函数中 await 它，因为这可能会导致意外的行为。请参考 [此方案](/docs/guide/recipes/custom-usefetch#custom-usefetch) 以获取关于如何创建自定义异步数据获取器的更多信息。
::

::note
`data`、`status` 和 `error` 是 Vue 的 ref，当在 `<script setup>` 中使用时，应该通过 `.value` 访问，而 `refresh`/`execute` 和 `clear` 是普通的函数。
::

使用 `query` 选项，你可以向查询添加搜索参数。此选项扩展自 [unjs/ofetch](https://github.com/unjs/ofetch)，并使用 [unjs/ufo](https://github.com/unjs/ufo) 创建 URL。对象会自动字符串化。

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' }
})
```

上面的示例会生成 `https://api.nuxt.com/modules?param1=value1&param2=value2`。

你也可以使用 [拦截器](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)：

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest({ request, options }) {
    // Set the request headers
    // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
    options.headers.set('Authorization', '...')
  },
  onRequestError({ request, options, error }) {
    // Handle the request errors
  },
  onResponse({ request, response, options }) {
    // Process the response data
    localStorage.setItem('token', response._data.token)
  },
  onResponseError({ request, response, options }) {
    // Handle the response errors
  }
})
```

### 响应式键和共享状态

你可以使用计算 ref 或普通 ref 作为 URL，从而实现动态数据获取，当 URL 更改时，数据会自动更新：

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// When the route changes and id updates, the data will be automatically refetched
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

当在多个组件中使用具有相同 URL 和选项的 `useFetch` 时，它们将共享相同的 `data`、`error` 和 `status` ref。这确保了组件之间的一致性。

::warning
`useFetch` 是一个被编译器转换的保留函数名，因此你不应该将你自己的函数命名为 `useFetch`。
::

::warning
如果你遇到从 `useFetch` 返回值解构出的 `data` 变量是一个字符串而不是一个 JSON 解析的对象，请确保你的组件没有包含类似 `import { useFetch } from '@vueuse/core'` 的导入语句。
::

:video-accordion{title="观看 Alexander Lichter 的视频，避免错误地使用 useFetch" videoId="njsGVmcWviY"}

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:read-more{to="/docs/getting-started/data-fetching"}

:link-example{to="/docs/examples/features/data-fetching"}

## 参数

- `URL`: 要获取的 URL。
- `Options` (扩展了 [unjs/ofetch](https://github.com/unjs/ofetch) 的选项和 [AsyncDataOptions](/docs/api/composables/use-async-data#params)):
  - `method`: 请求方法。
  - `query`: 使用 [ufo](https://github.com/unjs/ufo) 向 URL 添加查询搜索参数。
  - `params`: `query` 的别名。
  - `body`: 请求体 - 自动字符串化（如果传递了一个对象）。
  - `headers`: 请求头。
  - `baseURL`: 请求的基础 URL。
  - `timeout`: 自动中止请求的毫秒数。
  - `cache`: 根据 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch#cache) 处理缓存控制。
    - 你可以传递布尔值来禁用缓存，也可以传递以下值之一：`default`、`no-store`、`reload`、`no-cache`、`force-cache` 和 `only-if-cached`。

::note
所有 fetch 选项都可以是 `computed` 或 `ref` 值。它们将被监听，并且在更新时会自动发出新的请求。
::

- `Options` (来自 [`useAsyncData`](/docs/api/composables/use-async-data)):
  - `key`: 一个唯一的键，用于确保跨请求正确地对数据获取进行去重。如果未提供，则会根据 URL 和 fetch 选项自动生成。
  - `server`: 是否在服务器端获取数据（默认为 `true`）。
  - `lazy`: 是否在加载路由后解析异步函数，而不是阻塞客户端导航（默认为 `false`）。
  - `immediate`: 设置为 `false` 时，将阻止请求立即触发。（默认为 `true`）
  - `default`: 一个工厂函数，用于在异步函数解析之前设置 `data` 的默认值 - 对于 `lazy: true` 或 `immediate: false` 选项很有用。
  - `transform`: 一个函数，可用于在解析后更改 `handler` 函数的结果。
  - `getCachedData`: 提供一个返回缓存数据的函数。返回 `null` 或 `undefined` 将触发获取。默认情况下，它是：
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
      ? nuxtApp.payload.data[key] 
      : nuxtApp.static.data[key]
    ```
    这仅在启用 `nuxt.config` 的 `experimental.payloadExtraction` 时缓存数据。
  - `pick`: 仅从 `handler` 函数结果中选取此数组中指定的键。
  - `watch`: 监听一个响应式来源数组，并在它们更改时自动刷新 fetch 结果。默认情况下，会监听 Fetch 选项和 URL。你可以使用 `watch: false` 完全忽略响应式来源。结合 `immediate: false`，这允许完全手动地使用 `useFetch`。（你可以在 [此处](https://docs/getting-started/data-fetching%23watch) 查看使用 `watch` 的示例。）
  - `deep`: 在一个深度的 ref 对象中返回数据（默认值为 `true`）。可以将其设置为 `false` 以在一个浅度的 ref 对象中返回数据，如果你的数据不需要深度响应式，这可以提高性能。
  - `dedupe`: 避免一次获取具有相同键的请求多次（默认为 `cancel`）。可能的选项：
    - `cancel` - 当发出新请求时取消现有请求。
    - `defer` - 如果存在挂起的请求，则根本不发出新请求。

::note
如果你将函数或 ref 作为 `url` 参数提供，或者如果你将函数作为参数提供给 `options` 参数，那么即使选项看起来完全相同，此 `useFetch` 调用也不会与其他代码库中的 `useFetch` 调用匹配。如果你希望强制匹配，可以在 `options` 中提供你自己的 key。
::

::note
如果你在开发环境中使用 `useFetch` 调用具有自签名证书的（外部）HTTPS URL，则需要在你的环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::

:video-accordion{title="观看 Alexander Lichter 关于使用 getCachedData 进行客户端缓存的视频" videoId="aQPR0xn-MMk"}

## 返回值

- `data`: 传入的异步函数的结果。
- `refresh`/`execute`: 一个可以用来刷新 `handler` 函数返回的数据的函数。
- `error`: 如果数据获取失败，则为一个错误对象。
- `status`: 一个字符串，指示数据请求的状态：
  - `idle`: 请求尚未开始时，例如：
    - 当尚未调用 `execute` 且设置了 `{ immediate: false }` 时。
    - 当在服务器上渲染 HTML 且设置了 `{ server: false }` 时。
  - `pending`: 请求正在进行中。
  - `success`: 请求已成功完成。
  - `error`: 请求失败。
- `clear`: 一个将 `data` 设置为 `undefined`，将 `error` 设置为 `null`，将 `status` 设置为 `'idle'`，并将任何当前挂起的请求标记为已取消的函数。

默认情况下，Nuxt 会等待 `refresh` 完成后才能再次执行。

::note
如果你没有在服务器端获取数据（例如，使用 `server: false`），那么数据 **将不会** 在 hydration 完成之前获取。这意味着即使你在客户端 await 了 `useFetch`，在 `<script setup>` 中 `data` 仍然会是 null。
::

## 类型

```ts [Signature]
function useFetch<DataT, ErrorT>(
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: string
  method?: string
  query?: SearchParams
  params?: SearchParams
  body?: RequestInit['body'] | Record<string, any>
  headers?: Record<string, string> | [key: string, value: string][] | Headers
  baseURL?: string
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[] | false
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
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```
