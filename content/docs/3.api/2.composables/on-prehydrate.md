---
title: "onPrehydrate"
description: "使用 onPrehydrate 在客户端上 Nuxt 水合页面之前立即运行回调函数。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
此组合式函数在 Nuxt v3.12+ 中可用。
::

`onPrehydrate` 是一个组合式生命周期钩子，允许你在客户端上 Nuxt 水合页面之前立即运行回调函数。

::note
这是一个高级实用程序，应谨慎使用。例如，[`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) 和 [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) 会操作 DOM 以避免水合不匹配。
::

## 用法

`onPrehydrate` 可以直接在 Vue 组件的 setup 函数中（例如，在 `<script setup>` 中）或在插件中调用。它仅在服务器端调用时有效，并且不会包含在你的客户端构建中。

## 参数

- `callback`: 一个将被字符串化并内联到 HTML 中的函数。它不应有任何外部依赖项（例如自动导入）或引用在回调外部定义的变量。该回调将在 Nuxt 运行时初始化之前运行，因此不应依赖 Nuxt 或 Vue 上下文。

## 示例

```vue twoslash [app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// onPrehydrate is guaranteed to run before Nuxt hydrates
onPrehydrate(() => {
  console.log(window)
})

// As long as it only has one root node, you can access the element
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// For _very_ advanced use cases (such as not having a single root node) you
// can access/set `data-prehydrate-id` yourself
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Hi there
  </div>
</template>
```
