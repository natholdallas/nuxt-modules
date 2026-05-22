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
  <VFormField v-slot="{ componentField }" :name="name">
    <VFormItem>
      <VFormLabel>{{ label }}</VFormLabel>
      <VFormControl>
        <VInput v-bind="componentField" v-model="model" :placeholder="placeholder" :type="type" />
      </VFormControl>
      <VFormMessage />
    </VFormItem>
  </VFormField>
</template>
