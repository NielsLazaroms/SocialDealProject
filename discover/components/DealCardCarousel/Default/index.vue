<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { CardProps } from '../../DealCard/types';
import type { CarouselProps, SelectCarouselEmits } from '../types';
import { Navigation, Pagination } from 'swiper/modules';
import type { SectionTitleProps } from '../../SectionTitle/types';
import { DefaultButtonTypes, DefaultButtonSize, DefaultButton } from '@socialdeal/uikit3-shared';

const props = withDefaults(
  defineProps<CarouselProps & { deals?: CardProps[]; title: SectionTitleProps }>(),
  {
    deals: () => [],
  },
);

const emit = defineEmits<SelectCarouselEmits>();

const layout = { slides: { mobile: 1, tablet: 2, desktop: 4 }, gapPx: 16 };
const config = computed(() => ({
  spaceBetween: layout.gapPx,
  slidesPerView: layout.slides.desktop,
  modules: [Navigation, Pagination],
  navigation: props.showArrows,
  pagination: true,
  breakpoints: {
    0: { slidesPerView: layout.slides.mobile },
    640: { slidesPerView: layout.slides.tablet },
    1024: { slidesPerView: layout.slides.desktop },
  },
}));

const hasDeals = computed(() => props.deals.length > 0);
</script>
<template>
  <section class="flex flex-col gap-y-4">
    <SectionTitle v-bind="props.title">
      <template #action>
        <DefaultButton
          :text="props.title.moreDealsTextButton"
          class="text-brand-500 underline underline-offset-4"
          :type="DefaultButtonTypes.Text"
          :size="DefaultButtonSize.Normal"
          @on-click="emit('view-all')"
        ></DefaultButton>
      </template>
    </SectionTitle>
    <div class="relative overflow-hidden">
      <Swiper
        v-if="hasDeals"
        v-bind="config"
      >
        <SwiperSlide
          v-for="deal in props.deals"
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

:deep(.swiper:not(.swiper-initialized) .swiper-wrapper) {
  display: flex;
  --spv: v-bind(layout.slides.mobile);
}

@media (min-width: 640px) {
  :deep(.swiper:not(.swiper-initialized) .swiper-wrapper) {
    --spv: v-bind(layout.slides.tablet);
  }
}

@media (min-width: 1024px) {
  :deep(.swiper:not(.swiper-initialized) .swiper-wrapper) {
    --spv: v-bind(layout.slides.desktop);
  }
}

:deep(.swiper:not(.swiper-initialized) .swiper-slide) {
  margin-right: calc(v-bind(layout.gapPx) * 1px);
  width: calc(100% / var(--spv) - ((v-bind(layout.gapPx) * 1px) * (var(--spv) - 1) / var(--spv)));
}

:deep(.swiper:not(.swiper-initialized) .swiper-slide:last-child) {
  margin-right: 0;
}

/* desktop: hide pagination */
@media (min-width: 1024px) {
  :deep(.swiper-pagination) {
    display: none;
    transition: none;
  }
}
</style>
