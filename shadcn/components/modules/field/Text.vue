<script setup lang="ts">
defineProps<{
  name?: string
  label?: string
  placeholder?: string
  type?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <UiFormField v-if="name" v-slot="{ componentField }" :name="name">
    <UiFormItem>
      <UiFormLabel v-if="label">{{ label }}</UiFormLabel>
      <UiFormControl>
        <UiInput v-bind="componentField" v-model="model" :placeholder="placeholder" :type="type" />
      </UiFormControl>
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
  <UiInput v-else v-model="model" :placeholder="placeholder" :type="type" />
</template>
