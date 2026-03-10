const origin = typeof window === 'undefined' ? '' : window.location.origin

export const APP_ENV = {
  appName: 'TG Mini App Starter',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  tonManifestUrl:
    import.meta.env.VITE_TON_MANIFEST_URL ?? `${origin}/ton-connect-manifest.json`,
  enableFullscreen: (import.meta.env.VITE_TG_ENABLE_FULLSCREEN ?? 'true') === 'true',
} as const
