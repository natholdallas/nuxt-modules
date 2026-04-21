import { addImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { NuxtI18nOptions } from '@nuxtjs/i18n'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/i18n',
  },

  moduleDependencies: {
    '@nuxtjs/i18n': <Partial<NuxtI18nOptions>>{},
  },

  setup() {
    const resolver = createResolver(import.meta.url)

    addImports([
      { from: resolver.resolve('./locale/en_us'), name: 'default', as: '$i18nPresetsEnUs' },
      { from: resolver.resolve('./locale/ja_jp'), name: 'default', as: '$i18nPresetsJaJp' },
      { from: resolver.resolve('./locale/zh_cn'), name: 'default', as: '$i18nPresetsZhCn' },
      { from: resolver.resolve('./locale/zh_tw'), name: 'default', as: '$i18nPresetsZhTw' },
    ])
  },
})
