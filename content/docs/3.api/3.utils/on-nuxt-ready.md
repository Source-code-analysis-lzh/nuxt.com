---
title: "onNuxtReady"
description: onNuxtReady 这个组合式函数允许你在你的应用完成初始化后运行一个回调函数。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ready.ts
    size: xs
---

::important
`onNuxtReady` 仅在客户端运行。:br
它非常适合运行不应阻塞应用程序初始渲染的代码。
::

```ts [plugins/ready.client.ts]
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const myAnalyticsLibrary = await import('my-big-analytics-library')
    // do something with myAnalyticsLibrary
  })
})
```

即使在您的应用程序初始化完成后运行也是 “安全” 的。在这种情况下，代码将被注册在下一个空闲回调中运行。
