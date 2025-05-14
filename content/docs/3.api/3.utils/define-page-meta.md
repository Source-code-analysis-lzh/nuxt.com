---
title: 'definePageMeta'
description: '为你的页面组件定义元数据。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta` 是一个编译器宏，你可以用它来为位于 [`pages/`](/docs/guide/directory-structure/pages) 目录（除非另有 [设置](/docs/api/nuxt-config#pages)）下的页面组件设置元数据。通过这种方式，你可以为你的 Nuxt 应用的每个静态或动态路由设置自定义元数据。

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

:read-more{to="/docs/guide/directory-structure/pages#page-metadata"}

## 类型

```ts
definePageMeta(meta: PageMeta) => void

interface PageMeta {
  validate?: (route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>
  redirect?: RouteRecordRedirectOption
  name?: string
  path?: string
  props?: RouteRecordRaw['props']
  alias?: string | string[]
  pageTransition?: boolean | TransitionProps
  layoutTransition?: boolean | TransitionProps
  viewTransition?: boolean | 'always'
  key?: false | string | ((route: RouteLocationNormalizedLoaded) => string)
  keepalive?: boolean | KeepAliveProps
  layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  scrollToTop?: boolean | ((to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => boolean)
  [key: string]: unknown
}
```

## 参数

### `meta`

- **类型**: `PageMeta`

  一个接受以下页面元数据的对象：

  **`name`**

  - **类型**: `string`

    你可以为此页面的路由定义一个名称。默认情况下，名称是基于 [pages/](/docs/guide/directory-structure/pages) 目录中的路径生成的。

  **`path`**

  - **类型**: `string`

    如果你的模式比文件名能表达的更复杂，你可以定义一个 [自定义正则表达式](#using-a-custom-regular-expression)。

  **`props`**
  
  - **类型**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)

    允许将路由 `params` 作为 props 传递给页面组件。

  **`alias`**

  - **类型**: `string | string[]`

    记录的别名。允许定义额外的路径，这些路径的行为将与记录的副本相同。允许拥有像 `/users/:id` 和 `/u/:id` 这样的路径简写。所有 `alias` 和 `path` 值必须共享相同的参数。

  **`keepalive`**

  - **类型**: `boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components.html#keepalive)

    当你想在路由更改时保留页面状态，或者使用 [`KeepAliveProps`](https://vuejs.org/api/built-in-components.html#keepalive) 进行更细粒度的控制时，设置为 `true`。

  **`key`**

  - **类型**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    当需要更精细地控制 `<NuxtPage>` 组件何时重新渲染时，设置 `key` 值。

  **`layout`**

  - **类型**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    为每个路由设置布局的静态或动态名称。如果需要禁用默认布局，可以将其设置为 `false`。

  **`layoutTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition)

    设置应用于当前布局的过渡效果的名称。你也可以将此值设置为 `false` 以禁用布局过渡。

  **`middleware`**

  - **类型**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/NavigationGuard.html#navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    直接在 `definePageMeta` 中定义匿名或具名中间件。了解更多关于 [路由中间件](/docs/guide/directory-structure/middleware)。

  **`pageTransition`**

  - **类型**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition)

    设置应用于当前页面的过渡效果的名称。你也可以将此值设置为 `false` 以禁用页面过渡。

  **`viewTransition`**

  - **类型**: `boolean | 'always'`

    **实验性功能，仅在 您的 [nuxt.config 文件中启用](/docs/getting-started/transitions#view-transitions-api-experimental) 时可用**</br>
    为当前页面启用/禁用视图过渡。
    如果设置为 true，如果用户的浏览器匹配 `prefers-reduced-motion: reduce`（推荐），Nuxt 将不会应用过渡。如果设置为 `always`，Nuxt 将始终应用过渡。

  **`redirect`**

  - **类型**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect-and-alias)

    如果直接匹配到该路由，则重定向到哪里。重定向发生在任何导航守卫之前，并触发一个新的导航到新的目标位置。

  **`validate`**

  - **类型**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    验证给定的路由是否可以有效地渲染此页面。如果有效则返回 true，否则返回 false。如果没有找到其他匹配项，则表示 404 错误。你也可以直接返回一个包含 `statusCode/statusMessage` 的对象来立即响应错误（不会检查其他匹配项）。

  **`scrollToTop`**

  - **类型**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    告诉 Nuxt 在渲染页面之前是否滚动到顶部。如果你想覆盖 Nuxt 的默认滚动行为，可以在 `~/app/router.options.ts` 中进行设置（有关更多信息，请参阅 [自定义路由](/docs/guide/recipes/custom-routing#using-approuteroptions)）。

  **`[key: string]`**

  - **类型**: `any`

    除了上述属性外，你还可以设置 **自定义** 元数据。你可能希望通过扩展 [`meta` 对象的类型](/docs/guide/directory-structure/pages/#typing-custom-metadata) 以类型安全的方式进行此操作。

## 示例

### 基本用法

下面的示例演示了：

- `key` 如何成为返回值的函数；
- `keepalive` 属性如何确保在多个组件之间切换时，`<modal>` 组件不会被缓存；
- 添加 `pageType` 作为自定义属性：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,

  keepalive: {
    exclude: ['modal']
  },

  pageType: 'Checkout'
})
</script>
```

### 定义中间件

下面的示例展示了如何直接在 `definePageMeta` 中使用 `function` 定义中间件，或者将其设置为与 `middleware/` 目录中的中间件文件名匹配的 `string`：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // define middleware as a function
  middleware: [
    function (to, from) {
      const auth = useState('auth')

      if (!auth.value.authenticated) {
          return navigateTo('/login')
      }

      if (to.path !== '/checkout') {
        return navigateTo('/checkout')
      }
    }
  ],

  // ... or a string
  middleware: 'auth'

  // ... or multiple strings
  middleware: ['auth', 'another-named-middleware']
})
</script>
```

### 使用自定义正则表达式

自定义正则表达式是解决重叠路由之间冲突的好方法，例如：

路由 "/test-category" 和 "/1234-post" 都匹配 `[postId]-[postSlug].vue` 和 `[categorySlug].vue` 页面路由。

为了确保 `[postId]-[postSlug]` 路由中 `postId` 仅匹配数字 (`\d+`)，我们可以将以下内容添加到 `[postId]-[postSlug].vue` 页面模板中：

```vue [pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug' 
})
</script>
```

更多示例请参阅 [Vue Router 的匹配语法](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)。

### 定义布局

你可以定义与（默认情况下）位于 [layouts/](/docs/guide/directory-structure/layouts) 目录中的布局文件名匹配的布局。你也可以通过将 `layout` 设置为 `false` 来禁用布局：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // set custom layout
  layout: 'admin'

  // ... or disable a default layout
  layout: false
})
</script>
```
