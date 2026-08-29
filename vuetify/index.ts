import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { VuetifyModuleOptions } from 'vuetify-nuxt-module'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/vuetify',
  },

  moduleDependencies: {
    'vuetify-nuxt-module': {
      defaults: <Partial<VuetifyModuleOptions>>{
        moduleOptions: {
          styles: {
            configFile: 'assets/styles/sass/settings.scss',
            cache: true,
          },
          prefixComposables: true,
          ssrClientHints: {
            reloadOnFirstRequest: false,
            viewportSize: true,
            prefersColorScheme: true,
            prefersReducedMotion: true,
            prefersColorSchemeOptions: {
              useBrowserThemeOnly: false,
            },
          },
        },
        vuetifyOptions: {
          theme: {
            // default 'system' requires `ssr: false` to avoid hydration warnings
            defaultTheme: 'system',
            utilities: false,
          },
          display: {
            mobileBreakpoint: 'md',
            thresholds: {
              xs: 0,
              sm: 600,
              md: 960,
              lg: 1280,
              xl: 1920,
              xxl: 2560,
            },
          },
          defaults: {
            VProgressLinear: {
              role: 'progressbar',
            },
            VTextField: {
              variant: 'outlined',
              clearable: true,
              density: 'comfortable',
            },
            VTextarea: {
              variant: 'outlined',
              density: 'comfortable',
            },
            VNumberInput: {
              inset: true,
              flat: true,
              density: 'comfortable',
              variant: 'outlined',
            },
            VPagination: {
              density: 'comfortable',
            },
            VSelect: {
              density: 'comfortable',
              variant: 'outlined',
            },
            VCarousel: {
              hideDelimiterBackground: true,
              showArrows: 'hover',
            },
          },
        },
      },
    },
    '@natholdallas/i18n': {},
    '@natholdallas/infra': {},
  },

  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {}

    addComponentsDir({
      path: resolver.resolve('./components/modules'),
      prefix: 'Vx',
    })
    addComponentsDir({
      path: resolver.resolve('./components'),
    })

    addImportsDir([resolver.resolve('./composables'), resolver.resolve('./lib')])
  },
})
