<script setup lang="ts">
import { snackbar } from '../../composables/snackbar'
</script>

<template>
  <VSnackbar v-model="snackbar.show" :timeout="snackbar.timeout" location="top">
    {{ snackbar.message }}
    <template #actions>
      <VBtn variant="flat" @click="snackbar.show = false" :color="snackbar.color" text="Close" />
    </template>
  </VSnackbar>
</template>
