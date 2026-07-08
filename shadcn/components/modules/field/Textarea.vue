<script setup lang="ts">
defineProps<{
  name?: string
  label?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <UixField v-slot="{ component }" :name="name" :label="label">
    <UiTextarea v-bind="component" v-model="model" />
  </UixField>
</template>
