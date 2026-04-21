<script setup lang="ts">
import type { ValidationResult } from 'vuetify/lib/composables/validation.mjs'

defineProps<{
  label?: string
  rules?: readonly (
    | string
    | boolean
    | PromiseLike<ValidationResult>
    | ((value: any) => ValidationResult)
    | ((value: any) => PromiseLike<ValidationResult>)
    | [string, any, (string | undefined)?]
  )[]
}>()

const model = defineModel<string>()
const show = ref(false)
</script>

<template>
  <VTextField
    v-model="model"
    @click:append-inner="show = !show"
    :type="show ? 'text' : 'password'"
    :append-inner-icon="show ? 'i-mdi:eye' : 'i-mdi:eye-off'"
    :label="label"
    :counter="20"
    :rules="rules"
  />
</template>
