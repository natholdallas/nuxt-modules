import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/shadcn',
  },

  moduleDependencies: {
    'shadcn-nuxt': {},
    '@natholdallas/i18n': {},
    '@natholdallas/unocss': {},
  },

  setup() {
    const resolver = createResolver(import.meta.url)

    addComponentsDir({
      path: resolver.resolve('./components/ui'),
      prefix: 'V',
    })

    addComponentsDir({
      path: resolver.resolve('./components/modules'),
      prefix: 'N',
    })

    addComponentsDir({
      path: resolver.resolve('./components'),
    })
  },
})
