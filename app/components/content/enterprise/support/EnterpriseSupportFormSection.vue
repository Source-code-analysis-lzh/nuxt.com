<script lang="ts" setup>
// 定义 NuxtTurnstile 组件的方法接口（用于重置）
interface NuxtTurnstile {
  reset: () => void
}

// 引入 valibot 进行表单验证
import * as v from 'valibot'
// 引入 FormSubmitEvent 类型定义，用于类型安全提交事件
import type { FormSubmitEvent } from '#ui/types'

// 定义组件接收的 props，包含整个表单的配置项
const formProps = defineProps<{
  form: {
    name: { label: string, placeholder: string }
    email: { label: string, placeholder: string }
    company: { label: string, placeholder: string }
    body: { label: string, placeholder: string }
    info: string
    button: any // 按钮配置（如文字、图标等）
  }
}>()

// 使用 toast 提示用户操作结果
const toast = useToast()

// 表单加载状态
const loading = ref<boolean>(false)

// 获取 turnstile 组件引用，用于手动重置
const turnstile = useTemplateRef<NuxtTurnstile>('turnstile')
// 存储 Turnstile 验证 token
const token = ref()

// 定义表单验证规则（使用 valibot）
const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  email: v.pipe(
    v.string(),
    v.minLength(1, 'Email is required'),
    v.email('Please enter a valid email')
  ),
  company: v.pipe(v.string(), v.minLength(1, 'Company is required')),
  body: v.pipe(v.string(), v.minLength(1, 'Message is required'))
})

// 推断出验证对象的输出类型，用于 TypeScript 类型推导
type Schema = v.InferOutput<typeof schema>

// 定义响应式表单数据模型
const state = reactive({
  name: '',
  email: '',
  company: '',
  body: ''
})

// 控制是否显示验证码（Turnstile）
const showTurnstile = ref(false)

// 判断是否可以提交表单：所有字段填写且有 token
const canSend = computed(() => {
  return Boolean(state.name && state.email && state.company && state.body && token.value)
})

// 当任意表单字段被填满后，显示验证码控件
watch([() => state.name, () => state.email, () => state.company, () => state.body],
  () => {
    if (state.name && state.email && state.company && state.body) {
      showTurnstile.value = true
    }
  },
  { immediate: true }
)

// 表单提交逻辑
async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!event.data) return
  if (loading.value || !canSend.value) return

  loading.value = true

  await $fetch('https://api.nuxt.com/support/contact', {
    method: 'POST',
    body: {
      ...event.data,
      token: token.value
    }
  })
    .then(() => {
      // 成功发送邮件：清空表单并提示用户
      state.name = ''
      state.email = ''
      state.company = ''
      state.body = ''
      showTurnstile.value = false
      toast.add({ title: 'Email sent', description: 'We will do everything possible to respond to you as quickly as possible', color: 'success' })
    })
    .catch((e) => {
      // 发送失败处理
      const description = e.data?.message || 'Something went wrong. Please try again later.'
      toast.add({ title: 'Email sending failed', description, color: 'error' })
    })
    .finally(() => {
      // 不论成功与否，关闭加载状态并重置验证码
      loading.value = false
      // reset turnstile token
      turnstile.value?.reset()
    })
}
</script>

<template>
  <div class="w-full max-w-[640px]">
    <UPageCard>
      <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
        <UFormField :label="formProps.form.name.label" name="name" required>
          <UInput v-model="state.name" :placeholder="formProps.form.name.placeholder" class="w-full" />
        </UFormField>

        <UFormField :label="formProps.form.email.label" name="email" required>
          <UInput v-model="state.email" type="email" :placeholder="formProps.form.email.placeholder" class="w-full" />
        </UFormField>

        <UFormField :label="formProps.form.company.label" name="company" required>
          <UInput v-model="state.company" :placeholder="formProps.form.company.placeholder" class="w-full" />
        </UFormField>

        <UFormField :label="formProps.form.body.label" name="body" required>
          <UTextarea v-model="state.body" autoresize :placeholder="formProps.form.body.placeholder" :rows="6" class="w-full" />
        </UFormField>

        <ClientOnly>
          <NuxtTurnstile v-if="showTurnstile" ref="turnstile" v-model="token" :options="{ theme: $colorMode.value as 'auto' | 'light' | 'dark' }" />
        </ClientOnly>

        <div class="flex justify-end">
          <UButton
            v-bind="formProps.form.button"
            type="submit"
            color="neutral"
            class="w-fit pt-2"
            :loading="loading"
            :disabled="!canSend"
          />
        </div>
      </UForm>
    </UPageCard>
  </div>
</template>
