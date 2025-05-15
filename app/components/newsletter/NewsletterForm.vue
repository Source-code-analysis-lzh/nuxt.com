<script setup lang="ts">
// 引入 valibot 用于表单验证
import * as v from 'valibot'
// 引入 FormSubmitEvent 类型定义，用于类型安全提交事件
import type { FormSubmitEvent } from '#ui/types'

// 定义组件 props：提供可配置的标签和描述文本
const {
  label = 'Subscribe to our newsletter',
  description = 'Stay updated on new releases and features, guides, and community updates.'
} = defineProps<{
  label?: string
  description?: string
}>()

// 使用 toast 提示用户操作结果
const toast = useToast()

// 表单加载状态，用于禁用按钮和显示 loading 状态
const loading = ref(false)

// 定义表单验证规则（使用 valibot）
const schema = v.object({
  email: v.pipe(v.string(), v.email('Please enter a valid email')) // 必须是合法邮箱格式
})

// 推断出验证对象的输出类型，用于 TypeScript 类型推导
type Schema = v.InferOutput<typeof schema>

// 定义响应式表单数据模型
const state = reactive({
  email: ''
})

// 表单提交逻辑
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  await $fetch('https://api.nuxt.com/newsletter/subscribe', {
    method: 'POST',
    body: {
      email: event.data.email // 发送邮件地址到后端 API
    }
  }).then(() => {
    // 成功订阅：提示用户确认邮件，清空输入框
    toast.add({ title: 'Subscription pending', description: 'Please check your emails to confirm your subscription.', color: 'success' })
    state.email = ''
  }).catch((err) => {
    // 订阅失败处理
    const error = JSON.parse(err.data?.message)
    const description = error[0].message || 'Something went wrong. Please try again later.'
    toast.add({ title: 'Subscription failed', description, color: 'error' })
  })
  loading.value = false
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField name="email" :label="label" size="lg" :description="description" :ui="{ label: 'font-semibold', container: 'mt-3' }">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="you@domain.com"
        required
        autocomplete="off"
        class="max-w-sm w-full"
      >
        <template #trailing>
          <UButton type="submit" size="xs" color="neutral" :label="loading ? 'Subscribing' : 'Subscribe'" :loading="loading" />
        </template>
      </UInput>
    </UFormField>
  </UForm>
</template>
