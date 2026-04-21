<script setup lang="ts">
defineProps<{
  info: any
}>()
</script>

<template>
  <div class="flex flex-col">
    <div>{{ $t('model.createdat') }}: {{ new Date(info.created_at).toLocaleString() }}</div>
    <div>{{ $t('model.updatedat') }}: {{ new Date(info.updated_at).toLocaleString() }}</div>
  </div>
</template>
