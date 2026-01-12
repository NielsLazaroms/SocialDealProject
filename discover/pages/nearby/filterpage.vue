<script setup lang="ts">
import {
  DefaultButton,
  DefaultButtonTypes,
  IconStyles,
  IconTypes,
  InputText,
  SocialDealIcons,
} from '@socialdeal/uikit3-shared';
import {
  FilterLabelGroup,
  SortDropdown,
  type FilterLabelProps,
  type SortDropdownOption,
} from '@socialdeal/uikit3-travel';

import { titles } from '../../data/titles';

import { useDealsFilters } from '../../composables/filter/useDealFilters';
import { useOpenKey } from '../../composables/filter/useOpenKey';
import { useNearbyFilterbar } from '../../composables/nearby/useFilterbar';
import { useDealSearch } from '../../composables/search/useDealSearch';

const title = titles;

const { data: categoryData } = await useFetch('/discover/nearbyCategories', {
  transform: (list) => list.map(categoryMapper),
});

const { data: cityList } = await useFetch<CityItem[]>('/discover/cities', {
  default: () => [],
});

const defaultLocation = computed(() => cityList.value[0]?.city);

const { instances, models, applyTo, syncUrl, clearAll, clear } = useDealsFilters({
  location: defaultLocation.value,
});

const activeInstances = computed(() => instances.filter((i) => i?.getLabel?.()));
const hasActive = computed(() => activeInstances.value.length > 0);

const categoriesById = computed<Record<number, CategoryProps>>(() =>
  Object.fromEntries((categoryData.value ?? []).map((c) => [c.id, c])),
);

const { data: apiDeals } = await useFetch('/discover/nearbyDeals', {
  default: () => [],
  transform: (response) => response.map((d) => dealMapper(d, categoriesById.value)),
});

const filteredDeals = applyTo(apiDeals);

const route = useRoute();

const searchModel = computed<string>({
  get() {
    const value = route.query.search;
    if (Array.isArray(value)) return value[0] ?? '';
    return value ?? '';
  },
  set(val) {
    const next = { ...route.query };
    const value = val.trim();

    if (value) next.search = value;
    else delete next.search;

    navigateTo({ query: next, replace: true });
  },
});

const { searchedDeals } = useDealSearch({
  list: filteredDeals,
  query: searchModel,
});

const showSearchEmptyState = computed(
  () => searchModel.value.trim().length > 0 && searchedDeals.value.length === 0,
);

const { sortOptions, selectedSort, onSortSelect, sortedDeals } = useDealSortDropdown(searchedDeals);

const activeFilterLabels = computed<FilterLabelProps[]>(() =>
  activeInstances.value
    .map((i) => {
      const raw = String(i.getLabel?.() ?? '').trim();

      const cleaned = raw.includes(':') ? raw.split(':').slice(1).join(':').trim() : raw;

      return {
        id: String(i.key),
        label: {
          text: formatFilterLabel(cleaned),
        },
      };
    })
    .filter((l) => l.label.text.length > 0),
);

const deleteAllLabel = computed<FilterLabelProps | undefined>(() => {
  if (!hasActive.value) return undefined;

  return {
    id: 'delete-all',
    label: { text: 'Verwijder alles' },
    iconRight: {
      type: IconTypes.Icon,
      props: {
        name: SocialDealIcons.Trash,
        style: IconStyles.SocialDeal,
      },
    },
  };
});

const { isOpen, toggleOpen, closeAll } = useOpenKey(['location', 'category', 'rating'] as const);

const { locationModel, locationSection, categorySection, ratingSection } = useNearbyFilterbar({
  cityList,
  categoryData,
  models,
  syncUrl,
  closeAll,
  isOpen,
  toggleOpen,
});

const filterConfig = computed(() => ({
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

const { isFavorite, toggle } = useFavorites();
</script>

<template>
  <HeaderSection
    :filter="filterConfig"
    :countdown-timer="countdownConfig"
    :title="title.HeaderSectionTitleNearby"
    :background-image="headerBackgroundImage"
  />

  <section
    class="max-w-8xl mx-auto mt-16 flex w-full flex-col gap-y-16 px-4 pt-2 min-[744px]:px-8 min-[1408px]:px-4"
  >
    <section class="flex flex-col gap-y-8">
      <div class="flex w-full flex-row flex-wrap items-center gap-4">
        <div class="relative flex min-w-60 flex-1">
          <InputText
            class="w-full"
            name="search"
            placeholder="Zoeken…"
            :value="searchModel"
            @onValueChange="(_, v) => (searchModel = v)"
            :leadingIcon="{
              type: IconTypes.Icon,
              props: {
                name: SocialDealIcons.MagnifyingGlass,
                style: IconStyles.SocialDeal,
                classNames: 'text-gray-400',
              },
            }"
          />
          <button
            v-if="searchModel"
            type="button"
            class="absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center"
            @click="searchModel = ''"
          >
            <BaseIcon
              name="close"
              class="size-4"
            />
          </button>
        </div>

        <DefaultButton
          class="w-fit shrink-0 self-center rounded-3xl! lg:px-8!"
          :type="DefaultButtonTypes.Outline"
          text="Toon op kaart"
          :disabled="true"
          background-color="white"
          :icon-left="{
            type: IconTypes.Icon,
            props: {
              name: SocialDealIcons.Sliders,
              style: IconStyles.SocialDeal,
              classNames: 'text-gray-400',
            },
          }"
        />
        <DefaultButton
          class="w-fit shrink-0 self-center rounded-3xl! lg:px-8!"
          :type="DefaultButtonTypes.Outline"
          text="Filters"
          :disabled="true"
          background-color="white"
          :icon-left="{
            type: IconTypes.Icon,
            props: {
              name: SocialDealIcons.LocationPin,
              style: IconStyles.SocialDeal,
              classNames: 'text-gray-400',
            },
          }"
        />

        <div class="relative z-10">
          <SortDropdown
            label="Sorteren"
            :options="sortOptions as SortDropdownOption[]"
            :value="selectedSort.value"
            @onSelect="onSortSelect"
          />
        </div>
      </div>

      <FilterLabelGroup
        class="hidden sm:block"
        :labels="activeFilterLabels"
        :deleteAllLabel="deleteAllLabel"
        @onFilterClick="({ id }) => clear(id)"
        @onDeleteAllClick="clearAll"
      />
    </section>

    <ul
      v-if="searchedDeals.length"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <DealCardDefault
        v-for="deal in sortedDeals"
        :key="`deal-${deal.id}`"
        v-bind="deal"
        :favorite-deal="{ favourite: isFavorite(deal.id) }"
        @toggle-favorite="toggle(deal.id)"
        as="li"
      />
    </ul>

    <div
      v-else-if="showSearchEmptyState"
      class="flex flex-col items-center justify-center gap-2 py-16 text-center"
    >
      <h3 class="typography-body-l font-semibold">Geen resultaten gevonden</h3>
      <p class="typography-body-m text-gray-600">
        We konden geen deals vinden voor <span class="font-medium">“{{ searchModel }}”</span>.
      </p>
    </div>
  </section>
</template>
