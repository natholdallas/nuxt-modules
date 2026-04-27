<script setup lang="ts">
defineProps<{
  text?: string
  noAppend?: boolean
}>()

const showCreate = defineModel<boolean>()
</script>

<template>
  <VToolbar density="comfortable" flat>
    <VToolbarTitle v-if="text" :text="text" />
    <slot v-else />
    <template #append>
      <VBtn
        v-if="!noAppend"
        prepend-icon="mdi-plus"
        :text="$t('create')"
        @click="showCreate = true"
      />
    </template>
  </VToolbar>
</template>
