<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    loading?: boolean
    noFooter?: boolean
    noCancel?: boolean
    noConfirm?: boolean
    class?: string
    draggable?: boolean
  }>(),
  { draggable: true },
)
defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const open = defineModel<boolean>('open', { default: false })

// 拖拽偏移：覆盖 translate 定位，保持居中再叠加位移
const pos = reactive({ x: 0, y: 0 })
const dragging = ref(false)
let startX = 0
let startY = 0
let startPosX = 0
let startPosY = 0

// 交互元素与可滚动区不触发拖拽，避免与点击/滚动冲突
function ignorePointer(e: PointerEvent): boolean {
  const t = e.target as Element | null
  if (!t) return true
  if (t.closest('button, a, input, textarea, select, label, [contenteditable], [data-slot="dialog-close"]')) return true
  if (t.closest('[data-slot="dialog-content"] [data-scrollable], [data-slot="dialog-content"] [class*="overflow"]')) return true
  return false
}

function onPointerDown(e: PointerEvent) {
  if (!props.draggable || e.button !== 0) return
  if (ignorePointer(e)) return
  dragging.value = true
  startX = e.clientX
  startY = e.clientY
  startPosX = pos.x
  startPosY = pos.y
  ;(e.currentTarget as Element)?.setPointerCapture?.(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  pos.x = startPosX + e.clientX - startX
  pos.y = startPosY + e.clientY - startY
}

function onPointerUp() {
  dragging.value = false
}

// 每次打开回到居中
watch(open, (v) => {
  if (v) {
    pos.x = 0
    pos.y = 0
    dragging.value = false
  }
})

const contentStyle = computed(() =>
  pos.x || pos.y ? { translate: `calc(-50% + ${pos.x}px) calc(-50% + ${pos.y}px)` } : undefined,
)

const contentClass = computed(() => [props.class, dragging.value && 'cursor-move select-none'])
</script>

<template>
  <UiDialog v-model:open="open" modal>
    <UiDialogContent
      :class="contentClass"
      :style="contentStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <UiDialogTitle>{{ title ?? '' }}</UiDialogTitle>
      <UiDialogDescription>{{ description ?? '' }}</UiDialogDescription>
      <div>
        <slot />
      </div>
      <UiDialogFooter v-if="!noFooter">
        <UiButton v-if="!noCancel" @click="$emit('cancel')" :disabled="loading" variant="secondary">
          {{ $t('cancel') }}
        </UiButton>
        <UiButton v-if="!noConfirm" @click="$emit('confirm')" :disabled="loading" variant="default">
          <UiSpinner v-if="loading" class="animate-spin" />
          {{ $t('confirm') }}
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>