<script setup lang="ts">
defineProps<{
  noAppend?: boolean
}>()

const showCreate = defineModel<boolean>()
</script>

<template>
  <div class="top-table-bar overflow-x-auto">
    <div class="flex min-w-full w-max items-center gap-2 px-3 py-2">
      <VBtn
        v-if="!noAppend"
        prepend-icon="mdi-plus"
        :text="$t('create')"
        class="shrink-0"
        @click="showCreate = true"
      />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.top-table-bar {
  background: rgb(var(--v-theme-surface-light));
}
</style>
