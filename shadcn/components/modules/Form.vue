<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  loading: boolean
  text?: string
  schema?: Record<string, any>
}>()
defineEmits<{
  (e: 'submit'): void
}>()

const error = ref('')
const model = defineModel<Record<string, any>>()
</script>

<template>
  <VForm v-model="model" @submit="$emit('submit')" :validationSchema="schema" class="space-y-4">
    <VAlert v-if="error" variant="destructive" class="mb-4">
      <VAlertDescription>{{ error }}</VAlertDescription>
    </VAlert>
    <slot />
    <VButton :disabled="loading" class="w-full" type="submit">
      {{ text || $t('submit') }}
    </VButton>
  </VForm>
</template>
