import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/kit',
  },

  setup() {
    const resolver = createResolver(import.meta.url)

    addImportsDir([resolver.resolve('./lib'), resolver.resolve('./composables')])
  },
})
