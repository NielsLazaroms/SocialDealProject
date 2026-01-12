<script setup lang="ts">
import type { FullScreenEmits, FullScreenProps } from './types';

defineProps<FullScreenProps>();
const emit = defineEmits<FullScreenEmits>();
</script>

<template>
  <button
    class="size-12 items-center justify-center rounded-full bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.24)] hover:bg-gray-100"
    @click="emit('toggle')"
  >
    <BaseIcon
      :name="isFullscreen ? 'collapse' : 'expand'"
      class="h-5 w-5"
    />
  </button>
</template>
