---
title: "useRouter"
description: useRouter composable 返回路由器实例。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

如果你只需要在模板中使用路由器实例，请使用 `$router`：

```vue [pages/index.vue]
<template>
  <button @click="$router.back()">Back</button>
</template>
```

如果你有一个 `pages/` 目录，`useRouter` 的行为与 `vue-router` 提供的行为完全相同。

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute" target="_blank"}
阅读 `vue-router` 文档中关于 `Router` 接口的内容。
::

## 基本操作

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute): 向路由器实例添加一条新路由。可以提供 `parentName` 将新路由添加为现有路由的子路由。
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute): 通过名称删除现有路由。
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes): 获取所有路由记录的完整列表。
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute): 检查是否已存在具有给定名称的路由。
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve): 返回路由位置的规范化版本。还包括一个包含任何现有 `base` 的 `href` 属性。

```ts [Example]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` 将路由详细信息添加到路由数组中，这在构建 [Nuxt 插件](/docs/guide/directory-structure/plugins) 时很有用，而 `router.push()` 则会立即触发新的导航，这在页面、Vue 组件和可组合函数中很有用。
::

## 基于 History API

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back): 如果可能，后退历史记录，与 `router.go(-1)` 相同。
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward): 如果可能，前进历史记录，与 `router.go(1)` 相同。
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go): 在历史记录中向前或向后移动，不受 `router.back()` 和 `router.forward()` 中强制执行的层次结构限制。
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push): 通过在历史堆栈中推送一个条目，以编程方式导航到新的 URL。建议改用 [`navigateTo`](/docs/api/utils/navigate-to)。
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace): 通过替换路由历史堆栈中的当前条目，以编程方式导航到新的 URL。建议改用 [`navigateTo`](/docs/api/utils/navigate-to)。

```ts [Example]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: "/home" })
router.replace({ hash: "#bio" })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
阅读更多关于浏览器 History API 的内容。
::

## 导航守卫

`useRouter` composable 提供了 `afterEach`、`beforeEach` 和 `beforeResolve` 辅助方法，这些方法充当导航守卫。

然而，Nuxt 有一个 **路由中间件** 的概念，它简化了导航守卫的实现并提供了更好的开发者体验。

:read-more{to="/docs/guide/directory-structure/middleware"}

## Promise 和错误处理

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady): 返回一个 Promise，该 Promise 在路由器完成初始导航时解析。
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError): 添加一个错误处理程序，该处理程序在导航期间发生任何未捕获的错误时被调用。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Methods" title="Vue Router 文档" target="_blank"}

## 通用路由器实例

如果你没有 `pages/` 文件夹，那么 [`useRouter`](/docs/api/composables/use-router) 将返回一个具有类似辅助方法的通用路由器实例，但请注意，并非所有功能都可能受支持或行为与 `vue-router` 完全相同。
