import { showErrorToast, showInfoToast, showSuccessToast } from '@/components/ui'

export type ToastVariant = 'success' | 'error' | 'info'

export const useToast = () => {
  const toast = (message: string, variant: ToastVariant = 'info') => {
    if (variant === 'success') {
      showSuccessToast(message)
      return
    }

    if (variant === 'error') {
      showErrorToast(message)
      return
    }

    showInfoToast(message)
  }

  const toastSuccess = (message: string) => toast(message, 'success')
  const toastError = (message: string) => toast(message, 'error')
  const toastInfo = (message: string) => toast(message, 'info')

  return {
    toast,
    toastSuccess,
    toastError,
    toastInfo,
    success: toastSuccess,
    error: toastError,
    info: toastInfo,
  }
}
