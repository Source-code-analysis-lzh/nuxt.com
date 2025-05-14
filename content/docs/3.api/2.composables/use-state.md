---
title: "useState"
description: useState composable 创建一个响应式的、SSR 友好的共享状态。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## 用法

```ts
// Create a reactive state and set default value
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/getting-started/state-management"}

::important
由于 `useState` 内部的数据将被序列化为 JSON，因此重要的是它不包含任何无法序列化的内容，例如类、函数或 Symbol。
::

::warning
`useState` 是一个被编译器转换的保留函数名，因此你不应该将你自己的函数命名为 `useState`。
::

:video-accordion{title="观看 Alexander Lichter 关于为什么以及何时使用 useState 的视频" videoId="mv0WcBABcIk"}

## 使用 `shallowRef`

如果你的状态不需要深度响应式，你可以将 `useState` 与 [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref) 结合使用。当你的状态包含大型对象和数组时，这可以提高性能。

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## 类型

```ts
useState<T>(init?: () => T | Ref<T>): Ref<T>
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: 一个唯一的键，确保跨请求正确地去重数据获取。如果你不提供键，则会为你生成一个对于 [`useState`](/docs/api/composables/use-state) 实例的文件和行号唯一的键。
- `init`: 一个在未初始化状态时提供初始值的函数。此函数也可以返回一个 Ref。
- `T`: (仅限 TypeScript) 指定状态的类型
