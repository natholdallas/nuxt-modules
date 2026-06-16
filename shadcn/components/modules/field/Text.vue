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
  <UixField v-slot="{ component }" :name="name" :label="label">
    <UiInput v-bind="component" v-model="model" :placeholder="placeholder" :type="type" />
  </UixField>
</template>
