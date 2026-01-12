<script setup lang="ts">
import type { HeaderSectionEmits, HeaderSectionProps } from './types';

const props = defineProps<HeaderSectionProps>();
const emits = defineEmits<HeaderSectionEmits>();
</script>
<template>
  <div
    class="relative z-20 bg-cover bg-center bg-no-repeat backdrop-brightness-20"
    :style="{ backgroundImage: `url(${props.backgroundImage})` }"
  >
    <div class="absolute inset-0 bg-black/20 backdrop-brightness-75"></div>

    <div
      class="max-w-8xl relative z-10 mx-auto flex w-full flex-col items-center justify-between gap-y-16 px-16 py-8 min-[744px]:px-8 min-[1408px]:px-4"
    >
      <SectionTitle v-bind="props.title" />
      <FilterbarDefault
        v-bind="props.filter"
        @submit="emits('submit')"
      />
      <div class="hidden md:block">
        <CountdownTimerHeader v-bind="props.countdownTimer" />
      </div>
    </div>
  </div>
</template>
