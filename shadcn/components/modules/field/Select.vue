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
  <UiFormField v-if="name" v-slot="{ componentField }" :name="name">
    <UiFormItem>
      <UiFormLabel v-if="label">{{ label }}</UiFormLabel>
      <UiFormControl>
        <UiSelect v-bind="componentField" v-model="model">
          <UiSelectTrigger :class="triggerClass">
            <UiSelectValue>{{ value }}</UiSelectValue>
          </UiSelectTrigger>
          <UiSelectContent :class="$attrs.class">
            <slot />
          </UiSelectContent>
        </UiSelect>
      </UiFormControl>
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
  <UiSelect v-else v-model="model">
    <UiSelectTrigger>
      <UiSelectValue>{{ value }}</UiSelectValue>
    </UiSelectTrigger>
    <UiSelectContent>
      <slot />
    </UiSelectContent>
  </UiSelect>
</template>
