<script setup lang="ts">
defineProps<{
  loading: boolean
  text?: string
  schema?: Record<string, any>
  model?: Record<string, any>
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
    <!-- <VAlert v-if="error" variant="destructive" class="mb-4"> -->
    <!--   <VAlertDescription>{{ error }}</VAlertDescription> -->
    <!-- </VAlert> -->
    <slot />
    <slot name="actions">
      <UiButton :disabled="loading" class="mt-auto w-full" type="submit">
        {{ text || $t('submit') }}
      </UiButton>
    </slot>
  </UiForm>
</template>
