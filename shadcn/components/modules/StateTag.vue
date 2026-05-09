<script setup lang="ts">
defineProps<{
  state: boolean
}>()
</script>

<template>
  <VBadge :variant="state ? 'default' : 'outline'">
    {{ state ? $t('enabled') : $t('disabled') }}
  </VBadge>
</template>
