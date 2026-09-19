<script setup lang="ts">
import { useDayjs } from '#dayjs'

// The whole project runs on Asia/Shanghai (backend day boundaries, stats).
// Format record timestamps in that fixed zone so the displayed wall clock
// matches what the server aggregates regardless of the visitor's device tz.
const SITE_TZ = 'Asia/Shanghai'

const props = defineProps<{
  info: any
}>()

function fmt(v?: string) {
  if (!v) return '-'
  return useDayjs()(v).tz(SITE_TZ).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<template>
  <div class="flex flex-col">
    <div>{{ $t('model.createdat') }}: {{ fmt(info.created_at) }}</div>
    <div>{{ $t('model.updatedat') }}: {{ fmt(info.updated_at) }}</div>
  </div>
</template>
