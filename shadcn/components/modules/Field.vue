<script setup lang="ts">
import type { ComponentFieldBindingObject } from 'vee-validate'

defineOptions({
  inheritAttrs: false,
})
defineProps<{
  name?: string
  label?: string
}>()
</script>

<template>
  <UiFormField v-if="name" v-slot="{ componentField }" :name="name">
    <UiFormItem>
      <UiFormLabel v-if="label">{{ label }}</UiFormLabel>
      <UiFormControl>
        <div :class="$attrs.class">
          <slot :component="componentField" />
        </div>
      </UiFormControl>
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
  <slot :component="{} as ComponentFieldBindingObject<any>" v-else />
</template>
