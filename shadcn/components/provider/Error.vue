<script setup lang="ts">
import { clearError, useError } from '#app'
import {
  House,
  KeyRound,
  OctagonAlert,
  RefreshCw,
  SearchX,
  ServerCrash,
  ServerOff,
  ShieldBan,
} from '@lucide/vue'
import type { Component } from 'vue'

const { t } = useI18n()
const error = useError()
const statusCode = error.value?.status

interface ErrorInfo {
  icon: Component
  code: string
  title: string
  desc: string
  tone: 'danger' | 'warning' | 'info'
}

const info = computed<ErrorInfo>(() => {
  switch (statusCode) {
    case 401:
      return {
        icon: KeyRound,
        code: '401',
        title: t('error.401.title'),
        desc: t('error.401.desc'),
        tone: 'warning',
      }
    case 403:
      return {
        icon: ShieldBan,
        code: '403',
        title: t('error.403.title'),
        desc: t('error.403.desc'),
        tone: 'warning',
      }
    case 404:
      return {
        icon: SearchX,
        code: '404',
        title: t('error.404.title'),
        desc: t('error.404.desc'),
        tone: 'info',
      }
    case 500:
      return {
        icon: ServerCrash,
        code: '500',
        title: t('error.500.title'),
        desc: t('error.500.desc'),
        tone: 'danger',
      }
    case 503:
      return {
        icon: ServerOff,
        code: '503',
        title: t('error.503.title'),
        desc: t('error.503.desc'),
        tone: 'danger',
      }
    default:
      return {
        icon: OctagonAlert,
        code: statusCode ? String(statusCode) : '',
        title: t('error.title'),
        desc: t('error.desc'),
        tone: 'danger',
      }
  }
})

const tones = {
  danger: {
    tile: 'bg-destructive/10 text-destructive ring-destructive/20',
    bar: 'bg-destructive',
    glow: 'bg-destructive/25',
  },
  warning: {
    tile: 'bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30',
    bar: 'bg-amber-500',
    glow: 'bg-amber-500/25',
  },
  info: {
    tile: 'bg-sky-500/10 text-sky-600 ring-sky-500/20 dark:text-sky-400 dark:ring-sky-500/30',
    bar: 'bg-sky-500',
    glow: 'bg-sky-500/25',
  },
}

const tone = computed(() => tones[info.value.tone])

const goHome = () => clearError({ redirect: '/' })
const reload = () => window.location.reload()
</script>

<template>
  <div class="fixed inset-0 bg-background">
    <div class="relative flex min-h-full items-center justify-center p-4 sm:p-6">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div
          class="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
        />
        <div class="absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div class="absolute -bottom-24 -left-24 size-64 rounded-full bg-destructive/10 blur-3xl" />
      </div>

      <UiCard
        class="relative w-full max-w-md overflow-hidden shadow-xl shadow-primary/5 transition-transform duration-300 hover:-translate-y-1"
      >
        <div class="absolute inset-x-0 top-0 h-1" :class="tone.bar" />

        <UiCardContent class="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-10">
          <div class="relative">
            <div class="absolute -inset-3 rounded-full blur-xl" :class="tone.glow" />
            <div
              class="relative flex size-20 items-center justify-center rounded-2xl ring-1"
              :class="tone.tile"
            >
              <component :is="info.icon" class="size-10" />
            </div>
          </div>

          <div class="flex flex-col items-center gap-2">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {{ $t('error.sorry') }}
            </p>
            <h1
              v-if="info.code"
              class="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-6xl font-black leading-none tracking-tight text-transparent sm:text-7xl py-4"
            >
              {{ info.code }}
            </h1>
            <p class="text-xl font-semibold">{{ info.title }}</p>
            <p class="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
              {{ info.desc }}
            </p>
          </div>
        </UiCardContent>

        <UiCardFooter class="px-6 pb-6 sm:px-10 sm:pb-8">
          <div class="flex w-full flex-col gap-2 sm:flex-row">
            <UiButton class="w-full gap-2 sm:flex-1" @click="goHome">
              <House class="size-4" />
              {{ $t('error.back.home') }}
            </UiButton>
            <UiButton variant="outline" class="w-full gap-2 sm:flex-1" @click="reload">
              <RefreshCw class="size-4" />
              {{ $t('error.reload') }}
            </UiButton>
          </div>
        </UiCardFooter>
      </UiCard>
    </div>
  </div>
</template>
