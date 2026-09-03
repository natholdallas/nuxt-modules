<script setup lang="ts">
defineProps<{
  text?: string
  noAppend?: boolean
}>()

const showCreate = defineModel<boolean>()
</script>

<template>
  <div class="top-table-bar overflow-x-auto">
    <div class="flex min-w-full w-max items-center gap-2 px-3 py-2">
      <span v-if="text" class="shrink-0 whitespace-nowrap font-medium">{{ text }}</span>
      <slot v-else />
      <VBtn
        v-if="!noAppend"
        prepend-icon="mdi-plus"
        :text="$t('create')"
        class="shrink-0"
        @click="showCreate = true"
      />
    </div>
  </div>
</template>

<style scoped>
.top-table-bar {
  background: rgb(var(--v-theme-surface-light));
}
</style>
