<script setup lang="ts">
import type { TileProps, TileEmits } from './types';

const props = defineProps<TileProps>();
const emit = defineEmits<TileEmits>();
</script>

<template>
  <button
    type="button"
    role="gridcell"
    :style="props.styleObj"
    @click="emit('activate')"
    class="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-[14px] border-0 text-[20px] font-extrabold text-white/95 shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition-[filter,box-shadow] duration-300 ease-out outline-none hover:brightness-[1.05]"
  >
    <div class="absolute inset-0 h-full w-full">
      <img
        v-if="props.imageSrc"
        :src="props.imageSrc"
        alt="inspiration image"
        class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none"
      />
    </div>
  </button>
</template>
