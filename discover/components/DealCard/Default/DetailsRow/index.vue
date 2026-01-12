<script setup lang="ts">
import type { CardDetailRowProps } from './types';
import {
  formatAmountSoldNumber,
  travelTimeFromWalkingMinutes,
} from '~~/layers/discover/utils/index';

const props = defineProps<CardDetailRowProps>();

const formattedAmountSold = computed(() => formatAmountSoldNumber(props.amountSold));

const travelTime = computed(() => travelTimeFromWalkingMinutes(props.duration));

const transportMode = computed(() => travelTime.value.transportMode);
const transportDuration = computed(() => travelTime.value.transportDuration);
</script>

<template>
  <div
    class="typography-body-l @container/dealcard flex w-full flex-row items-center justify-center gap-x-2 px-2"
  >
    <div
      v-if="props.rating && props.rating.ratingNumber"
      class="hidden flex-row items-center justify-center gap-x-1 @[230px]/dealcard:flex"
    >
      <span class="text-yellow-500">{{ props.rating.ratingNumber }}</span>
      <span
        class="text-input-gray-500"
        v-if="props.rating.ratingAmount"
      >
        • {{ props.rating.ratingAmount }}</span
      >
      <BaseIcon
        name="rating"
        class="size-4 text-yellow-500"
      />
    </div>
    <span
      v-if="props.rating && props.rating.ratingNumber"
      class="bg-brand-100 hidden h-5 w-px rounded-lg @[230px]:block"
    ></span>
    <div
      v-if="props.duration !== undefined"
      class="hidden flex-row items-center justify-center gap-x-1 md:flex"
    >
      <p class="text-brand-500">{{ transportDuration }} min.</p>
      <BaseIcon
        :name="transportMode"
        class="text-brand-500 size-4"
      />
    </div>
    <span class="bg-brand-100 hidden h-5 w-px rounded-lg md:inline-block"></span>
    <div class="flex flex-row items-center justify-center gap-x-1">
      <p class="text-brand-500 typography-body-l">{{ formattedAmountSold }}</p>
      <BaseIcon
        name="shoppingCart"
        class="text-brand-500 size-4"
      />
    </div>
  </div>
</template>
