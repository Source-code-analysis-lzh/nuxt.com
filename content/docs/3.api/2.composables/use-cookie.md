---
title: 'useCookie'
description: useCookie 是一个 SSR 友好的可组合函数，用于读取和写入 cookie。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用 `useCookie`，这是一个 SSR 友好的可组合函数，用于读取和写入 cookie。

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` 仅在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中有效。
::

::tip
`useCookie` 的 ref 会自动将 cookie 值序列化和反序列化为 JSON。
::

## 示例

下面的示例创建了一个名为 `counter` 的 cookie。如果该 cookie 不存在，则初始设置为一个随机值。每当我们更新 `counter` 变量时，cookie 也会相应地更新。

```vue [app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value = counter.value || Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>Counter: {{ counter || '-' }}</h1>
    <button @click="counter = null">reset</button>
    <button @click="counter--">-</button>
    <button @click="counter++">+</button>
  </div>
</template>
```

:link-example{to="/docs/examples/advanced/use-cookie"}

::note
当 cookie 发生更改时，使用 [`refreshCookie`](/docs/api/utils/refresh-cookie) 手动刷新 `useCookie` 的值。
::

## 选项

Cookie 的可组合函数接受多个选项，这些选项允许你修改 cookie 的行为。

大多数选项将直接传递给 [cookie](https://github.com/jshttp/cookie) 包。

### `maxAge` / `expires`

使用这些选项设置 cookie 的过期时间。

`maxAge`: 指定一个 `number` (以秒为单位)，作为 [Max-Age Set-Cookie 属性](https://tools.ietf.org/html/rfc6265#section-5.2.2) 的值。给定的数字将通过向下取整转换为整数。默认情况下，不设置最大生存时间。

`expires`: 指定一个 `Date` 对象，作为 [Expires Set-Cookie 属性](https://tools.ietf.org/html/rfc6265#section-5.2.1) 的值。默认情况下，不设置过期时间。大多数客户端会将其视为 “非持久性 cookie”，并在关闭 Web 浏览器应用程序等情况下删除它。

::note
[cookie 存储模型规范](https://tools.ietf.org/html/rfc6265#section-5.3) 指出，如果同时设置了 `expires` 和 `maxAge`，则 `maxAge` 优先，但并非所有客户端都可能遵守这一点，因此如果两者都设置，它们应该指向相同的日期和时间。
::

::note
如果 `expires` 和 `maxAge` 都没有设置，cookie 将是会话级别的，并在用户关闭浏览器时被删除。
::

### `httpOnly`

指定 [HttpOnly Set-Cookie 属性](https://tools.ietf.org/html/rfc6265#section-5.2.6) 的 `boolean` 值。当为真值时，将设置 `HttpOnly` 属性；否则不设置。默认情况下，不设置 `HttpOnly` 属性。

::warning
当将其设置为 `true` 时要小心，因为兼容的客户端将不允许客户端 JavaScript 查看 `document.cookie` 中的 cookie。
::

### `secure`

指定 [Secure Set-Cookie 属性](https://tools.ietf.org/html/rfc6265#section-5.2.5) 的 `boolean` 值。当为真值时，将设置 `Secure` 属性；否则不设置。默认情况下，不设置 `Secure` 属性。

::warning
当将其设置为 `true` 时要小心，因为如果浏览器没有 HTTPS 连接，兼容的客户端将来不会将 cookie 发送回服务器。这可能会导致 hydration 错误。
::

### `partitioned`

指定 [Partitioned Set-Cookie](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1) 属性的 `boolean` 值。当为真值时，将设置 `Partitioned` 属性，否则不设置。默认情况下，不设置 `Partitioned` 属性。

::note
这是一个尚未完全标准化的属性，将来可能会发生变化。
这也意味着许多客户端在理解此属性之前可能会忽略它。

更多信息可以在 [提案](https://github.com/privacycg/CHIPS) 中找到。
::

### `domain`

指定 [`Domain` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.3) 的值。默认情况下，不设置域，大多数客户端会认为该 cookie 仅适用于当前域。

### `path`

指定 [`Path` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.4) 的值。默认情况下，路径被认为是 [默认路径](https://tools.ietf.org/html/rfc6265#section-5.1.4)。

### `sameSite`

指定 [`SameSite` `Set-Cookie` 属性](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7) 的 `boolean` 或 `string` 值。

- true 将 SameSite 属性设置为 Strict，以实现严格的同站强制执行。
- false 将不设置 SameSite 属性。
- 'lax' 将 SameSite 属性设置为 Lax，以实现宽松的同站强制执行。
- 'none' 将 SameSite 属性设置为 None，以实现显式的跨站 cookie。
- 'strict' 将 SameSite 属性设置为 Strict，以实现严格的同站强制执行。

- 有关不同强制级别的更多信息，请参见 [规范](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)。

### `encode`

指定一个将用于编码 cookie 值的函数。由于 cookie 的值具有有限的字符集（并且必须是简单的字符串），因此可以使用此函数将值编码为适合 cookie 值的字符串。

默认编码器是 `JSON.stringify` + `encodeURIComponent`。

### `decode`

指定一个将用于解码 cookie 值的函数。由于 cookie 的值具有有限的字符集（并且必须是简单的字符串），因此可以使用此函数将先前编码的 cookie 值解码为 JavaScript 字符串或其他对象。

默认解码器是 `decodeURIComponent` + [destr](https://github.com/unjs/destr).

::note
如果此函数抛出错误，则原始的、未解码的 cookie 值将作为 cookie 的值返回。
::

### `default`

指定一个返回 cookie 默认值的函数。该函数也可以返回一个 `Ref`。

### `readonly`

允许 _访问_ cookie 值，但不允许设置它。

### `watch`

指定 [watch](https://vuejs.org/api/reactivity-core.html#watch) cookie ref 数据的 `boolean` 或 `string` 值。

- `true` - 将监听 cookie ref 数据更改及其嵌套属性（默认）。
- `shallow` - 将仅监听 cookie ref 数据的顶层属性的更改。
- `false` - 将不监听 cookie ref 数据的更改。

::note
当 cookie 发生更改时，使用 [`refreshCookie`](/docs/api/utils/refresh-cookie) 手动刷新 `useCookie` 的值。
::

**示例 1:**

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false
  }
)

if (user.value && user.value !== null) {
  user.value.score++; // userInfo cookie not update with this change
}
</script>

<template>
  <div>User score: {{ user?.score }}</div>
</template>
```

**示例 2:**

```vue
<script setup lang="ts">
const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow'
  }
)

function add() {
  list.value?.push(Math.round(Math.random() * 1000))
  // list cookie not update with this change
}

function save() {
  if (list.value && list.value !== null) {
    list.value = [...list.value]
    // list cookie update with this change
  }
}
</script>

<template>
  <div>
    <h1>List</h1>
    <pre>{{ list }}</pre>
    <button @click="add">Add</button>
    <button @click="save">Save</button>
  </div>
</template>
```

## API 路由中的 Cookies

你可以使用 [`h3`](https://github.com/unjs/h3) 包中的 `getCookie` 和 `setCookie` 在服务器 API 路由中设置 cookie。

```ts [server/api/counter.ts]
export default defineEventHandler(event => {
  // Read counter cookie
  let counter = getCookie(event, 'counter') || 0

  // Increase counter cookie by 1
  setCookie(event, 'counter', ++counter)

  // Send JSON response
  return { counter }
})
```

:link-example{to="/docs/examples/advanced/use-cookie"}
