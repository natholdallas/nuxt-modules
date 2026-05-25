<script setup lang="ts">
defineProps<{
  state: boolean
}>()
</script>

<template>
  <UiBadge :variant="state ? 'default' : 'secondary'">
    {{ state ? $t('enabled') : $t('disabled') }}
  </UiBadge>
</template>
