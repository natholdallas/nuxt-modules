import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'
import { defu } from 'defu'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/shadcn',
  },

  moduleDependencies: {
    '@natholdallas/i18n': {},
    'shadcn-nuxt': {},
  },

  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.vite = defu(nuxt.options.vite, {
      plugins: [tailwindcss()],
    })

    addComponentsDir({
      path: resolver.resolve('./components/modules'),
      prefix: 'Uix',
    })
    addComponentsDir({
      path: resolver.resolve('./components'),
    })
  },
})
