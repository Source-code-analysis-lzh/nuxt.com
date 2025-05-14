---
title: "refreshCookie"
description: "当 cookie 发生更改时，手动刷新 useCookie 的值。"
navigation:
  badge: New
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

::important
此实用程序自 [Nuxt v3.10](/blog/v3-10) 起可用。
::

## 目的

`refreshCookie` 函数旨在刷新 `useCookie` 返回的 cookie 值。

当我们在浏览器中知道新的 cookie 值已被设置时，这对于更新 `useCookie` 的 ref 非常有用。

## 用法

```vue [app.vue]
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { ... }) // Sets `token` cookie on response
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>
```

::note{to="/docs/guide/going-further/experimental-features#cookiestore"}
您可以启用实验性的 `cookieStore` 选项，以便在浏览器中 cookie 更改时自动刷新 `useCookie` 的值。
::

## 类型

```ts
refreshCookie(name: string): void
```
