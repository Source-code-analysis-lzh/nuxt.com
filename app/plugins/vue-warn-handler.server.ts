/**
 * Nuxt 插件：自定义 Vue 的警告和错误处理（仅在开发模式下生效）
 * 用于拦截并美化 Vue 组件中的 warn 和 error 输出信息
 */
export default defineNuxtPlugin((nuxtApp) => {
  // 仅在开发模式下启用自定义日志处理器
  if (import.meta.dev) {
    // 设置 Vue 的警告处理器
    nuxtApp.vueApp.config.warnHandler = (msg, vm, trace) => {
      // 在控制台输出格式化的警告信息，并截取堆栈跟踪的前5行
      console.warn(`[Vue warn]: ${msg}${trace ? trace.split('\n').slice(0, 5).join('\n') : ''}`)
    }
    // 设置 Vue 的错误处理器
    nuxtApp.vueApp.config.errorHandler = (msg, vm, trace) => {
      // 在控制台输出格式化的错误信息，并截取堆栈跟踪的前5行
      console.error(`[Vue error]: ${msg}${trace ? trace.split('\n').slice(0, 5).join('\n') : ''}`)
    }
  }
})
