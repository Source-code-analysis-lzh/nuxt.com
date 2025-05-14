---
title: 'useRuntimeConfig'
description: 使用 useRuntimeConfig composable 访问运行时配置变量。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

## 用法

```vue [app.vue]
<script setup lang="ts">
const config = useRuntimeConfig()
</script>
```

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}

## 定义运行时配置

下面的示例演示了如何设置一个公共 API 基础 URL 和一个仅在服务器上可访问的秘密 API 令牌。

我们应该始终在 `nuxt.config` 中定义 `runtimeConfig` 变量。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',

    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
```

::note
需要在服务器上访问的变量直接添加到 `runtimeConfig` 中。需要在客户端和服务器端都访问的变量定义在 `runtimeConfig.public` 中。
::

:read-more{to="/docs/guide/going-further/runtime-config"}

## 访问运行时配置

要访问运行时配置，我们可以使用 `useRuntimeConfig()` composable：

```ts [server/api/test.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // Access public variables
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // Access a private variable (only available on the server)
      Authorization: `Bearer ${config.apiSecret}`
    }
  })
  return result
}
```

在这个示例中，由于 `apiBase` 定义在 `public` 命名空间中，因此它在服务器端和客户端都是全局可访问的，而 `apiSecret` 仅在服务器端可访问。

## 环境变量

可以使用带有 `NUXT_` 前缀的匹配环境变量名称来更新运行时配置值。

:read-more{to="/docs/guide/going-further/runtime-config"}

### 使用 `.env` 文件

我们可以在 `.env` 文件中设置环境变量，使其在 **开发** 和 **构建/生成** 期间可访问。

```ini [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
在 **开发** 和 **构建/生成** 期间，使用 `process.env` 在 Nuxt 应用程序中访问 `.env` 文件中设置的任何环境变量。
::

::warning
在 **生产运行时**，你应该使用平台环境变量，并且不使用 `.env` 文件。
::

:read-more{to="/docs/guide/directory-structure/env"}

## `app` 命名空间

Nuxt 在运行时配置中使用 `app` 命名空间，其键包括 `baseURL` 和 `cdnURL`。你可以在运行时通过设置环境变量自定义它们的值。

::note
这是一个保留的命名空间。你不应该在 `app` 中引入额外的键。
::

### `app.baseURL`

默认情况下，`baseURL` 设置为 `'/'`。

但是，可以通过将 `NUXT_APP_BASE_URL` 设置为环境变量，在运行时更新 `baseURL`。

然后，你可以使用 `config.app.baseURL` 访问这个新的基础 URL：

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // Access baseURL universally
  const baseURL = config.app.baseURL
})
```

### `app.cdnURL`

此示例演示如何设置自定义 CDN URL 并使用 `useRuntimeConfig()` 访问它们。

你可以使用 `NUXT_APP_CDN_URL` 环境变量为 `.output/public` 中的静态资源使用自定义 CDN。

然后，使用 `config.app.cdnURL` 访问新的 CDN URL。

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // Access cdnURL universally
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}
