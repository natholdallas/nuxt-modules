<script setup lang="ts">
import type { HtmlHTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false,
})
defineProps<{
  name?: string
  label?: string
  placeholder?: string
  displayValue?: (value: any) => string
  triggerClass?: HtmlHTMLAttributes['class']
  contentClass?: HtmlHTMLAttributes['class']
}>()

const model = defineModel<any>()
</script>

<template>
  <UixField v-slot="{ component }" :name="name" :label="label">
    <UiCombobox v-model="model" open-on-click class="w-full">
      <UiComboboxAnchor class="w-full">
        <UiComboboxInput
          :display-value="displayValue"
          :placeholder="placeholder"
          :class="triggerClass"
        />
      </UiComboboxAnchor>
      <UiComboboxList :class="['w-[var(--reka-combobox-trigger-width)]', contentClass]">
        <UiComboboxEmpty>
          {{ $t('no.data') }}
        </UiComboboxEmpty>
        <UiComboboxViewport>
          <slot :component="component" />
        </UiComboboxViewport>
      </UiComboboxList>
    </UiCombobox>
  </UixField>
</template>
