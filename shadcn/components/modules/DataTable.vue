<script setup lang="ts">
import type { Component } from 'vue'

export interface TableAction {
  key: string
  icon: Component
  title?: string
  show?: (item: any) => boolean
  onClick?: (item: any) => void
}

const props = withDefaults(
  defineProps<{
    title?: string
    rows: any[]
    total?: number
    selectable?: boolean
    selectKey?: string
    paginated?: boolean
    emptyText?: string
    actions?: TableAction[]
    opsPosition?: 'start' | 'end'
  }>(),
  {
    title: '',
    total: 0,
    selectable: false,
    selectKey: 'id',
    paginated: false,
    emptyText: '',
    actions: () => [],
    opsPosition: 'start',
  },
)

const selected = defineModel<any[]>('selected', { default: () => [] })
const page = defineModel<number>('page', { default: 1 })
const size = defineModel<number>('size', { default: 20 })

const hasOps = computed(() => props.actions.length > 0 || !!useSlots()['ops-append'])

const allSelected = computed(
  () => props.rows.length > 0 && selected.value.length === props.rows.length,
)

function toggleAll() {
  if (allSelected.value) {
    selected.value = []
  } else {
    selected.value = props.rows.map((r) => r[props.selectKey])
  }
}

function toggleOne(v: any) {
  const idx = selected.value.indexOf(v)
  if (idx > -1) {
    selected.value.splice(idx, 1)
  } else {
    selected.value.push(v)
  }
}
</script>

<template>
  <UiCard class="h-full w-full overflow-hidden">
    <UiCardHeader v-if="title || $slots.actions || $slots.toolbar" class="flex flex-col gap-2">
      <div v-if="title || $slots.actions" class="flex gap-2 justify-between items-center">
        <UiCardTitle>{{ title }}</UiCardTitle>
        <div class="flex gap-2">
          <slot name="actions" />
        </div>
      </div>
      <div
        v-if="$slots.toolbar"
        class="flex items-center gap-2 overflow-x-auto w-full whitespace-nowrap"
      >
        <slot name="toolbar" />
      </div>
    </UiCardHeader>
    <UiCardContent class="overflow-auto h-full">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead v-if="selectable" class="w-10">
              <UiCheckbox :model-value="allSelected" @update:model-value="toggleAll" />
            </UiTableHead>
            <template v-if="opsPosition === 'start'">
              <UiTableHead v-if="hasOps">{{ $t('action') }}</UiTableHead>
              <slot name="thead" />
            </template>
            <template v-else>
              <slot name="thead" />
              <UiTableHead v-if="hasOps">{{ $t('action') }}</UiTableHead>
            </template>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="item in rows" :key="item.id">
            <UiTableCell v-if="selectable">
              <UiCheckbox
                :model-value="selected.includes(item[selectKey])"
                @update:model-value="toggleOne(item[selectKey])"
              />
            </UiTableCell>
            <UiTableCell v-if="opsPosition === 'start' && hasOps" class="flex gap-1">
              <slot name="ops" :item="item">
                <slot name="ops-prepend" :item="item" />
                <template v-for="a in actions" :key="a.key">
                  <UiButton
                    v-if="!a.show || a.show(item)"
                    variant="ghost"
                    size="icon"
                    :title="a.title"
                    @click="a.onClick?.(item)"
                  >
                    <component :is="a.icon" :size="18" />
                  </UiButton>
                </template>
                <slot name="ops-append" :item="item" />
              </slot>
            </UiTableCell>
            <slot name="row" :item="item" />
            <UiTableCell v-if="opsPosition === 'end' && hasOps" class="flex gap-1">
              <slot name="ops" :item="item">
                <slot name="ops-prepend" :item="item" />
                <template v-for="a in actions" :key="a.key">
                  <UiButton
                    v-if="!a.show || a.show(item)"
                    variant="ghost"
                    size="icon"
                    :title="a.title"
                    @click="a.onClick?.(item)"
                  >
                    <component :is="a.icon" :size="18" />
                  </UiButton>
                </template>
                <slot name="ops-append" :item="item" />
              </slot>
            </UiTableCell>
          </UiTableRow>
          <UiTableRow v-if="rows.length === 0 && emptyText">
            <UiTableCell colspan="100" class="text-center text-muted-foreground py-6">
              {{ emptyText }}
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </UiCardContent>
    <UiCardFooter v-if="paginated">
      <UixPagination v-model="page" v-model:size="size" :total="total || rows.length" />
    </UiCardFooter>
  </UiCard>
</template>
