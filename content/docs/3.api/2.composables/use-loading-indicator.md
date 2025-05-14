---
title: 'useLoadingIndicator'
description: 这个 composable 使你可以访问应用页面的加载状态。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## 描述

一个返回页面加载状态的可组合函数。供 [`<NuxtLoadingIndicator>`](/docs/api/components/nuxt-loading-indicator) 使用且可控制。
它会监听 [`page:loading:start`](/docs/api/advanced/hooks#app-hooks-runtime) 和 [`page:loading:end`](/docs/api/advanced/hooks#app-hooks-runtime) 这两个钩子来改变自身的状态。

## 参数

- `duration`: 加载条的持续时间，以毫秒为单位（默认 `2000`）。
- `throttle`: 出现和隐藏的节流时间，以毫秒为单位（默认 `200`）。
- `estimatedProgress`: 默认情况下，Nuxt 在接近 100% 时会减速。你可以提供一个自定义函数来定制进度估计，该函数接收加载条的持续时间（如上）和经过的时间作为参数。它应该返回一个介于 0 和 100 之间的值。

## 属性

### `isLoading`

- **类型**: `Ref<boolean>`
- **描述**: 加载状态

### `error`

- **类型**: `Ref<boolean>`
- **描述**: 错误状态

### `progress`

- **类型**: `Ref<number>`
- **描述**: 进度状态。从 `0` 到 `100`。

## 方法

### `start()`

将 `isLoading` 设置为 true 并开始增加 `progress` 的值。`start` 接受一个 `{ force: true }` 选项来跳过间隔并立即显示加载状态。

### `set()`

将 `progress` 的值设置为一个特定的值。`set` 接受一个 `{ force: true }` 选项来跳过间隔并立即显示加载状态。

### `finish()`

将 `progress` 的值设置为 `100`，停止所有计时器和间隔，然后在 `500` 毫秒后重置加载状态。`finish` 接受一个 `{ force: true }` 选项来跳过在状态重置之前的间隔，以及 `{ error: true }` 来更改加载条的颜色并将 error 属性设置为 true。

### `clear()`

供 `finish()` 使用。清除 composable 使用的所有计时器和间隔。

## 示例

```vue
<script setup lang="ts">
  const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
    duration: 2000,
    throttle: 200,
    // This is how progress is calculated by default
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50)
  })
</script>
```

```vue
<script setup lang="ts">
  const { start, set } = useLoadingIndicator()
  // same as set(0, { force: true })
  // set the progress to 0, and show loading immediately
  start({ force: true })
</script>
```
