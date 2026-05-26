<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

withDefaults(
  defineProps<{
    size: number
    total: number
    defaultPage?: number
  }>(),
  {
    defaultPage: 1,
  },
)

const page = defineModel<number>({ default: 1 })
</script>

<template>
  <UiPagination
    v-slot="{ page }"
    v-model:page="page"
    :items-per-page="size"
    :total="total"
    :default-page="defaultPage"
  >
    <UiPaginationContent v-slot="{ items }">
      <UiPaginationPrevious>
        <ChevronLeft />
      </UiPaginationPrevious>
      <template v-for="(item, index) in items" :key="index">
        <UiPaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </UiPaginationItem>
      </template>
      <UiPaginationEllipsis :index="4" />
      <UiPaginationNext>
        <ChevronRight />
      </UiPaginationNext>
    </UiPaginationContent>
  </UiPagination>
</template>
