---
title: 'updateAppConfig'
description: '在运行时更新应用程序配置。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/config.ts
    size: xs
---

::note
使用深层赋值更新 [`app.config`](/docs/guide/directory-structure/app-config)。现有的（嵌套）属性将被保留。
::

## 用法

```js
const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }

updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }
```

:read-more{to="/docs/guide/directory-structure/app-config"}
