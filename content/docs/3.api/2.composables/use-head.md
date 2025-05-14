---
title: useHead
description: useHead 用于自定义你的 Nuxt 应用中各个页面的 head 属性。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

[`useHead`](/docs/api/composables/use-head) 这个可组合函数允许你以编程方式和响应式地管理你的 head 标签，它由 [Unhead](https://unhead.unjs.io) 提供支持。如果数据来自用户或其他不可信来源，我们建议你查看 [`useHeadSafe`](/docs/api/composables/use-head-safe)。

:read-more{to="/docs/getting-started/seo-meta"}

## 类型

```ts
useHead(meta: MaybeComputedRef<MetaObject>): void
```

以下是 [`useHead`](/docs/api/composables/use-head) 的非响应式类型。

```ts
interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[]
  htmlAttrs?: HtmlAttributes
  bodyAttrs?: BodyAttributes
}
```

更详细的类型请参阅 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts)。

::note
`useHead` 的属性可以是动态的，接受 `ref`、`computed` 和 `reactive` 属性。`meta` 参数也可以接受一个返回对象的函数，使整个对象具有响应性。
::

## 参数

### `meta`

**类型**: `MetaObject`

一个接受以下 head 元数据的对象：

- `meta`: 数组中的每个元素都映射到一个新创建的 `<meta>` 标签，其中对象的属性映射到相应的特性。
  - **类型**: `Array<Record<string, any>>`
- `link`: 数组中的每个元素都映射到一个新创建的 `<link>` 标签，其中对象的属性映射到相应的特性。
  - **类型**: `Array<Record<string, any>>`
- `style`: 数组中的每个元素都映射到一个新创建的 `<style>` 标签，其中对象的属性映射到相应的特性。
  - **类型**: `Array<Record<string, any>>`
- `script`: 数组中的每个元素都映射到一个新创建的 `<script>` 标签，其中对象的属性映射到相应的特性。
  - **类型**: `Array<Record<string, any>>`
- `noscript`: 数组中的每个元素都映射到一个新创建的 `<noscript>` 标签，其中对象的属性映射到相应的特性。
  - **类型**: `Array<Record<string, any>>`
- `titleTemplate`: 配置动态模板，以自定义单个页面上的页面标题。
  - **类型**: `string` | `((title: string) => string)`
- `title`: 在单个页面上设置静态页面标题。
  - **类型**: `string`
- `bodyAttrs`: 设置 `<body>` 标签的属性。每个对象属性都映射到相应的特性。
  - **类型**: `Record<string, any>`
- `htmlAttrs`: 设置 `<html>` 标签的属性。每个对象属性都映射到相应的特性。
  - **类型**: `Record<string, any>`
