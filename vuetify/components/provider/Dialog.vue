<script setup lang="ts">
import { dialog } from '../../composables/dialog'
</script>

<template>
  <NDialog
    v-model="dialog.show"
    :title="dialog.title || $t('dialog')"
    :content="dialog.content || $t('dialog.desc')"
    @confirm="dialog.confirm"
  />
</template>
