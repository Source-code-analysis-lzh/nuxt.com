---
title: 'useNuxtData'
description: 访问数据获取可组合函数的当前缓存值。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` 使你可以访问通过显式提供的键缓存的 [`useAsyncData`](/docs/api/composables/use-async-data)、[`useLazyAsyncData`](/docs/api/composables/use-lazy-async-data)、[`useFetch`](/docs/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/api/composables/use-lazy-fetch) 的当前值。
::

## 用法

`useNuxtData` 这个可组合函数用于访问数据获取可组合函数（如 `useAsyncData`、`useLazyAsyncData`、`useFetch 和` `useLazyFetch`）的当前缓存值。通过提供在数据获取期间使用的键，你可以检索缓存的数据并在需要时使用它。

这对于通过重用已获取的数据或实现乐观更新或级联数据更新等功能来优化性能特别有用。

要使用 `useNuxtData`，请确保数据获取可组合函数（`useFetch`、`useAsyncData` 等）已使用显式提供的键调用。

:video-accordion{title="观看 LearnVue 关于 useNuxtData 的视频" videoId="e-_u6swXRWk"}

## 参数

- `key`: 标识缓存数据的唯一键。此键应与原始数据获取期间使用的键匹配。

## 返回值

- `data`: 对与提供的键关联的缓存数据的响应式引用。如果不存在缓存数据，则该值为 `null`。如果缓存数据发生更改，此 `Ref` 会自动更新，从而在你的组件中实现无缝的响应性。

## 示例

下面的示例演示了如何在从服务器获取最新数据的同时，使用缓存数据作为占位符。

```vue [pages/posts.vue]
<script setup lang="ts">
// We can access same data later using 'posts' key
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [pages/posts/[id\\].vue]
<script setup lang="ts">
// Access to the cached value of useFetch in posts.vue (parent route)
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default() {
    // Find the individual post from the cache and set it as the default value.
    return posts.value.find(post => post.id === route.params.id)
  }
})
</script>
```

## 乐观更新

下面的示例演示了如何使用 useNuxtData 实现乐观更新。

乐观更新是一种在用户界面上立即更新的技术，假设服务器操作会成功。如果操作最终失败，UI 将回滚到其先前的状态。

```vue [pages/todos.vue]
<script setup lang="ts">
// We can access same data later using 'todos' key
const { data } = await useAsyncData('todos', () => $fetch('/api/todos'))
</script>
```

```vue [components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
let previousTodos = []

// Access to the cached value of useAsyncData in todos.vue
const { data: todos } = useNuxtData('todos')

async function addTodo () {
  return $fetch('/api/addTodo', {
    method: 'post',
    body: {
      todo: newTodo.value
    },
    onRequest () {
      // Store the previously cached value to restore if fetch fails.
      previousTodos = todos.value

      // Optimistically update the todos.
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      // Rollback the data if the request failed.
      todos.value = previousTodos
    },
    async onResponse () {
      // Invalidate todos in the background if the request succeeded.
      await refreshNuxtData('todos')
    }
  })
}
</script>
```

## 类型

```ts
useNuxtData<DataT = any> (key: string): { data: Ref<DataT | null> }
```
