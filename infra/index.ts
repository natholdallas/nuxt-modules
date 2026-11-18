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
          icons: [
            {
              src: 'icon.png',
              sizes: '512x512',
              type: 'image/png',
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
