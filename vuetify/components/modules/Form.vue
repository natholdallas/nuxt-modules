<script setup lang="ts">
defineProps<{
  loading: boolean
  submitText?: string
  readonly?: boolean
  error?: string
}>()
defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <VForm @submit.prevent="$emit('submit')" :readonly="readonly" fast-fail>
    <VAlert v-if="error" type="error" variant="tonal" class="mb-4">
      <slot name="error-title">{{ $t('error') }}</slot>
      <div>{{ error }}</div>
    </VAlert>
    <slot />
    <VBtn :loading="loading" :disabled="readonly" type="submit" color="green" block>
      {{ submitText || $t('submit') }}
    </VBtn>
  </VForm>
</template>
