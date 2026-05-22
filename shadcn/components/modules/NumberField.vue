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
  <VFormField v-slot="{ componentField }" :name="name">
    <VFormItem>
      <VFormLabel>{{ label }}</VFormLabel>
      <VFormControl>
        <VNumberField
          v-bind="componentField"
          v-model="model"
          :default-value="defaultValue"
          :min="min"
          :max="max"
          :placeholder="placeholder"
        >
          <VNumberFieldContent>
            <VNumberFieldDecrement />
            <VNumberFieldInput />
            <VNumberFieldIncrement />
          </VNumberFieldContent>
        </VNumberField>
      </VFormControl>
      <VFormMessage />
    </VFormItem>
  </VFormField>
</template>
