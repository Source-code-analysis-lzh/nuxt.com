---
title: 'useRouteAnnouncer'
description: 这个 composable 观察页面标题的变化，并相应地更新播报器的消息。
navigation:
  badge: New
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
此 composable 在 Nuxt v3.12+ 版本中可用。
::

## 描述

一个观察页面标题变化并相应更新播报器消息的可组合函数。供 [`<NuxtRouteAnnouncer>`](/docs/api/components/nuxt-route-announcer) 使用且可控制。
它会监听 Unhead 的 [`dom:rendered`](https://unhead.unjs.io/docs/typescript/head/api/hooks/dom-rendered) 钩子来读取页面的标题并将其设置为播报器的消息。

## 参数

- `politeness`: 设置屏幕阅读器播报的紧急程度：`off`（禁用播报）、`polite`（等待静默）或 `assertive`（立即中断）（默认 `polite`）。

## 属性

### `message`

- **类型**: `Ref<string>`
- **描述**: 要播报的消息

### `politeness`

- **类型**: `Ref<string>`
- **描述**: 屏幕阅读器播报紧急级别 `off`, `polite` 或 `assertive`

## 方法

### `set(message, politeness = "polite")`

设置要播报的消息及其紧急级别。

### `polite(message)`

使用 `politeness = "polite"` 设置消息。

### `assertive(message)`

使用 `politeness = "assertive"` 设置消息。

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
  const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
    politeness: 'assertive'
  })
</script>
```
