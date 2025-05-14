---
title: 'reloadNuxtApp'
description: reloadNuxtApp 将执行页面的硬重新加载。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp` 将对您的应用程序执行硬重新加载，重新从服务器请求页面及其依赖项。
::

默认情况下，它还会保存您应用程序的当前 `state`（即您可以使用 `useState` 访问的任何状态）。

::read-more{to="/docs/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
您可以通过在 `nuxt.config` 文件中启用 `experimental.restoreState` 选项来启用此状态的实验性恢复。
::

## 类型

```ts
reloadNuxtApp(options?: ReloadNuxtAppOptions)

interface ReloadNuxtAppOptions {
  ttl?: number
  force?: boolean
  path?: string
  persistState?: boolean
}
```

### `options` (可选)

**类型**: `ReloadNuxtAppOptions`

一个接受以下属性的对象：

- `path` (optional)

  **类型**: `string`

  **默认值**: `window.location.pathname`

  要重新加载的路径（默认为当前路径）。如果此路径与当前窗口位置不同，它将触发导航并在浏览器历史记录中添加一个条目。

- `ttl` (optional)

  **类型**: `number`

  **默认值**: `10000`

  忽略未来重新加载请求的毫秒数。如果在此时段内再次调用，`reloadNuxtApp` 将不会重新加载您的应用程序，以避免重新加载循环。

- `force` (可选)

  **类型**: `boolean`

  **默认值**: `false`

  此选项允许完全绕过重新加载循环保护，即使在先前指定的 TTL 内发生过重新加载，也会强制重新加载。

- `persistState` (可选)

  **类型**: `boolean`

  **默认值**: `false`

  是否将当前的 Nuxt 状态转储到 sessionStorage（作为 `nuxt:reload:state`）。默认情况下，除非还设置了 `experimental.restoreState`，或者您自己处理状态恢复，否则这将不起作用。
