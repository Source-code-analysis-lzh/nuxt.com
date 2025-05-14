---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware() 是一个助手函数，用于在你的应用程序中动态添加中间件。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
路由中间件是存储在 Nuxt 应用程序的 [`middleware/`](/docs/guide/directory-structure/middleware) 目录中的导航守卫（[除非另有设置](/docs/api/nuxt-config#middleware)）。
::

## 类型

```ts
function addRouteMiddleware (name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void
function addRouteMiddleware (middleware: RouteMiddleware): void

interface AddRouteMiddlewareOptions {
  global?: boolean
}
```

## 参数

### `name`

- **类型:** `string` | `RouteMiddleware`

可以是一个字符串或一个 `RouteMiddleware` 类型的函数。该函数将下一个路由 `to` 作为第一个参数，当前路由 `from` 作为第二个参数，它们都是 Vue 路由对象。

了解更多关于 [路由对象](/docs/api/composables/use-route) 的可用属性。

### `middleware`

- **类型:** `RouteMiddleware`

第二个参数是一个 `RouteMiddleware` 类型的函数。与上面相同，它提供 `to` 和 `from` 路由对象。如果 `addRouteMiddleware()` 的第一个参数已经作为函数传递，则此参数变为可选。

### `options`

- **类型:** `AddRouteMiddlewareOptions`

一个可选的 `options` 参数允许你将 `global` 的值设置为 `true`，以指示该路由中间件是否是全局的（默认设置为 `false`）。

## 示例

### 命名路由中间件

命名路由中间件通过将字符串作为第一个参数，函数作为第二个参数来定义：

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('named middleware added in Nuxt plugin')
  })
})
```

当在插件中定义时，它会覆盖 `middleware/` 目录中任何同名的现有中间件。

### 全局路由中间件

全局路由中间件可以通过两种方式定义：

- 直接将一个函数作为第一个参数传递，而无需名称。它将自动被视为全局中间件并应用于每次路由更改。

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('anonymous global middleware that runs on every route change')
    })
  })
  ```

- 设置一个可选的第三个参数 `{ global: true }`，以指示该路由中间件是否是全局的。

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
        console.log('global middleware that runs on every route change')
      },
      { global: true }
    )
  })
  ```
