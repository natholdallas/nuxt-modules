<script setup lang="ts">
import { clearError, useError } from '#app'

const { t } = useI18n()
const error = useError()
const statusCode = error.value?.status
const conf = useConf()

interface ErrorInfo {
  icon: string
  code: string
  title: string
  text: string
  tone: 'danger' | 'warning' | 'info'
}

const info = computed<ErrorInfo>(() => {
  switch (statusCode) {
    case 401:
      return {
        icon: 'mdi-lock-question',
        code: '401',
        title: t('error.401.title'),
        text: t('error.401.desc'),
        tone: 'warning',
      }
    case 403:
      return {
        icon: 'mdi-shield-lock-outline',
        code: '403',
        title: t('error.403.title'),
        text: t('error.403.desc'),
        tone: 'warning',
      }
    case 404:
      return {
        icon: 'mdi-file-question-outline',
        code: '404',
        title: t('error.404.title'),
        text: t('error.404.desc'),
        tone: 'info',
      }
    case 500:
      return {
        icon: 'mdi-server-crash',
        code: '500',
        title: t('error.500.title'),
        text: t('error.500.desc'),
        tone: 'danger',
      }
    case 503:
      return {
        icon: 'mdi-server-off',
        code: '503',
        title: t('error.503.title'),
        text: t('error.503.desc'),
        tone: 'danger',
      }
    default:
      return {
        icon: 'mdi-alert-octagon-outline',
        code: statusCode ? String(statusCode) : '',
        title: t('error.title'),
        text: t('error.desc'),
        tone: 'danger',
      }
  }
})

const tones = {
  danger: {
    tile: 'bg-error/10 text-error',
    bar: 'bg-error',
    glow: 'bg-error/25',
  },
  warning: {
    tile: 'bg-warning/10 text-warning',
    bar: 'bg-warning',
    glow: 'bg-warning/25',
  },
  info: {
    tile: 'bg-info/10 text-info',
    bar: 'bg-info',
    glow: 'bg-info/25',
  },
}

const tone = computed(() => tones[info.value.tone])

const goHome = () => clearError({ redirect: '/' })
const reload = () => window.location.reload()
</script>

<template>
  <VApp :theme="conf.theme">
    <div class="fixed inset-0 bg-background text-on-surface">
      <div class="relative flex min-h-full items-center justify-center p-4 sm:p-6">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0">
          <div
            class="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
          />
          <div class="absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div class="absolute -bottom-24 -left-24 size-64 rounded-full bg-error/10 blur-3xl" />
        </div>

        <VCard class="relative w-full max-w-md overflow-hidden" :elevation="3" rounded="xl">
          <div class="absolute inset-x-0 top-0 h-1" :class="tone.bar" />

          <div class="flex flex-col items-center gap-5 px-6 py-12 text-center sm:px-10">
            <div class="relative">
              <div class="absolute -inset-3 rounded-full blur-xl" :class="tone.glow" />
              <div
                class="relative flex size-20 items-center justify-center rounded-2xl"
                :class="tone.tile"
              >
                <VIcon :icon="info.icon" size="40" />
              </div>
            </div>

            <div class="flex flex-col items-center gap-2">
              <p class="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
                {{ $t('error.sorry') }}
              </p>
              <h1
                v-if="info.code"
                class="bg-gradient-to-b from-on-surface to-on-surface/50 bg-clip-text text-6xl font-black leading-none tracking-tight text-transparent sm:text-7xl py-4"
              >
                {{ info.code }}
              </h1>
              <p class="text-xl font-bold">{{ info.title }}</p>
              <p class="mx-auto max-w-sm text-sm leading-relaxed opacity-70">{{ info.text }}</p>
            </div>

            <div class="mt-1 flex w-full flex-col gap-3 sm:flex-row">
              <VBtn
                color="primary"
                size="x-large"
                class="w-full sm:flex-1"
                prepend-icon="mdi-home"
                @click="goHome"
              >
                {{ $t('error.back.home') }}
              </VBtn>
              <VBtn
                variant="tonal"
                size="x-large"
                class="w-full sm:flex-1"
                prepend-icon="mdi-refresh"
                @click="reload"
              >
                {{ $t('error.reload') }}
              </VBtn>
            </div>
          </div>
        </VCard>
      </div>
    </div>
  </VApp>
</template>
