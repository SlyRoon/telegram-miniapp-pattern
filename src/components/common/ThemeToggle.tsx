import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui'
import { tgHapticImpact } from '@/helpers/telegram'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  const handleToggleTheme = () => {
    tgHapticImpact('light')
    toggleTheme()
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={handleToggleTheme}>
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {theme === 'dark' ? t('header.lightTheme') : t('header.darkTheme')}
    </Button>
  )
}
