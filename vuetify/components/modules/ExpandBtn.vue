<script setup lang="ts">
defineProps<{
  item: any
  expanded?: boolean
}>()

defineEmits<{
  (e: 'toggle', item: any): void
}>()
</script>
<template>
  <VxActionBtn
    @click="$emit('toggle', item)"
    :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
    density="comfortable"
    class="text-none"
    color="medium-emphasis"
    variant="text"
    size="small"
    slim
  />
</template>
