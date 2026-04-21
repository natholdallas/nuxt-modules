<script setup lang="ts">
defineProps<{
  colspan: number
  info: any
}>()
</script>

<template>
  <tr>
    <td :colspan="colspan" class="py-2">
      <RecordInfo :info="info" />
    </td>
  </tr>
</template>
