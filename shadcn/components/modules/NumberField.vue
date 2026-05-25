<script setup lang="ts">
defineProps<{
  name: string
  label: string
  placeholder?: string
  type?: string
  defaultValue?: number
  min?: number
  max?: number
}>()

const model = defineModel<number>()
</script>

<template>
  <UiFormField v-slot="{ componentField }" :name="name">
    <UiFormItem>
      <UiFormLabel>{{ label }}</UiFormLabel>
      <UiFormControl>
        <UiNumberField
          v-bind="componentField"
          v-model="model"
          :default-value="defaultValue"
          :min="min"
          :max="max"
          :placeholder="placeholder"
        >
          <UiNumberFieldContent>
            <UiNumberFieldDecrement />
            <UiNumberFieldInput />
            <UiNumberFieldIncrement />
          </UiNumberFieldContent>
        </UiNumberField>
      </UiFormControl>
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
</template>
