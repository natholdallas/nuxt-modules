<script setup lang="ts">
defineProps<{
  state: boolean
}>()
</script>

<template>
  <VChip :color="state ? 'success' : 'disabled'" :text="state ? $t('enabled') : $t('disabled')" />
</template>
