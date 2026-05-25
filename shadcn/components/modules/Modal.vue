<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  loading?: boolean
  noFooter?: boolean
  noCancel?: boolean
  noConfirm?: boolean
}>()
defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <UiDialog v-model:open="open" modal>
    <UiDialogContent>
      <UiDialogTitle v-show="!!title">{{ title }}</UiDialogTitle>
      <UiDialogDescription v-show="!!description">{{ description }}</UiDialogDescription>
      <div>
        <slot />
      </div>
      <UiDialogFooter v-if="!noFooter">
        <UiButton v-if="!noCancel" @click="$emit('cancel')" :disabled="loading" variant="secondary">
          {{ $t('cancel') }}
        </UiButton>
        <UiButton v-if="!noConfirm" @click="$emit('confirm')" :disabled="loading" variant="default">
          <UiSpinner v-if="loading" class="animate-spin" />
          {{ $t('confirm') }}
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
