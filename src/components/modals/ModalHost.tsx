import { useTranslation } from 'react-i18next'
import { BaseModal } from '@/components/modals/BaseModal'
import { SlideUpModal } from '@/components/modals/SlideUpModal'
import { Button } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeBaseModal, closeSlideUpModal } from '@/store/ui'

export function ModalHost() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { isBaseModalOpen, isSlideUpModalOpen } = useAppSelector((state) => state.ui)

  return (
    <>
      <BaseModal
        open={isBaseModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            dispatch(closeBaseModal())
          }
        }}
        title={t('pages.modals.baseModal.title')}
        description={t('pages.modals.baseModal.description')}
      >
        <p className="text-sm text-muted-foreground">{t('pages.modals.baseModal.body')}</p>
        <div className="mt-4 flex justify-end">
          <Button type="button" size="sm" hapticFeedback="light" onClick={() => dispatch(closeBaseModal())}>
            {t('common.close')}
          </Button>
        </div>
      </BaseModal>

      <SlideUpModal
        open={isSlideUpModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            dispatch(closeSlideUpModal())
          }
        }}
        title={t('pages.modals.slideUpModal.title')}
        description={t('pages.modals.slideUpModal.description')}
      >
        <p className="text-sm text-muted-foreground">{t('pages.modals.slideUpModal.body')}</p>
        <div className="flex justify-end">
          <Button
            type="button"
            size="sm"
            hapticFeedback="light"
            onClick={() => dispatch(closeSlideUpModal())}
          >
            {t('common.close')}
          </Button>
        </div>
      </SlideUpModal>
    </>
  )
}
