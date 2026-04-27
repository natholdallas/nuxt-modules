import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/pinia',
  },

  moduleDependencies: {
    '@pinia/nuxt': {},
    'pinia-plugin-persistedstate/nuxt': {},
  },

  async setup() {
    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./stores'))
  },
})
