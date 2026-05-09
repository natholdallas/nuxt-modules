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
  <VSelect :model-value="options" @update:model-value="(v: any) => $emit('update', v)">
    <VSelectTrigger class="w-30">
      <VSelectValue>{{ value }}</VSelectValue>
    </VSelectTrigger>
    <VSelectContent>
      <VSelectItem v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </VSelectItem>
    </VSelectContent>
  </VSelect>
</template>
