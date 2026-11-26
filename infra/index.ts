import type { ModuleOptions as NuxtIconOptions } from '@nuxt/icon'
import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { ModuleOptions as PwaModuleOptions } from '@vite-pwa/nuxt'
import type { ModuleOptions as DayjsOptions } from 'dayjs-nuxt'
import { defu } from 'defu'
import type { ModuleOptions as NuxtOgImageOptions } from 'nuxt-og-image'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/infra',
  },

  moduleDependencies: {
    '@nuxt/eslint': {},
    '@nuxt/test-utils': {},
    '@nuxtjs/seo': {},
    '@nuxtjs/device': {},
    '@vueuse/nuxt': {},

    'dayjs-nuxt': {
      defaults: <Partial<DayjsOptions>>{
        locales: ['en', 'zh-cn'],
        plugins: ['relativeTime', 'utc', 'timezone', 'quarterOfYear'],
        defaultLocale: 'zh-cn',
        defaultTimezone: 'Asia/Shanghai',
      },
    },
    'nuxt-og-image': {
      defaults: <Partial<NuxtOgImageOptions>>{
        enabled: false,
      },
    },
    '@nuxt/icon': {
      defaults: <Partial<NuxtIconOptions>>{
        mode: 'svg',
        provider: 'server',
      },
    },
    '@vite-pwa/nuxt': {
      defaults: <Partial<PwaModuleOptions>>{
        registerType: 'autoUpdate',
        manifest: {
          name: 'App',
          short_name: 'App',
          theme_color: '#141414',
          description: 'App',
          // Reference the favicon that every app actually ships. The previous
          // `icon.png` did not exist in any app's public/ directory, so the
          // manifest pointed at a 404 once PWA was enabled.
          icons: [
            {
              src: 'favicon.ico',
              sizes: '64x64 32x32 24x24 16x16',
              type: 'image/x-icon',
            },
          ],
          display: 'standalone',
        },
        registerWebManifestInRouteRules: true,
        devOptions: {
          enabled: false,
          type: 'module',
        },
      },
    },
  },

  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.experimental.typedPages = true
    nuxt.options.future.compatibilityVersion = 4
    nuxt.options.experimental.viteEnvironmentApi = true
    // Do NOT hard-code runtimeConfig.public.apiBase here. Module setup runs after
    // the app's nuxt.config.ts, so assigning it would silently override an app
    // that sets its own value. Nuxt already resolves NUXT_PUBLIC_API_BASE from
    // the environment; main.sh derives it from domains[]/app_env at build time.
    // Bundle analysis is opt-in: it slows every build and emits nothing unless
    // the app actually inspects the report.
    nuxt.options.build.analyze = process.env.ANALYZE === 'true'
    nuxt.options.vite.build = defu(nuxt.options.vite.build, {
      // Rolldown's bundlerTimings check (Vite 8 default) prints a PLUGIN_TIMINGS
      // block on every build. With `experimental.viteEnvironmentApi` the client
      // and SSR builds run concurrently, and `nuxt:ssr-styles` starts its SSR
      // load hook by awaiting `nuxt._clientBuild` — rolldown counts that await as
      // plugin time, so the whole client build is attributed to a single wait and
      // the report is never actionable. Keep the build, drop the log.
      rolldownOptions: {
        checks: { bundlerTimings: false },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    })

    addComponentsDir({
      path: resolver.resolve('./components'),
    })

    addImportsDir([resolver.resolve('./lib'), resolver.resolve('./composables')])
  },
})
