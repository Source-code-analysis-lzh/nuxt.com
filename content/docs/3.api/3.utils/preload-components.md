---
title: 'preloadComponents'
description: Nuxt 提供了实用工具，使您能够控制组件的预加载。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载组件会加载您的页面很快需要的组件，您希望在渲染生命周期的早期就开始加载它们。这确保了它们更早可用，并且不太可能阻塞页面的渲染，从而提高性能。

使用 `preloadComponents` 手动预加载已在您的 Nuxt 应用程序中全局注册的单个组件。默认情况下，Nuxt 将这些组件注册为异步组件。您必须使用组件名称的 PascalCase 版本。

```js
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
在服务器端，`preloadComponents` 不会产生任何影响。
::
