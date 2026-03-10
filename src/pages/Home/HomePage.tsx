import { ArrowUpRight, BellRing, Globe2, MoonStar, Sparkles, SunMedium } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/app/store/hooks'
import { useTheme } from '@/hooks/useTheme'

export function HomePage() {
  const { i18n, t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const isCoreReady = useAppSelector((state) => state.app.isCoreReady)

  const handleShowToast = () => {
    toast.success(t('home.toastSuccess'))
  }

  const handleToggleLanguage = () => {
    const nextLanguage = i18n.resolvedLanguage === 'uk' ? 'en' : 'uk'
    void i18n.changeLanguage(nextLanguage)
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 py-8 sm:px-8 sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-amber-300/45 blur-3xl animate-float-slow dark:bg-[#0a84ff]/20" />
      <div className="pointer-events-none absolute -right-20 bottom-14 h-64 w-64 rounded-full bg-teal-300/40 blur-3xl animate-float-slower dark:bg-[#5e5ce6]/18" />

      <section className="relative mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <article className="animate-fade-up rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_28px_90px_-46px_rgba(12,74,110,0.55)] backdrop-blur-xl dark:border-[#3a3a3c] dark:bg-[#1c1c1e] dark:shadow-[0_30px_90px_-55px_rgba(10,132,255,0.35)] sm:p-10">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:border-[#0a84ff]/45 dark:bg-[#0a84ff]/18 dark:text-[#9fd0ff]">
            <Sparkles className="h-3.5 w-3.5" />
            Scalable Frontend Pattern
          </p>

          <h1 className="font-display text-3xl leading-tight text-slate-900 dark:text-[#f2f2f7] sm:text-5xl">
            {t('home.title')}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-[#aeaeb2] sm:text-base">
            {t('home.description')}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleShowToast}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-transform duration-200 hover:-translate-y-0.5 dark:bg-[#0a84ff] dark:text-white dark:hover:bg-[#007aff]"
            >
              <BellRing className="h-4 w-4" />
              {t('home.showToast')}
            </button>

            <button
              type="button"
              onClick={handleToggleLanguage}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:border-[#3a3a3c] dark:bg-[#2c2c2e] dark:text-[#f2f2f7] dark:hover:bg-[#3a3a3c]"
            >
              <Globe2 className="h-4 w-4" />
              {t('home.switchLanguage')}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:border-[#3a3a3c] dark:bg-[#2c2c2e] dark:text-[#f2f2f7] dark:hover:bg-[#3a3a3c]"
            >
              {theme === 'dark' ? (
                <SunMedium className="h-4 w-4" />
              ) : (
                <MoonStar className="h-4 w-4" />
              )}
              {theme === 'dark' ? t('home.setLightTheme') : t('home.setDarkTheme')}
            </button>

            <Link
              to="/missing"
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-2 py-2 text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4 transition-colors duration-200 hover:text-slate-950 dark:text-[#8e8e93] dark:decoration-[#636366] dark:hover:text-[#f2f2f7]"
            >
              {t('home.openNotFound')}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-[#8e8e93]">
                Router
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-[#f2f2f7]">{t('home.statRouter')}</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-[#8e8e93]">
                Redux
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-[#f2f2f7]">{t('home.statState')}</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-[#8e8e93]">
                API
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-[#f2f2f7]">{t('home.statApi')}</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-[#8e8e93]">
                I18n
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-[#f2f2f7]">{t('home.statI18n')}</p>
            </div>
          </div>
        </article>

        <aside className="animate-fade-up-delayed rounded-3xl border border-slate-200/80 bg-white/75 p-6 shadow-[0_24px_70px_-50px_rgba(2,132,199,0.65)] backdrop-blur-xl dark:border-[#3a3a3c] dark:bg-[#1c1c1e] dark:shadow-[0_30px_90px_-58px_rgba(10,132,255,0.3)] sm:p-8">
          <h2 className="font-display text-2xl text-slate-900 dark:text-[#f2f2f7]">{t('home.subtitle')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-[#aeaeb2]">
            {t('home.coreStatus', {
              status: isCoreReady ? t('common.ready') : t('common.notReady'),
            })}
          </p>

          <div className="mt-6 rounded-2xl border border-emerald-200/70 bg-emerald-50/80 p-4 dark:border-[#34c759]/45 dark:bg-[#173224]">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700 dark:text-[#78f5a5]">
              Status
            </p>
            <p className="mt-2 text-sm font-medium text-emerald-900 dark:text-[#d3ffe0]">
              {isCoreReady ? t('common.ready') : t('common.notReady')}
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/85 p-4 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]">
            <p className="text-sm text-slate-600 dark:text-[#d1d1d6]">{t('home.description')}</p>
          </div>
        </aside>
      </section>
    </main>
  )
}
