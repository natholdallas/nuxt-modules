<script setup lang="ts">
defineProps<{
  options: any
  value: any
}>()
defineEmits<{
  (e: 'update', value: any): void
}>()
</script>

<template>
  <UiSelect :model-value="options" @update:model-value="(v: any) => $emit('update', v)">
    <UiSelectTrigger class="w-30">
      <UiSelectValue>{{ value }}</UiSelectValue>
    </UiSelectTrigger>
    <UiSelectContent>
      <UiSelectItem v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </UiSelectItem>
    </UiSelectContent>
  </UiSelect>
</template>
