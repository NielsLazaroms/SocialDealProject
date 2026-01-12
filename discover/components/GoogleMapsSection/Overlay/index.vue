<script setup lang="ts">
import { useScrollRestore } from '~~/layers/discover/composables/mapSection/useScrollRestore';
import type { GoogleMapsOverlayProps } from './types';
import { useScrollToChild } from '~~/layers/discover/composables/mapSection/useScrollToChild';

const props = defineProps<GoogleMapsOverlayProps>();

const expandedDealId = defineModel<number | null>('expandedDealId', { default: null });
const overlayOpen = defineModel<boolean>('overlayOpen', { default: false });
const scrollEl = ref<HTMLElement | null>(null);

const { save: saveScroll } = useScrollRestore(overlayOpen, scrollEl);

const { scrollToDataId } = useScrollToChild(scrollEl);

watch(
  [() => overlayOpen.value, () => props.scrollToDealId],
  async ([open, id]) => {
    if (!open || !id) return;
    requestAnimationFrame(() => scrollToDataId(id));
  },
  { flush: 'post' },
);
</script>

<template>
  <div class="pointer-events-none absolute bottom-0 w-full md:top-0 md:left-0 md:h-full">
    <Transition
      enter-active-class="transform transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <section
        v-if="overlayOpen"
        class="pointer-events-auto flex flex-col shadow-xl md:h-full md:bg-white"
        :class="props.widthClass ?? 'sm:w-full md:w-[35%] md:max-w-[35%]'"
      >
        <header class="hidden items-center justify-between gap-3 p-4 md:flex">
          <h3 class="text-lg font-semibold">
            {{ props.title ?? 'Resultaten' }}
          </h3>
        </header>

        <div
          ref="scrollEl"
          class="overflow-x-auto overflow-y-hidden p-4 md:overflow-x-hidden md:overflow-y-auto"
          @scroll="saveScroll"
        >
          <ul
            v-if="props.deals.length"
            class="flex w-full flex-row flex-nowrap gap-4 md:flex-col"
          >
            <DealCardSmall
              v-for="deal in props.deals"
              :key="`deal-${deal.id}`"
              as="li"
              class="w-full shrink-0 md:shrink"
              v-bind="deal"
              :data-deal-id="deal.id"
              v-model:expandedId="expandedDealId"
            />
          </ul>

          <div
            v-else
            class="py-10 text-center text-gray-500"
          >
            Geen deals gevonden.
          </div>
        </div>
      </section>
    </Transition>
  </div>
</template>
