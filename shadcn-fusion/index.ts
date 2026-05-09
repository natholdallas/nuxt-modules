import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/shadcn-fusion',
  },

  moduleDependencies: {
    '@natholdallas/shadcn': {},
  },

  setup() {
    const resolver = createResolver(import.meta.url)

    addComponentsDir({
      path: resolver.resolve('./components'),
      prefix: 'V',
      extensions: ['vue'],
    })
  },
})
