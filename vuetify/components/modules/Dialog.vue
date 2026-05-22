<script setup lang="ts">
defineProps<{
  title?: string
  content?: string
  maxWidth?: string | number
}>()
defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const show = defineModel<boolean>()
</script>

<template>
  <VDialog v-model="show" :max-width="maxWidth || 500">
    <VCard :title="title || $t('dialog')">
      <VCardText class="whitespace-pre-wrap">{{ content || $t('dialog.desc') }} </VCardText>
      <VCardActions>
        <VBtn @click="($emit('cancel'), (show = false))" :text="$t('cancel')" />
        <VBtn @click="($emit('confirm'), (show = false))" :text="$t('confirm')" />
      </VCardActions>
    </VCard>
  </VDialog>
</template>
