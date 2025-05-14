---
title: useHeadSafe
description: 使用用户输入提供 head 数据的推荐方式。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

`useHeadSafe` composable 是 [`useHead`](/docs/api/composables/use-head) composable 的一个包装器，它限制输入，只允许安全的值。

## 用法

你可以传递与 [`useHead`](/docs/api/composables/use-head) 相同的所有值。

```ts
useHeadSafe({
  script: [
    { id: 'xss-script', innerHTML: 'alert("xss")' }
  ],
  meta: [
    { 'http-equiv': 'refresh', content: '0;javascript:alert(1)' }
  ]
})
// Will safely generate
// <script id="xss-script"></script>
// <meta content="0;javascript:alert(1)">
```

::read-more{to="https://unhead.unjs.io/docs/typescript/head/api/composables/use-head-safe" target="_blank"}
在 `Unhead` 文档中阅读更多内容。
::

## 类型

```ts
useHeadSafe(input: MaybeComputedRef<HeadSafe>): void
```

允许的值列表如下：

```ts
const WhitelistAttributes = {
  htmlAttrs: ['class', 'style', 'lang', 'dir'],
  bodyAttrs: ['class', 'style'],
  meta: ['name', 'property', 'charset', 'content', 'media'],
  noscript: ['textContent'],
  style: ['media', 'textContent', 'nonce', 'title', 'blocking'],
  script: ['type', 'textContent', 'nonce', 'blocking'],
  link: ['color', 'crossorigin', 'fetchpriority', 'href', 'hreflang', 'imagesrcset', 'imagesizes', 'integrity', 'media', 'referrerpolicy', 'rel', 'sizes', 'type'],
}
```

更详细的类型请参阅 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts)。
