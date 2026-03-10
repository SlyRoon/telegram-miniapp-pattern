import type { ModalProps } from '@/components/ui'
import { Modal } from '@/components/ui'

type BaseModalProps = Omit<ModalProps, 'variant'>

export function BaseModal(props: BaseModalProps) {
  return <Modal variant="center" {...props} />
}
