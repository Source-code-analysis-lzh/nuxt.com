---
title: 'setPageLayout'
description: setPageLayout 允许您动态地更改页面的布局。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout` 允许您动态地更改页面的布局。它依赖于对 Nuxt 上下文的访问，因此只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用。
::

```ts [middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // Set the layout on the route you are navigating _to_
  setPageLayout('other')
})
```

::note
如果您选择在服务器端动态设置布局，为了避免水合不匹配，您 _必须_ 在 Vue 渲染布局之前（即在插件或路由中间件内）执行此操作。
::
