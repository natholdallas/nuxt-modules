<script setup lang="ts">
import type { HtmlHTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false,
})
defineProps<{
  name?: string
  label?: string
  value: any
  triggerClass?: HtmlHTMLAttributes['class']
}>()

const model = defineModel<any>()
</script>

<template>
  <UixField v-slot="{ component }" :name="name" :label="label">
    <UiSelect v-model="model">
      <UiSelectTrigger :class="triggerClass">
        <UiSelectValue>{{ value }}</UiSelectValue>
      </UiSelectTrigger>
      <UiSelectContent :class="$attrs.class">
        <slot :component="component" />
      </UiSelectContent>
    </UiSelect>
  </UixField>
</template>
