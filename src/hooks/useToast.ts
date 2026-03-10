import { showErrorToast, showSuccessToast } from '@/components/ui'

export function useToast() {
  return {
    success: showSuccessToast,
    error: showErrorToast,
  }
}
