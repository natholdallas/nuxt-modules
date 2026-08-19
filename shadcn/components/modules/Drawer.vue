<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  loading?: boolean
  direction?: 'top' | 'bottom' | 'left' | 'right'
  noFooter?: boolean
  noCancel?: boolean
  noConfirm?: boolean
}>()
defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <UiDrawer v-model:open="open" :direction="direction ?? 'right'">
    <UiDrawerContent class="flex flex-col h-full">
      <UiDrawerHeader>
        <UiDrawerTitle>{{ title ?? '' }}</UiDrawerTitle>
        <UiDrawerDescription v-if="description">{{ description }}</UiDrawerDescription>
      </UiDrawerHeader>
      <div class="flex-1 overflow-y-auto px-4 min-h-0 flex flex-col">
        <slot />
      </div>
      <UiDrawerFooter v-if="!noFooter">
        <UiButton v-if="!noCancel" @click="$emit('cancel')" :disabled="loading" variant="secondary">
          {{ $t('cancel') }}
        </UiButton>
        <UiButton v-if="!noConfirm" @click="$emit('confirm')" :disabled="loading" variant="default">
          <UiSpinner v-if="loading" class="animate-spin" />
          {{ $t('confirm') }}
        </UiButton>
      </UiDrawerFooter>
    </UiDrawerContent>
  </UiDrawer>
</template>
