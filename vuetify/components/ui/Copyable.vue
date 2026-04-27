<script setup lang="ts">
import copy from 'copy-to-clipboard'

defineProps<{
  text?: any
}>()
</script>

<template>
  <div v-if="text" class="flex items-center">
    <VBtn
      class="text-none"
      @click="
        () => {
          if (text) copy(text)
          useSnackBar().success()
        }
      "
      :text="text"
      density="comfortable"
      variant="text"
      slim
      flat
      rounded
    />
  </div>
</template>
