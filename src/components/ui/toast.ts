import { toast, type ToastOptions } from 'react-hot-toast'
import { tgHapticNotification } from '@/helpers/telegram'

export const defaultToasterOptions: ToastOptions = {
  duration: 2500,
  style: {
    borderRadius: '12px',
    border: '1px solid var(--border)',
    background: 'color-mix(in srgb, var(--card) 96%, transparent)',
    color: 'var(--card-foreground)',
    backdropFilter: 'blur(8px)',
  },
}

export const showSuccessToast = (message: string) => {
  tgHapticNotification('success')
  toast.success(message)
}

export const showErrorToast = (message: string) => {
  tgHapticNotification('error')
  toast.error(message)
}

export const showInfoToast = (message: string) => {
  toast(message)
}
