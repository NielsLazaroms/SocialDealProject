<script setup lang="ts">
import { computed } from 'vue';
import type { PriceProps } from './types';
import {
  formatDealPrice,
  formatPricePartsToRenderParts,
  getPriceTextVariants,
} from '~~/layers/discover/utils';
import { priceTextStyling } from '../variants';

const props = withDefaults(defineProps<PriceProps>(), {
  locale: 'nl-NL',
  currency: 'EUR',
});

const priceParts = computed(() => formatDealPrice(props));
const renderParts = computed(() => formatPricePartsToRenderParts(priceParts.value));
const priceClasses = computed(() => priceTextStyling(getPriceTextVariants(props)));
</script>

<template>
  <div class="flex flex-row items-center">
    <div
      class="flex shrink-0 flex-row items-baseline"
      :class="priceClasses.main()"
    >
      <template
        v-for="(part, i) in renderParts"
        :key="i"
      >
        <span
          v-if="part.kind === 'fraction'"
          class="typography-price-xs relative"
          :class="priceClasses.fraction()"
        >
          {{ part.value }}
        </span>
        <template v-else>
          {{ part.value }}
        </template>
      </template>
    </div>
  </div>
</template>
