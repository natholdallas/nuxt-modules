<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  scroll?: boolean
  loading?: boolean | boolean[]
}>()

const isLoading = computed(() => (isArray(props.loading) ? props.loading.some((x) => x) : props.loading))
</script>

<template>
  <div :class="[scroll ? 'overflow-auto' : undefined, 'size-full']">
    <VProgressLinear :active="isLoading" :indeterminate="isLoading" />
    <div :class="[$attrs.class, scroll ? undefined : 'size-full']">
      <slot></slot>
    </div>
    <slot name="modals"></slot>
    <slot name="drawers"></slot>
  </div>
</template>
