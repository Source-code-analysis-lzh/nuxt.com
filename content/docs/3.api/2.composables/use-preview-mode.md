---
title: "usePreviewMode"
description: 使用 usePreviewMode 来检查和控制 Nuxt 中的预览模式。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

预览模式允许你在不向用户公开更改的情况下，查看这些更改在实际站点上的显示效果。

你可以使用内置的 `usePreviewMode` 可组合函数来访问和控制 Nuxt 中的预览状态。如果该可组合函数检测到预览模式，它将自动强制执行 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`useFetch`](/docs/api/composables/use-fetch) 所需的任何更新，以重新渲染预览内容。

```js
const { enabled, state } = usePreviewMode()
```

## 选项

### 自定义 `enable` 检查

你可以指定启用预览模式的自定义方式。默认情况下，如果 URL 中存在一个值为 `true` 的 `preview` 参数（例如，`http://localhost:3000?preview=true`），`usePreviewMode` 可组合函数将启用预览模式。你可以将 `usePreviewMode` 包装到自定义的可组合函数中，以保持跨用例的选项一致性并防止任何错误。

```js
export function useMyPreviewMode () {
  return usePreviewMode({
    shouldEnable: () => {
      return !!route.query.customPreview
    }
  });
}
```

### 修改默认状态

`usePreviewMode` 将尝试将 URL 中 `token` 参数的值存储在状态中。你可以修改此状态，它将对所有 [`usePreviewMode`](/docs/api/composables/use-preview-mode) 调用可用。

```js
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  }
})
```

::note
`getState` 函数会将返回的值附加到当前状态，因此请小心不要意外覆盖重要的状态。
::

### 自定义 `onEnable` 和 `onDisable` 回调

默认情况下，当启用 `usePreviewMode` 时，它将调用 `refreshNuxtData()` 以从服务器重新获取所有数据。

禁用预览模式后，该可组合函数将附加一个回调，以便在后续路由器导航后调用 `refreshNuxtData()`。

你可以通过为 `onEnable` 和 `onDisable` 选项提供你自己的函数来指定要触发的自定义回调。

```js
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('preview mode has been enabled')
  },
  onDisable: () => {
    console.log('preview mode has been disabled')
  }
})
```

## 示例

下面的示例创建了一个页面，其中一部分内容仅在预览模式下呈现。

```vue [pages/some-page.vue]
<script setup>
const { enabled, state } = usePreviewMode()

const { data } = await useFetch('/api/preview', {
  query: {
    apiKey: state.token
  }
})
</script>

<template>
  <div>
    Some base content
    <p v-if="enabled">
      Only preview content: {{ state.token }}
      <br>
      <button @click="enabled = false">
        disable preview mode
      </button>
    </p>
  </div>
</template>
```

现在你可以生成你的站点并启动服务：

```bash [Terminal]
npx nuxi generate
npx nuxi preview
```

然后，你可以在想要查看一次的页面末尾添加查询参数 `preview` 来查看你的预览页面：

```js
?preview=true
```

::note
`usePreviewMode` should be tested locally with `nuxi generate` and then `nuxi preview` rather than `nuxi dev`. (The [preview command](/docs/api/commands/preview) is not related to preview mode.)
`usePreviewMode` 应该在本地使用 `nuxi generate` 然后 `nuxi preview` 进行测试，而不是 nuxi dev。（[preview 命令](/docs/api/commands/preview) 与预览模式无关。）
::
