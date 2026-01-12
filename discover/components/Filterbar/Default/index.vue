<script setup lang="ts">
import { DefaultButton, DefaultButtonTypes } from '@socialdeal/uikit3-shared';
import type { FilterbarDefaultProps } from './types';
import type { FilterbarEmits } from '../types';

const props = defineProps<FilterbarDefaultProps>();
const emit = defineEmits<FilterbarEmits>();
</script>

<template>
  <div class="w-full rounded-lg bg-white">
    <div class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
      <div
        class="relative flex items-center px-4 py-3 md:after:absolute md:after:top-[20%] md:after:right-0 md:after:bottom-[20%] md:after:w-px md:after:border-r-2 md:after:border-dashed md:after:border-gray-300"
      >
        <FilterbarFormsLocation v-bind="props.locationSection" />
      </div>
      <div
        class="relative flex items-center px-4 py-3 md:after:absolute md:after:top-[20%] md:after:right-0 md:after:bottom-[20%] md:after:w-px md:after:border-r-2 md:after:border-dashed md:after:border-gray-300"
      >
        <FilterbarFormsCategory v-bind="props.categorySection" />
      </div>
      <div
        class="relative flex items-center px-4 py-3 md:after:absolute md:after:top-[20%] md:after:right-0 md:after:bottom-[20%] md:after:w-px md:after:border-r-2 md:after:border-dashed md:after:border-gray-300"
      >
        <FilterbarFormsRating v-bind="props.ratingSection" />
      </div>
      <div
        class="mx-2 self-center"
        v-if="props.filterbar?.submitButton"
      >
        <DefaultButton
          class="whitespace-nowrap"
          @click="emit('submit')"
          :text="props.filterbar.submitButton.text"
          :type="DefaultButtonTypes.Filled"
        />
      </div>
    </div>
  </div>
</template>
