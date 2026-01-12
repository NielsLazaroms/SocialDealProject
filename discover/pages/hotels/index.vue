<script setup lang="ts">
import { titles } from '../../data/titles';
import { useFavorites } from '../../composables/useFavorite';
import { useDealsFilters } from '../../composables/filter/useDealFilters';
import { useOpenKey } from '../../composables/filter/useOpenKey';
import { useNearbyFilterbar } from '../../composables/nearby/useFilterbar';
import type { CityItem } from '../../types/cities';

const title = titles;

const breakpoints = useBreakpoints();
const { isFavorite, toggle } = useFavorites();

const overlayOpen = ref(false);
const expandedDealId = ref<number | null>(null);
const scrollToDealId = ref<number | null>(null);

const maxVisibleDeals = ref(16);
const loadMoreDealsStep = 16;

const infiniteSentinelEl = ref<HTMLElement | null>(null);

const { data: categoryData } = await useFetch('/discover/hotelCategories', {
  transform: (list) => list.map(categoryMapper),
});

const categoriesById = computed<Record<number, CategoryProps>>(() =>
  Object.fromEntries((categoryData.value ?? []).map((c) => [c.id, c])),
);

const { data: cityList } = await useFetch<CityItem[]>('/discover/cities', {
  default: () => [],
});

const defaultLocation = computed(() => cityList.value[0]?.city);

const hexagonTiles = computed(() => categoryData.value!.map((category) => ({ category })));

const [nearby, popular, favorite, newToday] = await Promise.all([
  useFetch('/discover/hotelDeals', {
    transform: (apiResponse) => dealCardsWithMarkerMapper(apiResponse, categoriesById.value),
  }),
  useFetch('/discover/hotelPopularDeals?limit=15', {
    transform: (apiResponse) => dealCardsWithMarkerMapper(apiResponse, categoriesById.value),
  }),
  useFetch('/discover/hotelFavoriteDeals', {
    transform: (apiResponse) => dealCardsWithMarkerMapper(apiResponse, categoriesById.value),
  }),
  useFetch('/discover/hotelNewTodayDeals', {
    transform: (apiResponse) => dealCardsWithMarkerMapper(apiResponse, categoriesById.value),
  }),
]);

const { models, applyTo, syncUrl, asQueryObject } = useDealsFilters({
  location: defaultLocation.value,
});

const { isOpen, toggleOpen, closeAll } = useOpenKey(['location', 'category', 'rating'] as const);

const {
  locationModel,
  categoryModel,
  ratingModel,
  locationSection,
  categorySection,
  ratingSection,
} = useNearbyFilterbar({
  cityList,
  categoryData,
  models,
  syncUrl,
  closeAll,
  isOpen,
  toggleOpen,
});

const dealList = computed(() => nearby.data.value?.deals ?? []);
const popularDealList = computed(() => popular.data.value?.deals ?? []);
const favoriteDealList = computed(() => favorite.data.value?.deals ?? []);
const newTodayList = computed(() => newToday.data.value?.deals ?? []);

const filteredAllDeals = applyTo(dealList);
const filteredNewTodayDeals = applyTo(newTodayList);

const availableCount = computed(
  () => filteredAllDeals.value.length + filteredNewTodayDeals.value.length,
);

const { data: hotelInformation } = await useFetch('/discover/hotel', {
  transform: hotelItemMapper,
});

const nearbyTitle = computed(() => ({
  ...title.NearbyDealsTitle,
  text: `${title.NearbyDealsTitle.text}${locationModel.value ?? ''}`,
}));

const moreNearbyTitle = computed(() => ({
  ...title.MoreNearbyDealsTitle,
  text: `${title.MoreNearbyDealsTitle.text}${locationModel.value ?? ''}`,
}));

const submitText = computed(() => {
  const count = availableCount.value ?? 0;
  return `Toon ${count} ${count === 1 ? 'resultaat' : 'resultaten'}`;
});

function goToFilterPage() {
  navigateTo({
    path: '/hotels/filterpage',
    query: asQueryObject(),
  });
}

const filterbarBase = computed(() => ({
  submitButton: { text: submitText.value },
}));

const filterConfig = computed(() => ({
  filterbar: filterbarBase.value,
  locationSection: locationSection.value,
  categorySection: categorySection.value,
  ratingSection: ratingSection.value,
}));

const headerBackgroundImage = computed(() => {
  const selected = locationModel.value;
  if (!selected) return undefined;
  return cityList.value.find((c) => c.city === selected)?.image;
});

const targetDate = getNextMidnight();

const countdownConfig = computed(() => ({
  targetDate,
  text: 'Tot de nieuwe Social Deals',
}));

function boundsFromCity(lat: number, lng: number) {
  return {
    northEast: { lat: lat + 0.08, lng: lng + 0.12 },
    southWest: { lat: lat - 0.08, lng: lng - 0.12 },
  };
}

const selectedCity = computed(() => {
  const selected = locationModel.value;
  if (!selected) return undefined;
  return cityList.value.find((c) => c.city === selected);
});

const mapPosition = computed(() => {
  const c = selectedCity.value;
  return c ? boundsFromCity(c.lat, c.lng) : undefined;
});

const markerDealIds = computed(
  () =>
    new Set(
      (nearby.data.value?.deals ?? [])
        .filter(
          (data) =>
            (!categoryModel.value ||
              categoryModel.value === 'alle_deals' ||
              data.header?.category?.key === categoryModel.value) &&
            (!ratingModel.value || Number(data.detailRow?.rating) >= Number(ratingModel.value)),
        )
        .map((d) => d.id),
    ),
);

const filteredMarkers = computed(() =>
  (nearby.data.value?.markers ?? []).filter(
    (m) => typeof m.id === 'number' && markerDealIds.value.has(m.id),
  ),
);

const overlayConfig = computed(() => ({
  title: 'Deals in de buurt',
  deals: dealList.value,
  scrollToDealId: scrollToDealId.value,
}));

const mapConfig = computed(() => ({
  markers: filteredMarkers.value ?? [],
  position: mapPosition.value,
  minZoom: 9,
  maxZoom: 18,
  controls: { zoom: true, fullScreen: true },
  options: { disableScrollZoom: true },
  mapId: 'cd51e19948f322f9baba8813',
  overlay: overlayConfig.value,
}));

async function handleMarkerClick(payload: { id?: number; position: google.maps.LatLngLiteral }) {
  const id = payload.id;
  if (!id) return;

  const wasOpen = overlayOpen.value;

  overlayOpen.value = true;
  await nextTick();

  if (breakpoints.isMd) {
    if (wasOpen && expandedDealId.value !== null && expandedDealId.value !== id) {
      expandedDealId.value = null;
      await nextTick();
    }

    expandedDealId.value = id;
    await nextTick();
  }

  scrollToDealId.value = id;
  await nextTick();
  scrollToDealId.value = null;
}

function onLoadMore() {
  maxVisibleDeals.value += loadMoreDealsStep;
}

const visibleDeals = computed(() =>
  filteredAllDeals.value.slice(0, maxVisibleDeals.value).map((deal) => ({
    ...deal,
    favourite: isFavorite(deal.id),
  })),
);

const canLoadMore = computed(() => filteredAllDeals.value.length > visibleDeals.value.length);

const dealsNearbyProps = computed(() => ({
  deals: visibleDeals.value,
  canLoadMore: canLoadMore.value,
  hasInfinteScroll: false,
}));

const moreDealsNearbyProps = computed(() => ({
  deals: visibleDeals.value,
  canLoadMore: canLoadMore.value,
  hasInfinteScroll: true,
}));

const { start } = useInfiniteSentinel(infiniteSentinelEl, () => {
  onLoadMore();
  if (canLoadMore.value) start();
});

const route = useRoute();

const selectCategoryFilterQuery = computed(() => ({
  ...asQueryObject(),
  search: route.query.search,
}));
</script>

<template>
  <HeaderSection
    :filter="filterConfig"
    :countdown-timer="countdownConfig"
    :title="title.HeaderSectionTitleHotel"
    :background-image="headerBackgroundImage"
    @submit="goToFilterPage"
  />

  <section
    class="max-w-8xl mx-auto mt-16 flex w-full flex-col gap-y-16 px-4 pt-2 min-[744px]:px-8 min-[1408px]:px-4"
  >
    <DealCardCarouselFocus
      :title="title.CarouselTitle"
      :show-arrows="true"
      :deals="popularDealList"
    />

    <DealCardCarouselDefault
      :title="title.HorizontalRowNewDealsTitle"
      :show-arrows="true"
      :deals="filteredNewTodayDeals"
    />

    <SelectCategory
      :title="title.CategorySectionTitle"
      :tiles="hexagonTiles"
      :dealList="filteredAllDeals"
      :filterQuery="selectCategoryFilterQuery"
      @view-all="goToFilterPage"
    />

    <GoogleMapsSection
      v-bind="mapConfig"
      v-model:overlayOpen="overlayOpen"
      v-model:expandedDealId="expandedDealId"
      @onMarkerClick="handleMarkerClick"
    />

    <DealCardCarouselDefault
      :title="title.LastSeenTitle"
      :show-arrows="true"
      :deals="filteredAllDeals"
    />

    <InformationBlockHotel
      v-if="hotelInformation"
      v-bind="hotelInformation"
      @view-all="goToFilterPage"
    />

    <DealCardCarouselDefault
      :title="title.CadeauTipsTitle"
      :show-arrows="true"
      :deals="filteredAllDeals"
    />

    <DealListSection
      :title="nearbyTitle"
      v-bind="dealsNearbyProps"
      @load-more="onLoadMore"
    />

    <DealCardCarouselDefault
      :title="title.FavoritesList"
      :show-arrows="true"
      :deals="favoriteDealList"
    />

    <DealListSection
      v-bind="moreDealsNearbyProps"
      :title="moreNearbyTitle"
    />

    <div
      ref="infiniteSentinelEl"
      class="h-px w-full"
      aria-hidden="true"
    />
  </section>
</template>
