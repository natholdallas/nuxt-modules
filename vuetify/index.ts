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
          styles: 'sass',
        },
        vuetifyOptions: {
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
  },

  setup() {
    const resolver = createResolver(import.meta.url)

    addComponentsDir({
      path: resolver.resolve('./components/ui'),
      prefix: 'N',
    })
    addComponentsDir({
      path: resolver.resolve('./components'),
    })

    addImportsDir([resolver.resolve('./composables'), resolver.resolve('./lib')])
  },
})
