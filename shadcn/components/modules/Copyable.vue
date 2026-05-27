<script setup lang="ts">
import copy from 'copy-to-clipboard'
import { toast } from 'vue-sonner'

defineProps<{
  text?: any
}>()

async function onCopy(text: string) {
  if (text) {
    const ok = await copy(text)
    if (ok) {
      toast.success($t('copied.success'))
    } else {
      toast.error($t('copied.failed'))
    }
  } else {
    toast.warning($t('copied.warning'))
  }
}
</script>

<template>
  <UiButton class="px-1" variant="ghost" @click="onCopy(text)">
    <slot>
      <span>{{ text }}</span>
    </slot>
  </UiButton>
</template>
