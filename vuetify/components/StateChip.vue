<script setup lang="ts">
defineProps<{
  state: boolean
}>()
</script>

<template>
  <VChip :color="state ? 'green' : 'grey'" :text="state ? $t('enabled') : $t('disabled')" />
</template>
