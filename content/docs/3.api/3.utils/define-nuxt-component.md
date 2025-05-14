---
title: "defineNuxtComponent"
description: defineNuxtComponent() 是一个辅助函数，用于定义具有类型安全的 Options API 组件。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::note
`defineNuxtComponent()` 是一个辅助函数，用于定义具有类型安全的 Vue 组件，它使用类似于 [`defineComponent()`](https://vuejs.org/api/general.html#definecomponent) 的 Options API。`defineNuxtComponent()` 包装器还增加了对 `asyncData` 和 `head` 组件选项的支持。
::

::note
在 Nuxt 中，推荐使用 `<script setup lang="ts">` 来声明 Vue 组件。
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()`

如果您选择不在您的应用中使用 `setup()`，您可以在您的组件定义中使用 `asyncData()` 方法：

```vue [pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  async asyncData() {
    return {
      data: {
        greetings: 'hello world!'
      }
    }
  },
})
</script>
```

## `head()`

如果您选择不在您的应用中使用 `setup()`，您可以在您的组件定义中使用 `head()` 方法：

```vue [pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head(nuxtApp) {
    return {
      title: 'My site'
    }
  },
})
</script>
```
