import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/alova',
  },

  setup() {
    const resolver = createResolver(import.meta.url)

    addImportsDir([resolver.resolve('./lib')])
  },
})
