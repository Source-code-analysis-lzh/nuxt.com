---
title: 'prefetchComponents'
description: Nuxt 提供了实用工具，使您能够控制组件的预取。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


预取组件会在后台下载代码，这是基于组件很可能用于渲染的假设，从而在用户请求时能够立即加载组件。组件在用户没有明确请求的情况下被下载并缓存，以备将来预期使用。

使用 `prefetchComponents` 手动预取已在您的 Nuxt 应用程序中全局注册的单个组件。默认情况下，Nuxt 将这些组件注册为异步组件。您必须使用组件名称的 PascalCase 版本。

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
当前的实现行为与 [`preloadComponents`](/docs/api/utils/preload-components) 完全相同，它预加载组件而不是仅仅预取。我们正在努力改进这种行为。
::

::note
在服务器端，`prefetchComponents` 不会产生任何影响。
::
