import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '@/assets/locales/en/translation.json'
import uk from '@/assets/locales/uk/translation.json'

void i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uk: { translation: uk },
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'uk'],
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
})

export default i18n
