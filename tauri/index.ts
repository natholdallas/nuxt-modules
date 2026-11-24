import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@natholdallas/tauri',
  },

  // Tauri shell integration. Everything here is build-time wiring for the
  // `src-tauri/` crate that each app carries:
  // - the Rust crate and its target dir must never be picked up by Nuxt/Vite
  // - `TAURI_ENV_*`/`TAURI_DEV_HOST` must reach the client bundle and the dev
  //   server host so a device on the LAN can load the HMR client
  // - `strictPort` keeps `devUrl` in tauri.conf.json honest: Nuxt must fail
  //   instead of drifting to :3001 while the shell still points at :3000
  // It must NOT assign runtimeConfig: module setup runs after the app's
  // nuxt.config.ts, so doing so would silently override the app.
  setup(_options, nuxt) {
    nuxt.options.ignore.push('**/src-tauri/**')
    nuxt.options.vite.clearScreen = false
    nuxt.options.vite.envPrefix = [...(nuxt.options.vite.envPrefix ?? []), 'TAURI_']
    nuxt.options.vite.server ??= {}
    nuxt.options.vite.server.strictPort = true
    if (process.env.TAURI_DEV_HOST) {
      nuxt.options.devServer.host = process.env.TAURI_DEV_HOST
    }
  },
})
