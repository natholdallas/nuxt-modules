<script setup lang="ts">
defineProps<{
  name: string
  label: string
  placeholder?: string
  type?: string
  value: string
}>()

const model = defineModel<string>()
</script>

<template>
  <UiFormField v-slot="{ componentField }" :name="name">
    <UiFormItem>
      <UiFormLabel>{{ label }}</UiFormLabel>
      <UiFormControl>
        <UiSelect v-bind="componentField" v-model="model">
          <UiSelectTrigger class="w-full">
            <UiSelectValue>{{ value }}</UiSelectValue>
          </UiSelectTrigger>
          <UiSelectContent>
            <slot />
          </UiSelectContent>
        </UiSelect>
      </UiFormControl>
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
</template>
