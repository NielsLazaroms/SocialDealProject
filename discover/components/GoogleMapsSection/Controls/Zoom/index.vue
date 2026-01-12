<script setup lang="ts">
import type { ZoomButtonEmits, ZoomButtonProps } from './types';

withDefaults(defineProps<ZoomButtonProps>(), {
  disableIncrease: false,
  disableDecrease: false,
});

const emit = defineEmits<ZoomButtonEmits>();
</script>

<template>
  <div class="rounded-full shadow-[0_2px_4px_0_rgba(0,0,0,0.24)]">
    <button
      class="flex w-12 items-center justify-center rounded-t-full bg-white py-3 hover:bg-gray-100 disabled:cursor-default disabled:bg-gray-50 disabled:hover:bg-gray-50"
      :disabled="disableIncrease"
      @click="emit('onIncreaseZoom')"
    >
      <BaseIcon
        name="increase"
        :class="disableIncrease ? 'text-gray-300' : 'text-gray-800'"
        class="h-5 w-5"
      />
    </button>

    <hr class="h-px w-full border-gray-200" />

    <button
      class="flex w-12 items-center justify-center rounded-b-full bg-white py-3 hover:bg-gray-100 disabled:cursor-default disabled:bg-gray-50 disabled:hover:bg-gray-50"
      :disabled="disableDecrease"
      @click="emit('onDecreaseZoom')"
    >
      <BaseIcon
        name="decrease"
        :class="disableDecrease ? 'text-gray-300' : 'text-gray-800'"
        class="h-5 w-5"
      />
    </button>
  </div>
</template>
