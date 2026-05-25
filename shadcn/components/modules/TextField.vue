<script setup lang="ts">
defineProps<{
  name: string
  label: string
  placeholder?: string
  type?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <UiFormField v-slot="{ componentField }" :name="name">
    <UiFormItem>
      <UiFormLabel>{{ label }}</UiFormLabel>
      <UiFormControl>
        <UiInput v-bind="componentField" v-model="model" :placeholder="placeholder" :type="type" />
      </UiFormControl>
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
</template>
