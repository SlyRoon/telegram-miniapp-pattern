# scalable-frontend-pattern

Практичний starter для **Telegram Mini App** на `React + TypeScript + Vite`.

Проєкт уже має готову базу: router, redux, i18n, toast, API-client, Telegram helper-слой, modal foundation, theme switch і базові UI primitives.

## 1) Концепція

Це не демо-шаблон і не перевантажена архітектура. Це робочий мінімум, який легко масштабувати:

- чіткий поділ по зонах відповідальності
- Telegram runtime як частина core
- mobile-first UI з modal-first UX
- прості розширення без зайвого бойлерплейту

## 2) Поточний стек

- `react`, `react-dom`, `typescript`, `vite`
- `react-router-dom`
- `@reduxjs/toolkit`, `react-redux`
- `axios`
- `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- `react-hot-toast`
- `tailwindcss`, `tailwind-merge`, `class-variance-authority`, `clsx`
- `lucide-react`
- `vite-plugin-svgr`

## 3) Поточна структура

```text
src/
├── api/
│   ├── client.ts
│   ├── index.ts
│   └── requests/
│       ├── auth.ts
│       ├── telegram.ts
│       ├── user.ts
│       └── index.ts
│
├── app/
│   ├── App.tsx
│   ├── config/
│   │   ├── env.ts
│   │   └── index.ts
│   ├── providers/
│   │   └── AppProviders.tsx
│   ├── router/
│   │   ├── AppRouter.tsx
│   │   └── routes.tsx
│   ├── store/
│   │   ├── hooks.ts
│   │   └── index.ts
│   └── styles/
│       └── globals.css
│
├── assets/
│   └── locales/
│       ├── en/translation.json
│       └── uk/translation.json
│
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── Preloader.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── index.ts
│   ├── modals/
│   │   ├── BaseModal.tsx
│   │   ├── SlideUpModal.tsx
│   │   ├── ModalHost.tsx
│   │   └── index.ts
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── modal.tsx
│   │   ├── toast.ts
│   │   └── index.ts
│   └── index.ts
│
├── helpers/
│   ├── devices.ts
│   ├── i18n.ts
│   ├── telegram.ts
│   ├── tools.ts
│   └── index.ts
│
├── hooks/
│   ├── usePreloader.ts
│   ├── useSwipeDown.ts
│   ├── useTheme.ts
│   ├── useToast.ts
│   └── index.ts
│
├── lib/
│   ├── utils.ts
│   └── index.ts
│
├── pages/
│   ├── main/
│   │   ├── MainPage.tsx
│   │   └── index.ts
│   ├── Error/
│   │   ├── ErrorPage.tsx
│   │   └── index.ts
│   └── NotFound/
│       ├── NotFoundPage.tsx
│       └── index.ts
│
├── store/
│   ├── hooks.ts
│   ├── index.ts
│   ├── data/
│   │   ├── slice.ts
│   │   └── index.ts
│   └── ui/
│       ├── slice.ts
│       └── index.ts
│
├── types/
│   ├── telegram.ts
│   ├── ui.ts
│   ├── user.ts
│   └── index.ts
│
├── main.tsx
└── vite-env.d.ts
```

## 4) Runtime flow (зараз)

1. `index.html` підключає Telegram SDK.
2. `main.tsx`:
   - підхоплює тему з `localStorage/system`
   - ініціалізує i18n
   - монтує `<App />`
3. `AppProviders` підключає Redux + global Toaster.
4. `App.tsx`:
   - запускає preloader через `usePreloader`
   - ініціалізує Telegram через `initTelegramMiniApp`
   - кладе Telegram meta у Redux
   - рендерить router + `ModalHost`

## 5) Маршрути

`src/app/router/routes.tsx`:

- `/` -> `MainPage`
- `/error` -> `ErrorPage`
- `*` -> `NotFoundPage`

## 6) Redux стан

`ui` slice:

- `isAppReady`
- `isBaseModalOpen`
- `isSlideUpModalOpen`

`data` slice:

- `language` (`en | uk`)
- `telegramMeta` (`isTelegram`, `isReady`, `isExpanded`, `isFullscreen`, `platform`)

Typed hooks:

- `useAppDispatch`
- `useAppSelector`

## 7) i18n (актуальний формат)

Локалі зберігаються в:

- `src/assets/locales/en/translation.json`
- `src/assets/locales/uk/translation.json`

Ключі організовані у вкладеному форматі:

- `pages.main.*`
- `pages.modals.*`
- `pages.error.*`
- `pages.notFound.*`

Приклад використання:

```ts
const { t } = useTranslation()
t('pages.modals.walletModal.connect')
```

Мови перемикаються явно через `LanguageSwitcher` (EN/UK), а не простим blind-toggle.

## 8) Telegram helper-шар

`src/helpers/telegram.ts` надає:

- `tgReady`, `tgExpand`, `tgClose`
- `tgDisableYSwipes`
- `tgRequestFullscreen`, `tgOpenFullScreen`
- `tgOpenLink`, `tgOpenTelegramLink`
- `tgHaptic` + `tgHapticImpact` + `tgHapticNotification`
- `initTelegramMiniApp`

Важливо:

- fullscreen захищений перевірками (включно з версією WebApp)
- старі клієнти Telegram не валять застосунок

## 9) UI foundation (актуально)

- `Button` підтримує `hapticFeedback` проп
- є базові primitives: `button`, `input`, `label`, `card`, `modal`, `toast`
- модалки будуються через `BaseModal` і `SlideUpModal`
- глобальна композиція модалок: `ModalHost`

## 10) Змінні середовища

`.env.example`:

```env
VITE_API_BASE_URL=/api
VITE_TG_ENABLE_FULLSCREEN=true
VITE_TON_MANIFEST_URL=
```

## 11) Скрипти

```bash
npm run dev
npm run dev-ngrok
npm run dev-ngrol
npm run lint
npm run build
npm run preview
```

`dev-ngrol` залишено як alias на `dev-ngrok` (щоб не ламалося через частий typo).

## 12) Швидкий старт

```bash
npm install
cp .env.example .env
npm run dev
```

Для публічного URL через ngrok:

```bash
npm run dev-ngrok
```

Якщо запускаєш ngrok вперше, додай токен один раз:

```bash
ngrok config add-authtoken <YOUR_NGROK_TOKEN>
```

## 13) Що тут свідомо НЕ включено

- предметна бізнес-логіка (wallet/deposit/referrals/game)
- auth-flow з бекенд інтеграцією під ключ
- важкі опціональні інтеграції «на майбутнє»

Starter залишається чистим, а доменні модулі додаються поверх цього фундаменту.
