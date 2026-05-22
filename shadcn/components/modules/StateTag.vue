<script setup lang="ts">
defineProps<{
  state: boolean
}>()
</script>

<template>
  <VBadge :variant="state ? 'default' : 'secondary'">
    {{ state ? $t('enabled') : $t('disabled') }}
  </VBadge>
</template>
