import { Globe2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui'
import { tgHapticImpact } from '@/helpers/telegram'
import { useAppDispatch } from '@/store/hooks'
import { setLanguage } from '@/store/data'

export function LanguageSwitcher() {
  const dispatch = useAppDispatch()
  const { i18n, t } = useTranslation()

  const handleToggleLanguage = () => {
    const currentLanguage = i18n.resolvedLanguage === 'uk' ? 'uk' : 'en'
    const nextLanguage = currentLanguage === 'en' ? 'uk' : 'en'

    tgHapticImpact('light')
    dispatch(setLanguage(nextLanguage))
    void i18n.changeLanguage(nextLanguage)
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={handleToggleLanguage}>
      <Globe2 className="h-4 w-4" />
      {t('header.switchLanguage')}
    </Button>
  )
}
