import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { ModuleOptions as DayjsOptions } from 'dayjs-nuxt'
import type { ModuleOptions as NuxtOgImageOptions } from 'nuxt-og-image'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/infra',
  },

  moduleDependencies: {
    '@nuxtjs/seo': {},
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
    '@vueuse/nuxt': {},
  },

  setup() {
    const resolver = createResolver(import.meta.url)

    addImportsDir([resolver.resolve('./lib'), resolver.resolve('./composables')])
  },
})
