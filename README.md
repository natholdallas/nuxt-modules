# @natholdallas/nuxt-modules

Optional, shared Nuxt modules used by the web-template scaffold. Each directory is
an independent Nuxt module that an app opts into by listing it in
`nuxt.config.ts` `modules` and declaring it as a `@natholdallas/*` `workspace:*`
dependency.

## Packages

| Package                     | Wraps                                            | Purpose                                                      |
| :-------------------------- | :----------------------------------------------- | :----------------------------------------------------------- |
| `@natholdallas/alova`       | `alova`                                          | Runtime auto-imports (`useRequest`, …) for the generated SDK |
| `@natholdallas/i18n`        | `@nuxtjs/i18n`                                   | Shared base translation keys in `locale/*.ts`                |
| `@natholdallas/infra`       | `@nuxtjs/seo`, `@nuxt/icon`, `@vite-pwa/nuxt`, … | Common infrastructure bundle + shared composables            |
| `@natholdallas/pinia`       | `@pinia/nuxt`                                    | Pinia stores                                                 |
| `@natholdallas/shadcn`      | `shadcn-nuxt` + Tailwind v4                      | `Uix`-prefixed module components (usr app)                   |
| `@natholdallas/tailwindcss` | `@tailwindcss/vite`                              | Standalone Tailwind v4 wiring                                |
| `@natholdallas/tauri`       | `@tauri-apps/api`                                | Desktop client integration                                   |
| `@natholdallas/unocss`      | `@unocss/nuxt`                                   | Optional UnoCSS setup                                        |
| `@natholdallas/vuetify`     | `vuetify-nuxt-module`                            | `Vx`-prefixed module components (adm app)                    |
| `@natholdallas/watermark`   | —                                                | `Watermark` component                                        |

## Rules

- **Runtime config is the app's decision.** Modules must not assign
  `runtimeConfig.public.*` defaults; module setup runs after `nuxt.config.ts` and
  would silently override the app. `apiBase` in particular is derived by the
  consuming project's `main.sh` from `domains[]`/`app_env`.
- **Declare what you import.** A module's `dependencies` must cover everything its
  own `index.ts`/`components/` import. Packages used only by app-level components
  belong in the app, never in a module (that is how phantom dependencies start).
- **Costs are opt-in.** Expensive build features (bundle analysis, prefetching)
  must be behind an env flag, not always on.

## Development

```bash
# from a consuming project
pnpm install
pnpm -F <app> typecheck
pnpm -F <app> generate

# verify this repo on its own
pnpm exec prettier --check .
```

This repository is consumed as a git submodule, so changes are committed here and
the consuming project then bumps the submodule pointer.
