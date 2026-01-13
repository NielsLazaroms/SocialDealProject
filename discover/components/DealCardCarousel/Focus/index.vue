<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { CardProps } from '../../DealCard/types';
import type { CarouselProps } from '../types';
import { Navigation, Pagination } from 'swiper/modules';
import type { SectionTitleProps } from '../../SectionTitle/types';
const props = withDefaults(
  defineProps<CarouselProps & { deals?: CardProps[]; title: SectionTitleProps }>(),
  {
    deals: () => [],
  },
);

const config = computed(() => ({
  spaceBetween: 0,
  modules: [Navigation, Pagination],
  navigation: props.showArrows,
  pagination: true,
  slidesPerView: 'auto' as const,
  loop: true,
  centeredSlides: true,
}));
const popularLimit = 10;
const focusDeals = computed(() => props.deals.slice(0, popularLimit));
const hasDeals = computed(() => props.deals.length > 0);
</script>

<template>
  <section class="flex flex-col gap-y-4">
    <SectionTitle v-bind="props.title" />

    <div class="relative overflow-hidden">
      <Swiper
        v-if="hasDeals"
        v-bind="config"
        class="carousel-focus py-2"
      >
        <SwiperSlide
          v-for="deal in focusDeals"
          :key="deal.id"
        >
          <div class="slide-inner">
            <slot :deal="deal"> </slot>
          </div>
        </SwiperSlide>
      </Swiper>
      <div v-else>
        <slot name="empty">
          <p class="typography-body-l text-input-gray-700 text-center">
            Er zijn geen deals beschikbaar.
          </p>
        </slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('../swiper.shared.css');
:deep(.carousel-focus .swiper-slide) {
  width: 350px;
}

:deep(.carousel-focus .swiper-slide .slide-inner) {
  width: 100%;
  transform: scale(0.9);
  opacity: 0.7;
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
  transform-origin: center center;
}

:deep(.carousel-focus .swiper-slide-active .slide-inner),
:deep(.carousel-focus .swiper-slide-duplicate-active .slide-inner) {
  transform: scale(1) translateY(-6px);
  opacity: 1;
}
</style>
