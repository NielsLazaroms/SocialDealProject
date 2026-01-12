<script setup lang="ts">
import type { CardCompanyInformationProps } from './types';

const props = defineProps<CardCompanyInformationProps>();
</script>

<template>
  <div class="typography-body-l flex flex-col gap-y-1 text-gray-700">
    <p class="line-clamp-1 max-h-6 min-h-6">{{ props.business }}</p>
    <div class="flex flex-row gap-x-1 underline decoration-gray-700 underline-offset-3">
      <span>
        <BaseIcon
          name="mapMarker"
          class="text-gray-700"
        />
      </span>
      <p class="line-clamp-1 max-h-6 min-h-6">{{ props.location }}</p>
    </div>
  </div>
</template>
