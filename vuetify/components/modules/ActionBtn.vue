<script setup lang="ts">
defineProps<{
  icon?: string
  appendIcon?: string
  text?: string
  tooltip?: string
  disabled?: boolean
}>()

defineEmits<{
  (e: 'click', ev: MouseEvent): void
}>()
</script>

<template>
  <VTooltip v-if="tooltip" :text="tooltip" location="top">
    <template v-slot:activator="{ props }">
      <VBtn
        v-bind="props"
        :icon="icon"
        :append-icon="appendIcon"
        :text="text"
        :disabled="disabled"
        :border="!icon"
        :density="icon ? 'comfortable' : 'default'"
        size="small"
        class="text-none"
        color="medium-emphasis"
        variant="text"
        @click="$emit('click', $event)"
      />
    </template>
  </VTooltip>
  <VBtn
    :icon="icon"
    :append-icon="appendIcon"
    :text="text"
    :disabled="disabled"
    :border="!icon"
    :density="icon ? 'comfortable' : 'default'"
    size="small"
    class="text-none"
    color="medium-emphasis"
    variant="text"
    @click="$emit('click', $event)"
    v-else
  />
</template>
