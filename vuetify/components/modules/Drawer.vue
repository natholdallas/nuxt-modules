<script setup lang="ts">
defineProps<{
  height?: number | string
}>()

const show = defineModel<boolean>({ required: false, default: false })
</script>

<template>
  <VBottomSheet :height="height" v-model="show">
    <VCard>
      <slot></slot>
    </VCard>
  </VBottomSheet>
</template>
