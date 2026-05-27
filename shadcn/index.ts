import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/shadcn',
  },

  moduleDependencies: {
    '@natholdallas/i18n': {},
    'shadcn-nuxt': {},
  },

  setup() {
    const resolver = createResolver(import.meta.url)

    addComponentsDir({
      path: resolver.resolve('./components/modules'),
      prefix: 'Uix',
    })
    addComponentsDir({
      path: resolver.resolve('./components'),
    })
  },
})
