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
  <div :class="['size-full min-h-0 flex flex-col relative', scroll ? 'overflow-auto' : undefined]">
    <div :class="$attrs.class" class="flex-1">
      <slot></slot>
    </div>
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-background/60 z-10"
    >
      <UiSpinner />
    </div>
    <slot name="modals"></slot>
    <slot name="drawers"></slot>
  </div>
</template>
