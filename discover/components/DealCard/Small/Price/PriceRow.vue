<script setup lang="ts">
import type { PricesProps } from '../../Default/Price/types';

const props = defineProps<PricesProps>();
</script>

<template>
  <div class="flex flex-row items-center gap-y-1">
    <div v-if="props.oldPrice">
      <div class="flex flex-row items-center justify-center gap-x-1">
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
</template>
