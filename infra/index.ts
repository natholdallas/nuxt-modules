import type { ModuleOptions as NuxtIconOptions } from '@nuxt/icon'
import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { ModuleOptions as DayjsOptions } from 'dayjs-nuxt'
import type { ModuleOptions as NuxtOgImageOptions } from 'nuxt-og-image'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/infra',
  },

  moduleDependencies: {
    '@nuxt/fonts': {},
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
  },

  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.experimental.typedPages = true
    nuxt.options.future.compatibilityVersion = 4
    nuxt.options.runtimeConfig.public.apiBase = ''
    nuxt.options.build.analyze = true

    addImportsDir([resolver.resolve('./lib'), resolver.resolve('./composables')])
  },
})
