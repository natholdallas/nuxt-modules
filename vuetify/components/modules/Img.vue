<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
  cover?: boolean
  width?: any
  height?: any
  rounded?: boolean
}>()
</script>

<template>
  <VImg
    @click="$emit('click')"
    :src="src"
    :cover="cover"
    :width="width"
    :height="height"
    :alt="alt || src"
    :rounded="rounded"
    lazy-load
  >
    <template #placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <VProgressCircular color="grey-lighten-4" indeterminate />
      </div>
    </template>
  </VImg>
</template>
