---
title: 'preloadRouteComponents'
description: preloadRouteComponents 允许您手动预加载您的 Nuxt 应用程序中的单个页面。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载路由会加载用户将来可能导航到的给定路由的组件。这确保了这些组件更早可用，并且不太可能阻塞导航，从而提高性能。

::tip{icon="i-lucide-rocket"}
如果您正在使用 `NuxtLink` 组件，Nuxt 已经自动预加载必要的路由。
::

:read-more{to="/docs/api/components/nuxt-link"}

## 示例

在使用 `navigateTo` 时预加载一个路由。

```ts
// we don't await this async function, to avoid blocking rendering
// this component's setup function
preloadRouteComponents('/dashboard')

const submit = async () => {
  const results = await $fetch('/api/authentication')

  if (results.token) {
    await navigateTo('/dashboard')
  }
}
```

:read-more{to="/docs/api/utils/navigate-to"}

::note
在服务器端，`preloadRouteComponents` 不会产生任何影响。
::
