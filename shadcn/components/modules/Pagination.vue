<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = withDefaults(
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
const pageSize = defineModel<number>('size')

const sizeOptions = [10, 20, 50, 100]
const effectiveSize = computed(() => pageSize.value || props.size || 20)
</script>

<template>
  <div class="flex items-center gap-2 w-full">
    <UiPagination
      v-slot="{ page: $page }"
      v-model:page="page"
      :items-per-page="effectiveSize"
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
            :is-active="item.value === $page"
          >
            {{ item.value }}
          </UiPaginationItem>
        </template>
        <UiPaginationEllipsis :index="4" />
        <UiPaginationNext>
          <ChevronRight />
        </UiPaginationNext>
      </UiPaginationContent>
      <UiSelect v-model="pageSize">
        <UiSelectTrigger>
          <UiSelectValue />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="o in sizeOptions" :key="o" :value="o">{{ o }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </UiPagination>
  </div>
</template>
