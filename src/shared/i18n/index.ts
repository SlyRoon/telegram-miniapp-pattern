import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { en } from '@/shared/i18n/locales/en'
import { uk } from '@/shared/i18n/locales/uk'

void i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en,
    uk,
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
