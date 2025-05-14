---
title: 'useNuxtApp'
description: 访问 Nuxt 应用的共享运行时上下文。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp` 是一个内置的可组合函数，它提供了一种访问 Nuxt 的共享运行时上下文的方式，也称为 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)，该上下文在客户端和服务器端都可用（但在 Nitro 路由中不可用）。它可以帮助你访问 Vue 应用实例、运行时钩子、运行时配置变量和内部状态，例如 `ssrContext` 和 `payload`。

```vue [app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

如果运行时上下文在你的作用域中不可用，调用 `useNuxtApp` 将会抛出一个异常。你可以使用 [`tryUseNuxtApp`](#tryusenuxtapp) 来代替，用于不需要 `nuxtApp` 的可组合函数，或者只是为了在不抛出异常的情况下检查上下文是否可用。

<!--
note
By default, the shared runtime context of Nuxt is namespaced under the [`buildId`](/docs/api/nuxt-config#buildid) option. It allows the support of multiple runtime contexts.

## Params

- `appName`: an optional application name. If you do not provide it, the Nuxt `buildId` option is used. Otherwise, it must match with an existing `buildId`. -->

## 方法

### `provide (name, value)`

`nuxtApp` 是一个运行时上下文，你可以使用 [Nuxt 插件](/docs/guide/directory-structure/plugins) 对其进行扩展。使用 `provide` 函数创建 Nuxt 插件，以使值和辅助方法在你的 Nuxt 应用的所有可组合函数和组件中都可用。

`provide` 函数接受 `name` 和 `value` 参数。

```js
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', (name) => `Hello ${name}!`)

// Prints "Hello name!"
console.log(nuxtApp.$hello('name'))
```

正如你在上面的示例中看到的，`$hello` 已经成为 `nuxtApp` 上下文新的自定义部分，并且在所有可以访问 `nuxtApp` 的地方都可用。

### `hook(name, cb)`

`nuxtApp` 中可用的钩子允许你自定义 Nuxt 应用的运行时方面。你可以在 Vue.js 可组合函数和 [Nuxt 插件](/docs/guide/directory-structure/plugins) 中使用运行时钩子来钩入渲染生命周期。

`hook` 函数对于在特定点钩入渲染生命周期以添加自定义逻辑非常有用。`hook` 函数主要在创建 Nuxt 插件时使用。

有关 Nuxt 调用的可用运行时钩子，请参阅 [运行时钩子](/docs/api/advanced/hooks#app-hooks-runtime)。

```ts [plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* your code goes here */
  })
  nuxtApp.hook('vue:error', (..._args) => {
    console.log('vue:error')
    // if (import.meta.client) {
    //   console.log(..._args)
    // }
  })
})
```

### `callHook(name, ...args)`

当使用任何现有钩子调用 `callHook` 时，它会返回一个 Promise。

```ts
await nuxtApp.callHook('my-plugin:init')
```

## 属性

`useNuxtApp()` 公开了以下属性，你可以使用它们来扩展和自定义你的应用，并共享状态、数据和变量。

### `vueApp`

`vueApp` 是你可以通过 `nuxtApp` 访问的全局 Vue.js [应用实例](https://vuejs.org/api/application.html#application-api)。

一些有用的方法：
- [`component()`](https://vuejs.org/api/application.html#app-component) - 如果同时传递名称字符串和组件定义，则注册一个全局组件；如果仅传递名称，则检索已注册的组件。
- [`directive()`](https://vuejs.org/api/application.html#app-directive) - 如果同时传递名称字符串和指令定义，则注册一个全局自定义指令；如果仅传递名称，则检索已注册的指令 [(example)](/docs/guide/directory-structure/plugins#vue-directives).
- [`use()`](https://vuejs.org/api/application.html#app-use) - 安装一个 **[Vue.js Plugin](https://vuejs.org/guide/reusability/plugins.html)** [(example)](/docs/guide/directory-structure/plugins#vue-plugins).

:read-more{icon="i-simple-icons-vuedotjs" to="https://vuejs.org/api/application.html#application-api"}

### `ssrContext`

`ssrContext` 在服务器端渲染期间生成，并且仅在服务器端可用。

Nuxt 通过 `ssrContext` 公开以下属性：

- `url` (string) - 当前请求 URL。
- `event` ([unjs/h3](https://github.com/unjs/h3) 请求事件) - 访问当前路由的请求和响应。
- `payload` (object) - NuxtApp 的 payload 对象。

### `payload`

`payload` 将服务器端的数据和状态变量公开给客户端。以下键在从服务器端传递到客户端后将在客户端上可用：

- `serverRendered` (boolean) - 指示响应是否是服务器端渲染的。
- `data` (object) - 当你使用 [`useFetch`](/docs/api/composables/use-fetch) 或 [`useAsyncData`](/docs/api/composables/use-async-data) 从 API 端点获取数据时，结果 payload 可以从 `payload.data` 访问。此数据被缓存，并帮助你避免在多次发出相同的请求时重新获取相同的数据。

  ::code-group
  ```vue [app.vue]
  <script setup lang="ts">
  const { data } = await useAsyncData('count', () => $fetch('/api/count'))
  </script>
  ```
  ```ts [server/api/count.ts]
  export default defineEventHandler(event => {
    return { count: 1 }
  })
  ```
  ::

  在上面的示例中，使用 [`useAsyncData`](/docs/api/composables/use-async-data) 获取 `count` 的值后，如果你访问 `payload.data`，你将看到 `{ count: 1 }` 记录在那里。

  当从 [`ssrcontext`](#ssrcontext) 访问相同的 `payload.data` 时，你也可以在服务器端访问相同的值。

- `state` (object) - 当你在 Nuxt 中使用 [`useState`](/docs/api/composables/use-state) 可组合函数设置共享状态时，此状态数据通过 `payload.state.[你的状态名称]` 访问。

  ```ts [plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  也可以使用更高级的类型，例如 `ref`、`reactive`、`shallowRef`、`shallowReactive` 和 `NuxtError`。

  自 [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements) 起，可以为你自己的 Nuxt 不支持的类型定义 reducer/reviver。

  :video-accordion{title="观看 Alexander Lichter 关于序列化 payload 的视频，特别是关于类的处理" videoId="8w6ffRBs8a4"}

  在下面的示例中，我们使用 payload 插件为 [Luxon](https://moment.github.io/luxon/#/) 的 DateTime 类定义了一个 reducer（或序列化器）和一个 reviver（或反序列化器）。

  ```ts [plugins/date-time-payload.ts]
  /**
   * This kind of plugin runs very early in the Nuxt lifecycle, before we revive the payload.
   * You will not have access to the router or other Nuxt-injected properties.
   *
   * Note that the "DateTime" string is the type identifier and must
   * be the same on both the reducer and the reviver.
   */
  export default definePayloadPlugin((nuxtApp) => {
    definePayloadReducer('DateTime', (value) => {
      return value instanceof DateTime && value.toJSON()
    })
    definePayloadReviver('DateTime', (value) => {
      return DateTime.fromISO(value)
    })
  })
  ```

### `isHydrating`

使用 `nuxtApp.isHydrating` (boolean) 检查 Nuxt 应用是否正在客户端进行 hydration。

```ts [components/nuxt-error-boundary.ts]
export default defineComponent({
  setup (_props, { slots, emit }) {
    const nuxtApp = useNuxtApp()
    onErrorCaptured((err) => {
      if (import.meta.client && !nuxtApp.isHydrating) {
        // ...
      }
    })
  }
})
```

### `runWithContext`

::note
你很可能因为收到了 “Nuxt instance unavailable” 的消息而来到这里。请谨慎使用此方法，并报告导致问题的示例，以便最终可以在框架级别解决该问题。
::

`runWithContext` 方法旨在用于调用一个函数并为其提供显式的 Nuxt 上下文。通常，Nuxt 上下文是隐式传递的，你无需担心这一点。但是，在中间件/插件中处理复杂的 `async/await` 场景时，你可能会遇到在异步调用后当前实例已被取消设置的情况。

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // the Vue/Nuxt compiler loses context here because of the try/catch block.
  } catch (e) {
    user = null
  }
  if (!user) {
    // apply the correct Nuxt context to our `navigateTo` call.
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### 用法

```js
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`: 任何需要当前 Nuxt 应用上下文的函数。此上下文将自动正确应用。

`runWithContext` 将返回 `functionWithContext` 返回的任何内容。

#### 上下文的更深层次解释

Vue.js Composition API（以及类似的 Nuxt 可组合函数）通过依赖隐式上下文工作。在生命周期中，Vue 将当前组件的临时实例（以及 Nuxt 的 nuxtApp 临时实例）设置为一个全局变量，并在同一 tick 中取消设置。在服务器端渲染时，来自不同用户的多个请求和 nuxtApp 在同一个全局上下文中运行。因此，Nuxt 和 Vue 会立即取消设置此全局实例，以避免在两个用户或组件之间泄漏共享引用。

这意味着什么？Composition API 和 Nuxt 可组合函数仅在生命周期期间以及任何异步操作之前的同一 tick 中可用：

```js
// --- Vue internal ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue / Nuxt sets a global variable referencing to current component in _vueInstance when calling setup()
async function setup() {
  getCurrentInstance() // Works
  await someAsyncOperation() // Vue unsets the context in same tick before async operation!
  getCurrentInstance() // null
}
```

对此的经典解决方案是在第一次调用时将当前实例缓存到像 `const instance = getCurrentInstance()` 这样的局部变量中，并在下一次可组合函数调用中使用它，但问题是任何嵌套的可组合函数调用现在都需要显式地接受该实例作为参数，而不是依赖组合 API 的隐式上下文。这是可组合函数的设计限制，本身不是一个问题。

为了克服这个限制，Vue 在编译我们的应用程序代码时做了一些幕后工作，并在每次 `<script setup>` 调用后恢复上下文：

```js
const __instance = getCurrentInstance() // Generated by Vue compiler
getCurrentInstance() // Works!
await someAsyncOperation() // Vue unsets the context
__restoreInstance(__instance) // Generated by Vue compiler
getCurrentInstance() // Still works!
```

有关 Vue 实际执行的操作的更好描述，请参阅 [unjs/unctx#2 (comment)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723)。

#### 解决方案

这就是可以使用 `runWithContext` 来恢复上下文的地方，类似于 `<script setup>` 的工作方式。

Nuxt 内部使用 [unjs/unctx](https://github.com/unjs/unctx) 来支持类似于 Vue 的插件和中间件的可组合函数。这使得像 `navigateTo()` 这样的可组合函数可以在不直接将 `nuxtApp` 传递给它们的情况下工作 - 将 Composition API 的 DX 和性能优势带给整个 Nuxt 框架。

Nuxt 可组合函数与 Vue Composition API 具有相同的设计，因此需要类似的解决方案来神奇地进行这种转换。查看 [unjs/unctx#2](https://github.com/unjs/unctx/issues/2) (提案)、[unjs/unctx#4](https://github.com/unjs/unctx/pull/4) (转换实现) 和 [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884) (集成到 Nuxt)。

Vue 目前仅为 `<script setup>` 的 async/await 用法支持异步上下文恢复。在 Nuxt 中，添加了对 `defineNuxtPlugin()` 和 `defineNuxtRouteMiddleware()` 的转换支持，这意味着当你使用它们时，Nuxt 会自动转换它们并进行上下文恢复。

#### 遗留问题

`unjs/unctx` 自动恢复上下文的转换在包含 `await` 的 `try/catch` 语句中似乎存在缺陷，最终需要解决这个问题以消除上述建议的变通方法的需求。

#### 原生异步上下文

使用一项新的实验性功能，可以使用 [Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) 和新的 unctx 支持启用原生异步上下文支持，从而原生地将异步上下文提供给任何嵌套的异步可组合函数，而无需转换或手动传递/使用上下文调用。

::tip
原生异步上下文支持目前在 Bun 和 Node 中有效。
::

:read-more{to="/docs/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp

此函数的工作方式与 `useNuxtApp` 完全相同，但如果上下文不可用，则返回 `null` 而不是抛出异常。

你可以将其用于不需要 `nuxtApp` 的可组合函数，或者只是为了在不抛出异常的情况下检查上下文是否可用。

用法示例：

```ts [composable.ts]
export function useStandType() {
  // Always works on the client
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### Params

- `appName`: an optional application name. If you do not provide it, the Nuxt `buildId` option is used. Otherwise, it must match with an existing `buildId`. -->
