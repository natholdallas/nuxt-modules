<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'

defineProps<{
  switch?: boolean
}>()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <VSwitch v-if="switch" :model-value="isDark" @update:model-value="toggleDark()" />
  <VButton v-else variant="ghost" size="icon" @click="toggleDark()">
    <Sun v-if="isDark" class="w-5 h-5" />
    <Moon v-else class="w-5 h-5" />
  </VButton>
</template>
