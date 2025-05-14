---
title: 'setResponseStatus'
description: setResponseStatus 用于设置响应的 statusCode（以及可选的 statusMessage）。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Nuxt 提供了组合式函数和实用工具，以提供一流的服务器端渲染支持。

`setResponseStatus` 用于设置响应的 statusCode（以及可选的 statusMessage）。

::important
`setResponseStatus` 只能在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用。
::

```js
const event = useRequestEvent()

// event will be undefined in the browser
if (event) {
  // Set the status code to 404 for a custom 404 page
  setResponseStatus(event, 404)

  // Set the status message as well
  setResponseStatus(event, 404, 'Page Not Found')
}
```

::note
在浏览器中，`setResponseStatus` 不会产生任何影响。
::

:read-more{to="/docs/getting-started/error-handling"}
