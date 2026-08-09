<script setup lang="ts">
defineProps<{
  alt?: string
  crossorigin?: 'anonymous' | 'use-credentials' | ''
  decoding?: 'async' | 'auto' | 'sync'
  fetchpriority?: 'high' | 'low'
  height?: number | string
  loading?: 'eager' | 'lazy'
  referrerpolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  sizes?: string
  src: string
  srcset?: string
  usemap?: string
  width?: number | string
}>()

const loaded = ref(true)
</script>

<template>
  <img
    v-show="loaded"
    @error="loaded = false"
    :alt="alt"
    :crossorigin="crossorigin"
    :decoding="decoding"
    :fetchpriority="fetchpriority"
    :height="height"
    :loading="loading"
    :referrerpolicy="referrerpolicy"
    :sizes="sizes"
    :src="src"
    :srcset="srcset"
    :usemap="usemap"
    :width="width"
  />
</template>
