<script setup lang="ts">
defineProps<{
  loading: boolean
  text?: string
  schema?: Record<string, any>
  model?: Record<string, any>
  error?: string
}>()
defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <UiForm
    @submit="$emit('submit')"
    :validationSchema="schema"
    :initial-values="model"
    class="flex flex-col gap-4"
  >
    <UiAlert v-if="error" variant="destructive" class="mb-0">
      <UiAlertDescription>{{ error }}</UiAlertDescription>
    </UiAlert>
    <slot />
    <slot name="actions">
      <UiButton :disabled="loading" class="mt-auto w-full" type="submit">
        {{ text || $t('submit') }}
      </UiButton>
    </slot>
  </UiForm>
</template>
