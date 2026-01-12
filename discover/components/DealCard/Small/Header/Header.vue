<script setup lang="ts">
import * as svg from '~~/layers/discover/assets/svg';
import { formatPercent } from '~~/layers/discover/utils/index';
import type { CardSmallHeaderProps } from './types';
import type { FavoriteButtonEmits } from '../../Default/FavoriteButton/types';

const props = defineProps<CardSmallHeaderProps>();
const emit = defineEmits<FavoriteButtonEmits>();

const discount = formatPercent(props.discount);
</script>

<template>
  <div class="relative h-full w-full">
    <div class="h-full w-full overflow-hidden rounded-tl-lg rounded-tr-lg">
      <NuxtImg
        :src="props.image"
        :alt="props.image"
        class="h-full w-full object-cover"
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
      <DealCardDefaultFavoriteButton
        class="absolute right-2 bottom-3"
        :favourite="props.favourite"
        @toggle-favorite="emit('toggle-favorite')"
      />
    </div>
  </div>
</template>
