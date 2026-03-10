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
        title={t('main.baseModalTitle')}
        description={t('main.baseModalDescription')}
      >
        <p className="text-sm text-muted-foreground">{t('main.baseModalBody')}</p>
        <div className="mt-4 flex justify-end">
          <Button type="button" size="sm" onClick={() => dispatch(closeBaseModal())}>
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
        title={t('main.sheetModalTitle')}
        description={t('main.sheetModalDescription')}
      >
        <p className="text-sm text-muted-foreground">{t('main.sheetModalBody')}</p>
        <div className="flex justify-end">
          <Button type="button" size="sm" onClick={() => dispatch(closeSlideUpModal())}>
            {t('common.close')}
          </Button>
        </div>
      </SlideUpModal>
    </>
  )
}
