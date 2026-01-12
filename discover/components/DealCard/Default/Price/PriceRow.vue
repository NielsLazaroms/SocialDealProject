<script setup lang="ts">
import { touristTaxTextColor } from '../variants';
import type { PricesProps } from './types';

const props = defineProps<PricesProps>();
</script>

<template>
  <div class="mb-2 flex flex-col">
    <div class="flex flex-row items-center justify-center gap-y-1">
      <div v-if="props.oldPrice">
        <div class="flex flex-row items-center justify-center gap-x-1">
          <span class="typography-body-s text-gray-700">Regulier</span>
          <div class="relative">
            <DealCardDefaultPrice v-bind="props.oldPrice" />
            <span
              class="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 rotate-170 transform bg-red-600"
            ></span>
          </div>
          <BaseIcon
            name="informationCircle"
            class="text-gray-700"
          ></BaseIcon>
        </div>
      </div>
      <div class="ml-2">
        <DealCardDefaultPrice v-bind="props.price" />
      </div>
    </div>
    <div class="flex h-6 items-center self-center text-xs">
      <span
        :class="touristTaxTextColor({ color: props.touristTax.color })"
        v-if="props.touristTax?.text"
      >
        {{ props.touristTax?.text }}
      </span>
    </div>
  </div>
</template>
