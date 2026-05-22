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
  <VFormField v-slot="{ componentField }" :name="name">
    <VFormItem>
      <VFormLabel>{{ label }}</VFormLabel>
      <VFormControl>
        <VSelect v-bind="componentField" v-model="model">
          <VSelectTrigger class="w-full">
            <VSelectValue>{{ value }}</VSelectValue>
          </VSelectTrigger>
          <VSelectContent>
            <slot />
          </VSelectContent>
        </VSelect>
      </VFormControl>
      <VFormMessage />
    </VFormItem>
  </VFormField>
</template>
