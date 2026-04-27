import {
  presetIcons,
  presetWind4,
  defineConfig,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  rules: [],
  presets: [presetWind4(), presetIcons()],
  transformers: [transformerVariantGroup(), transformerDirectives(), transformerCompileClass()],
  theme: {},
  shortcuts: [],
})
