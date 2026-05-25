<script setup lang="ts">
defineProps<{
  item: any
}>()
defineEmits<{
  (e: 'expanded', item: any): boolean
  (e: 'toggle', item: any): void
}>()
</script>
<template>
  <VxActionBtn
    @click="$emit('toggle', item)"
    :icon="$emit('expanded', item) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
    density="comfortable"
    class="text-none"
    color="medium-emphasis"
    variant="text"
    size="small"
    slim
  />
</template>
