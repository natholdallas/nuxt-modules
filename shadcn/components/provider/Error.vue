<script setup lang="ts">
import { useError, navigateTo } from 'nuxt/app'

const error = useError()
</script>

<template>
  <div class="vhc">
    <VCard v-if="error?.status === 404" class="border-0 shadow-none">
      <VCardContent class="flex flex-col items-center justify-center gap-4 text-center">
        <h1 class="text-6xl font-bold">{{ error.status }}</h1>
        <p class="text-2xl font-semibold">{{ error.message }}</p>
      </VCardContent>
      <VCardFooter class="w-full">
        <VButton class="w-full font-semibold" @click="navigateTo('/')">Go Back</VButton>
      </VCardFooter>
    </VCard>
  </div>
</template>
