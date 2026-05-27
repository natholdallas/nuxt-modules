<script setup lang="ts">
import copy from 'copy-to-clipboard'

defineProps<{
  text?: any
}>()

async function onCopy(text: string) {
  if (text) {
    const ok = await copy(text)
    if (ok) {
      useSnackBar().success($t('copied.success'))
    } else {
      useSnackBar().error($t('copied.failed'))
    }
  } else {
    useSnackBar().warn($t('copied.warning'))
  }
}
</script>

<template>
  <div v-if="text" class="flex items-center">
    <VBtn
      class="text-none"
      @click="onCopy(text)"
      :text="text"
      density="comfortable"
      variant="text"
      slim
      flat
      rounded
    />
  </div>
</template>
