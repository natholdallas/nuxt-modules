<script setup lang="ts">
defineProps<{
  name?: string
  label?: string
  trueValue?: boolean
  falseValue?: boolean
}>()

const model = defineModel<boolean>()
</script>

<template>
  <UixField v-slot="{ component }" :name="name" :label="label">
    <UiSwitch v-bind="component" v-model="model" :trueValue="trueValue" :falseValue="falseValue" />
  </UixField>
</template>
