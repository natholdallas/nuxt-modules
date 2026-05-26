<script setup lang="ts">
defineProps<{
  name?: string
  label?: string
}>()

const model = defineModel<boolean>()
</script>

<template>
  <UiFormField v-if="name" v-slot="{ componentField }" :name="name">
    <UiFormItem>
      <UiFormLabel v-if="label">{{ label }}</UiFormLabel>
      <UiFormControl>
        <UiSwitch v-bind="componentField" v-model="model" />
      </UiFormControl>
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
  <UiSwitch v-else v-model="model" />
</template>
