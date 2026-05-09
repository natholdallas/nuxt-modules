<script setup lang="ts">
import isArray from 'lodash/isArray'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  scroll?: boolean
  loading?: boolean | boolean[]
}>()

const isLoading = computed(() =>
  isArray(props.loading) ? props.loading.some((x) => x) : props.loading,
)
</script>

<template>
  <div :class="['size-full min-h-0 flex flex-col', scroll ? 'overflow-auto' : undefined]">
    <div v-if="isLoading" class="flex flex-col items-center justify-center flex-1">
      <VSpinner />
    </div>
    <div v-else :class="$attrs.class" class="flex-1">
      <slot></slot>
    </div>
    <slot name="modals"></slot>
    <slot name="drawers"></slot>
  </div>
</template>
