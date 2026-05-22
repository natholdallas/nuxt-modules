<script setup lang="ts">
defineProps<{
  loading: boolean
  submitText?: string
  readonly?: boolean
}>()
defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <VForm @submit.prevent="$emit('submit')" :readonly="readonly" fast-fail>
    <slot />
    <VBtn :loading="loading" :disabled="readonly" type="submit" color="green" block>
      {{ submitText || $t('submit') }}
    </VBtn>
  </VForm>
</template>
