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
  <VDialog v-model:open="open" modal>
    <VDialogContent>
      <VDialogTitle v-show="!!title">{{ title }}</VDialogTitle>
      <VDialogDescription v-show="!!description">{{ description }}</VDialogDescription>
      <div>
        <slot />
      </div>
      <VDialogFooter v-if="!noFooter">
        <VButton v-if="!noCancel" @click="$emit('cancel')" :disabled="loading" variant="secondary">
          {{ $t('cancel') }}
        </VButton>
        <VButton v-if="!noConfirm" @click="$emit('confirm')" :disabled="loading" variant="default">
          <VSpinner v-if="loading" class="animate-spin" />
          {{ $t('confirm') }}
        </VButton>
      </VDialogFooter>
    </VDialogContent>
  </VDialog>
</template>
