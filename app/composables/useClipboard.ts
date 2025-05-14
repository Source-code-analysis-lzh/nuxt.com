import { useClipboard as _useClipboard } from '@vueuse/core'

type toastOptions = {
  title?: string
  description?: string
  icon?: string
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'important' | 'neutral'
}

/**
 * 自定义剪贴板钩子，用于复制文本到剪贴板并显示通知
 * 此钩子封装了第三方库的使用，以便于在应用中轻松复制文本并给予用户反馈
 */
export const useClipboard = () => {
  // 使用第三方库的剪贴板钩子
  const { copy: _copy, copied } = _useClipboard()

  // 初始化通知组件
  const toast = useToast()

  /**
   * 复制文本到剪贴板并根据选项显示通知
   * @param source 需要复制的文本源
   * @param optionsOptions 可选的通知选项，用于自定义通知行为
   */
  const copy = (source: string, optionsOptions?: toastOptions) => {
    // 调用底层库的复制功能
    _copy(source)
    // 如果提供了通知选项，则添加通知
    if (optionsOptions) {
      toast.add(optionsOptions)
    }
  }

  // 返回复制功能和复制状态
  return {
    copy,
    copied
  }
}
