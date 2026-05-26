<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun } from '@lucide/vue'

defineProps<{
  switch?: boolean
}>()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <UiSwitch v-if="switch" :model-value="isDark" @update:model-value="toggleDark()" />
  <UiButton v-else variant="ghost" size="icon" @click="toggleDark()">
    <Sun v-if="isDark" class="w-5 h-5" />
    <Moon v-else class="w-5 h-5" />
  </UiButton>
</template>
