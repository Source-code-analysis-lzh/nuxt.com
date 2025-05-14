---
title: "callOnce"
description: "在 SSR 或 CSR 期间运行给定的函数或代码块一次。"
navigation:
  badge: New
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
此实用工具自 [Nuxt v3.9](/blog/v3-9) 起可用。
::

## 目的

`callOnce` 函数旨在仅在以下情况下执行给定的函数或代码块一次：

- 服务器端渲染，但不包括水合 (hydration) 过程
- 客户端导航

- 这对于应该只执行一次的代码非常有用，例如记录事件或设置全局状态。

## 用法

`callOnce` 的默认模式是仅运行代码一次。例如，如果代码在服务器上运行，则不会在客户端再次运行。如果在客户端多次调用 `callOnce`（例如通过导航回此页面），它也不会再次运行。

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('This will only be logged once')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

也可以在每次导航时运行，同时避免初始的服务器/客户端双重加载。为此，可以使用 `navigation` 模式：

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('This will only be logged once and then on every client side navigation')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
`navigation` 模式自 [Nuxt v3.15](/blog/v3-15) 起可用。
::

::tip{to="/docs/getting-started/state-management#usage-with-pinia"}
`callOnce` 与 [Pinia 模块](/modules/pinia) 结合使用来调用 store actions 非常有用。
::

:read-more{to="/docs/getting-started/state-management"}

::warning
请注意，`callOnce` 不返回任何内容。如果要在 SSR 期间进行数据获取，则应使用 [`useAsyncData`](/docs/api/composables/use-async-data) 或 [`useFetch`](/docs/api/composables/use-fetch)。
::

::note
`callOnce` 是一个组合式函数，旨在直接在 setup 函数、插件或路由中间件中调用，因为它需要将数据添加到 Nuxt payload 中，以避免在页面水合时在客户端重新调用该函数。
::

## 类型

```ts
callOnce (key?: string, fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>
callOnce(fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>

type CallOnceOptions = {
  /**
   * Execution mode for the callOnce function
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## 参数

- `key`: 一个唯一的键，确保代码只运行一次。如果未提供键，则会为你生成一个对于 `callOnce` 实例的文件和行号唯一的键。
- `fn`: 要运行一次的函数。它可以是异步的。
- `options`: 设置模式，可以是导航时重新执行 (`navigation`)，也可以是应用程序生命周期内只执行一次 (`render`)。默认为 `render`。
  - `render`: 在初始渲染期间（无论是 SSR 还是 CSR）执行一次 - 默认模式
  - `navigation`: 在初始渲染期间执行一次，然后在每次后续客户端导航时执行一次
