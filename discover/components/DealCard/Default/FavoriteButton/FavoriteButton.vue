<script setup lang="ts">
import type { FavoriteButtonEmits } from './types';

const props = defineProps<{ favourite: boolean }>();

const emit = defineEmits<FavoriteButtonEmits>();
</script>
<template>
  <button
    type="button"
    class="border-brand-500 flex size-7 items-center justify-center rounded-3xl border bg-white"
    @click="emit('toggle-favorite')"
    :aria-pressed="props.favourite"
    aria-label="Voeg toe aan favorieten"
  >
    <BaseIcon
      class="text-p text-brand-500 size-4 transition-opacity"
      :name="props.favourite ? 'heartFilled' : 'heartOutlined'"
    />
  </button>
</template>
