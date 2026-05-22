<script setup lang="ts">
defineProps<{
  title?: string
  maxWidth?: string | number
  noPadding?: boolean
}>()

const show = defineModel<boolean>()
</script>

<template>
  <VDialog v-model="show" :max-width="maxWidth || '500'">
    <VSheet>
      <VCardTitle v-if="title">{{ title }}</VCardTitle>
      <div :class="[noPadding ? undefined : 'p-2']">
        <slot></slot>
      </div>
    </VSheet>
  </VDialog>
</template>
