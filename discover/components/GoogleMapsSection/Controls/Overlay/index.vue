<script setup lang="ts">
import type { OverlayButtonEmits, OverlayButtonProps } from './types';

const props = defineProps<OverlayButtonProps>();
const emit = defineEmits<OverlayButtonEmits>();
</script>
<template>
  <button
    type="button"
    class="flex items-center justify-center gap-x-2 rounded-full bg-white px-2 py-2 shadow-[0_2px_4px_0_rgba(0,0,0,0.24)] select-none hover:bg-gray-100"
    @click="emit('on-click')"
  >
    <BaseIcon
      v-if="props.icon"
      :name="props.icon"
      class="text-gray-700"
    />
    <span v-if="label">{{ label }}</span>
  </button>
</template>
