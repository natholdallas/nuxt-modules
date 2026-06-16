<script setup lang="ts">
import type { NumberFieldRootProps } from 'reka-ui'

defineProps<{
  name?: string
  label?: string
  defaultValue?: NumberFieldRootProps['defaultValue']
  min?: NumberFieldRootProps['min']
  max?: NumberFieldRootProps['max']
  format?: NumberFieldRootProps['formatOptions']
  step?: NumberFieldRootProps['step']
}>()

const model = defineModel<number>()
</script>

<template>
  <UixField v-slot="{ component }" :name="name" :label="label">
    <UiNumberField
      v-bind="component"
      v-model="model"
      :default-value="defaultValue"
      :min="min"
      :max="max"
      :format-options="format"
      :step="step"
    >
      <UiNumberFieldContent>
        <UiNumberFieldDecrement />
        <UiNumberFieldInput />
        <UiNumberFieldIncrement />
      </UiNumberFieldContent>
    </UiNumberField>
  </UixField>
</template>
