import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui'
import { useAppDispatch } from '@/store/hooks'
import { setLanguage } from '@/store/data'

const AVAILABLE_LANGUAGES = [
  { code: 'en', labelKey: 'header.languageEn' },
  { code: 'uk', labelKey: 'header.languageUk' },
] as const

export function LanguageSwitcher() {
  const dispatch = useAppDispatch()
  const { i18n, t } = useTranslation()

  const currentLanguage = i18n.resolvedLanguage === 'uk' ? 'uk' : 'en'

  const changeLanguage = (nextLanguage: 'en' | 'uk') => {
    if (nextLanguage === currentLanguage) {
      return
    }

    dispatch(setLanguage(nextLanguage))
    void i18n.changeLanguage(nextLanguage)
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
      {AVAILABLE_LANGUAGES.map((language) => {
        const isActive = currentLanguage === language.code

        return (
          <Button
            key={language.code}
            type="button"
            size="sm"
            variant={isActive ? 'default' : 'ghost'}
            hapticFeedback="light"
            className="h-8 min-w-12 rounded-full px-3 text-[11px] font-semibold uppercase tracking-wide"
            onClick={() => changeLanguage(language.code)}
          >
            {t(language.labelKey)}
          </Button>
        )
      })}
    </div>
  )
}
