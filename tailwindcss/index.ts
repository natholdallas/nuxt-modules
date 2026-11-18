import { defineNuxtModule } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'
import { defu } from 'defu'

// Tailwind v4 is CSS-first: the theme/utilities live in a stylesheet and the Vite
// plugin does the compilation. This module wires that plugin so an app only has
// to `@import 'tailwindcss'` in its CSS and can skip the manual vite setup.
export default defineNuxtModule({
  meta: {
    name: '@natholdallas/tailwindcss',
  },

  setup(_options, nuxt) {
    nuxt.options.vite = defu(nuxt.options.vite, {
      plugins: [tailwindcss()],
    })
  },
})
