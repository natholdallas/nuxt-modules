import { defineNuxtModule } from '@nuxt/kit'
import type { NuxtI18nOptions } from '@nuxtjs/i18n'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/i18n',
  },

  moduleDependencies: {
    '@nuxtjs/i18n': <Partial<NuxtI18nOptions>>{},
  },

  setup() {},
})
