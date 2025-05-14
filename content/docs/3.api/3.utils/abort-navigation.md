---
title: 'abortNavigation'
description: 'abortNavigation 是一个助手函数，用于阻止导航发生，并在将错误设置为参数时抛出该错误。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::warning
`abortNavigation` 只能在 [路由中间件处理程序](/docs/guide/directory-structure/middleware) 内部使用。
::

## 类型

```ts
abortNavigation(err?: Error | string): false
```

## 参数

### `err`

- **Type**: [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error) | `string`

  `abortNavigation` 可选抛出的错误。

## 示例

下面的示例展示了如何在路由中间件中使用 `abortNavigation` 来阻止未经授权的路由访问：

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation()
  }

  if (to.path !== '/edit-post') {
    return navigateTo('/edit-post')
  }
})
```

### `err` 作为字符串

你可以将错误作为字符串传递：

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('Insufficient permissions.')
  }
})
```

### `err` 作为 Error 对象

你可以将错误作为 [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error) 对象传递，例如，通过 `catch` 块捕获的错误：

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* code that might throw an error */
  } catch (err) {
    return abortNavigation(err)
  }
})
```
