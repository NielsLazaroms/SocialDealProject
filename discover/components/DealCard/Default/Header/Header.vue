<script setup lang="ts">
import * as svg from '~~/layers/discover/assets/svg';
import { formatPercent } from '~~/layers/discover/utils/index';
import type { CardHeaderProps } from './types';

const props = withDefaults(defineProps<CardHeaderProps>(), { tagColor: '#339AED' });

const discount = formatPercent(props.discount);
const whiteStrokeIcons = new Set([
  'sport',
  'ontbijt',
  'lunch',
  'highTea',
  'diner',
  'borrel',
  'hotel',
  'camping',
  'bungalow',
  'roundtrip',
  'appartement',
]);

const iconStyle = computed(() => {
  const base = props.category.color;

  return {
    color: base,
    '--icon-stroke': whiteStrokeIcons.has(props.category.icon) ? '#fff' : base,
  };
});
</script>

<template>
  <div class="relative">
    <div class="w-full overflow-hidden rounded-tl-lg rounded-tr-lg">
      <NuxtImg
        :src="props.image"
        :alt="props.image"
        class="h-full min-h-[153px] w-full object-cover"
      />
      <div class="absolute top-0 right-3">
        <div class="relative inline-block">
          <img
            :src="svg.discountBadge"
            alt="Rode discount svg"
            class="block h-auto w-9"
          />
          <div
            class="typography-label-l absolute inset-0 flex items-center justify-center font-bold text-gray-100"
          >
            {{ discount }}
          </div>
        </div>
      </div>

      <div
        v-if="props.tag"
        class="absolute bottom-3 left-3"
      >
        <div
          class="typography-label-m w-auto rounded-lg px-2 py-1 font-bold text-gray-100"
          :style="{ backgroundColor: props.tagColor }"
        >
          {{ props.tag }}
        </div>
      </div>
    </div>
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-1/2">
      <div
        class="flex h-9 w-10 rotate-90 items-center justify-center [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]"
        :style="{ backgroundColor: props.category.color }"
      >
        <BaseIcon
          class="-rotate-90"
          :name="props.category.icon"
          :style="iconStyle"
        />
      </div>
    </div>
  </div>
</template>
