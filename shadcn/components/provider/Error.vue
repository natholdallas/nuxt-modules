<script setup lang="ts">
import { useError, navigateTo } from 'nuxt/app'

const error = useError()
</script>

<template>
  <div class="vhc">
    <UiCard v-if="error?.status === 404" class="border-0 shadow-none">
      <UiCardContent class="flex flex-col items-center justify-center gap-4 text-center">
        <h1 class="text-6xl font-bold">{{ error.status }}</h1>
        <p class="text-2xl font-semibold">{{ error.message }}</p>
      </UiCardContent>
      <UiCardFooter class="w-full">
        <UiButton class="w-full font-semibold" @click="navigateTo('/')">Go Back</UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
