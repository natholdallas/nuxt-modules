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
  <VSelect :model-value="value" @update:model-value="(v: any) => $emit('update', v)">
    <VSelectTrigger class="w-30">
      <VSelectValue>{{ value }}</VSelectValue>
    </VSelectTrigger>
    <VSelectContent>
      <VSelectItem v-for="item in options" :key="item.key" :value="item.value">
        {{ item.label }}
      </VSelectItem>
    </VSelectContent>
  </VSelect>
</template>
