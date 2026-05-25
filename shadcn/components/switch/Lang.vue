<script setup lang="ts">
defineProps<{
  options: { key: any; value: any; label: any }[]
  value: any
}>()
defineEmits<{
  (e: 'update', value: any): void
}>()
</script>

<template>
  <UiSelect :model-value="value" @update:model-value="(v: any) => $emit('update', v)">
    <UiSelectTrigger class="w-30">
      <UiSelectValue>{{ value }}</UiSelectValue>
    </UiSelectTrigger>
    <UiSelectContent>
      <UiSelectItem v-for="item in options" :key="item.key" :value="item.value">
        {{ item.label }}
      </UiSelectItem>
    </UiSelectContent>
  </UiSelect>
</template>
