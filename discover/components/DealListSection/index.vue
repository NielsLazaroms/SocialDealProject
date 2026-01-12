<script setup lang="ts">
import type { DealListEmits, DealListProps } from './types';
import {
  DefaultButton,
  DefaultButtonTypes,
  DefaultButtonSize,
  DefaultButtonRole,
} from '@socialdeal/uikit3-shared';

const props = defineProps<DealListProps>();
const emit = defineEmits<DealListEmits>();
</script>
<template>
  <section class="flex flex-col gap-y-4">
    <SectionTitle v-bind="title" />
    <TransitionGroup
      tag="ul"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      move-class="transition-transform duration-500 ease-out"
    >
      <li
        v-for="deal in props.deals"
        :key="deal.id"
      >
        <slot
          name="card"
          :deal="deal"
          :toggle-favorite="() => emit('toggle-favorite', deal.id)"
        >
          <DealCardDefault
            v-bind="deal"
            @toggle-favorite="emit('toggle-favorite', deal.id)"
          />
        </slot>
      </li>
    </TransitionGroup>
    <DefaultButton
      v-if="!props.hasInfinteScroll && props.canLoadMore"
      class="w-fit self-center"
      text="Laad meer deals"
      background-color="white"
      :size="DefaultButtonSize.Small"
      :type="DefaultButtonTypes.Outline"
      :role="DefaultButtonRole.Button"
      @onClick="emit('load-more')"
    />
  </section>
</template>
