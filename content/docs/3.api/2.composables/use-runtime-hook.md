---
title: useRuntimeHook
description: 在 Nuxt 应用程序中注册一个运行时钩子，并确保在作用域销毁时正确地清理它。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
此 composable 在 Nuxt v3.14+ 版本中可用。
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks>(
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never
): void
```

## 用法

### 参数

- `name`: 要注册的运行时钩子的名称。你可以在此处查看完整的 [运行时 Nuxt 钩子](/docs/api/advanced/hooks#app-hooks-runtime) 列表。
- `fn`: 钩子触发时要执行的回调函数。函数签名根据钩子名称而异。

### 返回值

该 composable 不返回值，但它会在组件的作用域销毁时自动注销该钩子。

## 示例

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// Register a hook that runs every time a link is prefetched, but which will be
// automatically cleaned up (and not called again) when the component is unmounted
useRuntimeHook('link:prefetch', (link) => {
  console.log('Prefetching', link)
})
</script>
```
