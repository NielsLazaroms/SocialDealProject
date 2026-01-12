<script setup lang="ts">
import { InputDropdown } from '@socialdeal/uikit3-travel';
import type { FilterbarRatingProps } from './types';

const props = defineProps<FilterbarRatingProps>();
</script>

<template>
  <div class="relative w-full">
    <InputDropdown
      v-bind="props.dropdownProps"
      @onClick="props.onToggle()"
      @onClose="props.onClose()"
    />

    <FilterbarFormsSelectList
      v-if="props.open"
      v-bind="props.selectListProps"
    />
  </div>
</template>
