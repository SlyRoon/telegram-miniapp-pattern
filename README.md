# scalable-frontend-pattern

Production-ready **Telegram Mini App frontend starter** на `React + TypeScript + Vite`.

Ціль проста: дати чисту практичну базу, де вже підключені Telegram runtime, роутинг, глобальний state, i18n, API, toast і mobile-first modal UX.

## Концепція

Цей starter тримається прагматичного підходу:

- мінімальне, але реальне ядро (без фейкового scaffold)
- вертикальний поділ по прикладних зонах (`app/api/components/helpers/store/pages`)
- без переускладнення, поки немає доменної складності
- Telegram інтеграція як першокласна частина runtime

Це не навчальний демо-проєкт і не фреймворк «на все». Це робоча база для Telegram Mini Apps.

## Технологічний стек

- `react`, `react-dom`, `typescript`, `vite`
- `react-router-dom` (route-level сторінки)
- `@reduxjs/toolkit`, `react-redux` (global `ui/data` state)
- `axios` (API client + request modules)
- `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- `react-hot-toast`
- `tailwindcss` + `shadcn`-підхід
- `lucide-react`
- `vite-plugin-svgr`

## Структура проєкту

```text
src/
├── app/                         # композиція та запуск застосунку
│   ├── App.tsx                  # app shell: preloader, tg init, router, modal host
│   ├── config/                  # runtime-конфіг з env
│   ├── providers/               # Redux + Toaster провайдери
│   ├── router/                  # конфіг маршрутів
│   ├── store/                   # bridge re-export до root store
│   └── styles/                  # глобальні стилі + theme tokens
│
├── api/                         # http client і request-модулі
│   ├── client.ts                # axios instance
│   └── requests/                # групи endpoint-ів (auth/user/telegram)
│
├── assets/                      # статичні ресурси
│   └── locales/                 # i18n словники (en, uk)
│
├── components/
│   ├── common/                  # перевикористовувані app-level компоненти
│   │   ├── Header.tsx           # tg-friendly header з контролами
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Preloader.tsx
│   ├── modals/                  # базова модальна система
│   │   ├── BaseModal.tsx
│   │   ├── SlideUpModal.tsx
│   │   └── ModalHost.tsx
│   └── ui/                      # базові UI primitives
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── card.tsx
│       ├── modal.tsx
│       └── toast.ts
│
├── helpers/                     # платформені та інфраструктурні helper-и
│   ├── i18n.ts
│   ├── telegram.ts
│   ├── devices.ts
│   └── tools.ts
│
├── hooks/                       # загальні хуки
│   ├── useTheme.ts
│   ├── usePreloader.ts
│   ├── useSwipeDown.ts
│   └── useToast.ts
│
├── pages/                       # route-level сторінки
│   ├── main/MainPage.tsx
│   ├── Error/ErrorPage.tsx
│   └── NotFound/NotFoundPage.tsx
│
├── store/                       # глобальний state
│   ├── index.ts                 # configureStore
│   ├── hooks.ts                 # typed hooks
│   ├── ui/slice.ts              # ui state (app ready + modal state)
│   └── data/slice.ts            # data state (language + telegram meta)
│
├── lib/                         # загальні утиліти
│   └── utils.ts                 # cn() helper
│
└── types/                       # спільні TS типи
```

## Runtime Flow

1. `index.html` підключає Telegram WebApp SDK.
2. `src/main.tsx` виставляє початкову тему, ініціалізує i18n, монтує `<App />`.
3. `src/app/providers/AppProviders.tsx` підключає Redux і Toaster.
4. `src/app/App.tsx`:
   - запускає preloader
   - ініціалізує Telegram runtime (`ready`, `expand`, optional `fullscreen`)
   - зберігає Telegram meta у Redux
   - рендерить router і глобальний `ModalHost`

## Маршрути

Налаштовані в `src/app/router/routes.tsx`:

- `/` -> `MainPage`
- `/error` -> `ErrorPage`
- `*` -> `NotFoundPage`

## Модель стану (Redux)

`ui` slice (`src/store/ui/slice.ts`):

- `isAppReady`
- `isBaseModalOpen`
- `isSlideUpModalOpen`

`data` slice (`src/store/data/slice.ts`):

- `language` (`en | uk`)
- `telegramMeta`:
  - `isTelegram`
  - `isReady`
  - `isExpanded`
  - `isFullscreen`
  - `platform`

Typed hooks:

- `useAppDispatch`
- `useAppSelector`

## Telegram-шар

`src/helpers/telegram.ts` надає базові wrapper-методи:

- `getTelegramWebApp`
- `isTelegramMiniApp`
- `tgReady`
- `tgExpand`
- `tgRequestFullscreen`
- `tgHapticImpact`
- `tgHapticNotification`
- `tgOpenLink`
- `tgOpenTelegramLink`
- `initTelegramMiniApp`

### Сумісність fullscreen

`requestFullscreen` захищений:

- вимикається env-прапором
- перевіряється на наявність методу
- вимагає версію WebApp `>= 8.0`
- обгорнутий у `try/catch`, щоб старі Telegram-клієнти не валили застосунок

## Модальний патерн

Starter має тільки базовий modal layer:

- `BaseModal` (центрований)
- `SlideUpModal` (bottom-sheet стиль)
- `ModalHost` (глобальна композиція модалок)

Предметні модалки (wallet/deposit/withdraw) додаються поверх цієї бази на наступному етапі.

## API-шар

- `src/api/client.ts` -> спільний `axios.create(...)`
- `src/api/requests/*` -> модулі запитів (`auth`, `user`, `telegram`)

Правило:

- `api/client.ts` тримає лише інфраструктуру
- `api/requests/` тримає endpoint-логіку
- оркестрація живе у pages/components/features, а не в axios-конфігу

## i18n

- init: `src/helpers/i18n.ts`
- локалі:
  - `src/assets/locales/en/translation.json`
  - `src/assets/locales/uk/translation.json`

Порядок визначення мови:

1. `localStorage`
2. `navigator`

Підтримувані мови: `en`, `uk`.

## Стилі та UI

- глобальні стилі: `src/app/styles/globals.css`
- дизайн-токени через CSS variables
- light/dark тема через `useTheme`
- базові UI primitives у `src/components/ui`

## Скрипти

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Змінні середовища

Створи `.env` з `.env.example`:

```bash
cp .env.example .env
```

| Змінна | Обов'язкова | Значення за замовчуванням | Опис |
|---|---|---|---|
| `VITE_API_BASE_URL` | так | `/api` | Base URL для axios client |
| `VITE_TG_ENABLE_FULLSCREEN` | ні | `true` | Увімкнути/вимкнути fullscreen на старті |
| `VITE_TON_MANIFEST_URL` | ні | `${origin}/ton-connect-manifest.json` | Резерв під TonConnect інтеграцію |

## Швидкий старт

```bash
npm install
cp .env.example .env
npm run dev
```

## Як розширювати

### Додати новий API-запит

1. Створи файл у `src/api/requests/`.
2. Використовуй `apiClient` з `src/api/client.ts`.
3. Експортуй через `src/api/requests/index.ts`.

### Додати нову route-сторінку

1. Створи сторінку в `src/pages/<Feature>/`.
2. Додай route object у `src/app/router/routes.tsx`.
3. Тримай page-level оркестрацію в самій сторінці.

### Додати нову модалку

1. Будуй її на базі `BaseModal` або `SlideUpModal`.
2. Додай open/close state у `store/ui/slice.ts`.
3. Підключи у `ModalHost`.

### Додати новий ключ локалізації

1. Онови обидва файли `en/translation.json` і `uk/translation.json`.
2. Використовуй `t("...")` у компоненті.

## Non-Goals (свідомо не включено)

У starter навмисно **немає**:

- готового auth flow
- бізнесових/доменних екранів
- важких data-оркестраторів за замовчуванням
- websocket-шару
- предметної Telegram-логіки (payments/referrals/game)

База готова, доменні модулі нашаровуються окремо.

## Quality Gates

Перед кожним комітом:

```bash
npm run lint
npm run build
```

Якщо обидві перевірки пройшли, starter-база в здоровому стані.
