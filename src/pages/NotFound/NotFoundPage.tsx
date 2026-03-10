import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-50" />
      <div className="pointer-events-none absolute -left-16 top-16 h-48 w-48 rounded-full bg-amber-300/40 blur-3xl animate-float-slow dark:bg-[#0a84ff]/20" />
      <div className="pointer-events-none absolute -right-16 bottom-20 h-56 w-56 rounded-full bg-teal-300/35 blur-3xl animate-float-slower dark:bg-[#5e5ce6]/18" />

      <section className="relative w-full max-w-xl animate-fade-up rounded-3xl border border-white/70 bg-white/85 p-8 text-center shadow-[0_30px_100px_-55px_rgba(15,23,42,0.7)] backdrop-blur-xl dark:border-[#3a3a3c] dark:bg-[#1c1c1e] dark:shadow-[0_30px_110px_-65px_rgba(10,132,255,0.35)] sm:p-10">
        <p className="font-display text-7xl leading-none text-slate-900 dark:text-[#f2f2f7] sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl text-slate-900 dark:text-[#f2f2f7] sm:text-3xl">
          {t('notFound.title')}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-[#aeaeb2] sm:text-base">
          {t('notFound.description')}
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-slate-100 transition-transform duration-200 hover:-translate-y-0.5 dark:bg-[#0a84ff] dark:text-white dark:hover:bg-[#007aff]"
        >
          {t('notFound.backHome')}
        </Link>
      </section>
    </main>
  )
}
