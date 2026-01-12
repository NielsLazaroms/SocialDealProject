import type { Ref } from 'vue';
import type { CityItem } from '../../types/cities';
import type { ListItemProps } from '@socialdeal/uikit3-travel';
import type {
  FilterbarCategoryProps,
  FilterbarLocationProps,
  FilterbarRatingProps,
} from '../../components/Filterbar/Forms';

export function useNearbyFilterbar(args: {
  cityList: Ref<CityItem[]>;
  categoryData: Ref<CategoryProps[] | undefined>;
  models: Record<string, any>;
  syncUrl: () => void;
  closeAll: () => void;
  isOpen: (k: 'location' | 'category' | 'rating') => boolean;
  toggleOpen: (k: 'location' | 'category' | 'rating') => void;
}) {
  const locationModel = args.models.location as Ref<string | null>;
  const categoryModel = args.models.category as Ref<string | null>;
  const ratingModel = args.models.rating as Ref<string | null>;

  const cityQuery = ref('');
  const categoryQuery = ref('');

  const ratingOptions = [
    { key: null, label: 'Geen voorkeur' },
    { key: '5', label: '5 sterren of meer' },
    { key: '4', label: '4 sterren of meer' },
    { key: '3', label: '3 sterren of meer' },
    { key: '2', label: '2 sterren of meer' },
    { key: '1', label: '1 ster of meer' },
  ];

  const filteredCities = computed(() => {
    const q = cityQuery.value.trim().toLowerCase();
    if (!q) return args.cityList.value;
    return args.cityList.value.filter((c) => c.city.toLowerCase().includes(q));
  });

  const filteredCategories = computed(() => {
    const q = categoryQuery.value.trim().toLowerCase();
    if (!q) return args.categoryData.value ?? [];
    return (args.categoryData.value ?? []).filter((c) => c.label.toLowerCase().includes(q));
  });

  const activeCityIndex = computed(() =>
    filteredCities.value.findIndex((c) => c.city === locationModel.value),
  );

  const activeCategoryIndex = computed(() =>
    filteredCategories.value.findIndex((c) => c.key === categoryModel.value),
  );

  const activeRatingIndex = computed(() =>
    ratingOptions.findIndex((o) => o.key === ratingModel.value),
  );

  const selectedCategoryLabel = computed(() => {
    const key = categoryModel.value;
    if (!key) return undefined;
    const cat = (args.categoryData.value ?? []).find((c) => c.key === key);
    return cat?.label;
  });

  const selectedRatingLabel = computed(() => {
    if (!ratingModel.value) return undefined;
    const o = ratingOptions.find((o) => o.key === ratingModel.value);
    return o?.label;
  });

  const locationItems = computed<ListItemProps[]>(() =>
    filteredCities.value.map((c) => ({
      text: c.city,
      onClick: async () => {
        locationModel.value = c.city;
        await nextTick();
        args.syncUrl();
        args.closeAll();
      },
    })),
  );

  const categoryItems = computed<ListItemProps[]>(() =>
    filteredCategories.value.map((cat) => ({
      text: cat.label,
      icons: cat.icon ? [cat.icon] : [],
      onClick: async () => {
        categoryModel.value = cat.key;
        await nextTick();
        args.syncUrl();
        args.closeAll();
      },
    })),
  );

  const ratingItems = computed<ListItemProps[]>(() =>
    ratingOptions.map((o) => ({
      text: o.key === null ? 'Geen voorkeur' : 'of meer',
      icons: o.key ? Array(Number(o.key)).fill('starFilled') : [],
      iconsClass: 'text-yellow-500',
      onClick: async () => {
        ratingModel.value = o.key;
        await nextTick();
        args.syncUrl();
        args.closeAll();
      },
    })),
  );

  const categorySection = computed<FilterbarCategoryProps>(() => ({
    open: args.isOpen('category'),

    dropdownProps: {
      placeholder: 'Kies een categorie...',
      label: 'Categorieën',
      disableBorder: true,
      value: selectedCategoryLabel.value,
      active: args.isOpen('category'),
    },

    onToggle: () => args.toggleOpen('category'),
    onClose: args.closeAll,
    onChange: (v: string | null) => {
      categoryModel.value = v;
      args.closeAll();
    },

    selectListProps: {
      items: categoryItems.value,
      activeIndex: activeCategoryIndex.value >= 0 ? activeCategoryIndex.value : undefined,
      searchableFilterProps: {
        name: 'categoryFilterInput',
        placeholder: 'Zoek categorieën',
        value: categoryQuery.value,
        errorMessage: 'Er is geen categorie genaamd:',
      },
      onQueryChange: (v: string) => (categoryQuery.value = v),
    },
  }));

  const locationSection = computed<FilterbarLocationProps>(() => ({
    open: args.isOpen('location'),

    dropdownProps: {
      placeholder: 'Kies jouw locatie...',
      label: 'Steden',
      disableBorder: true,
      value: locationModel.value ?? undefined,
      active: args.isOpen('location'),
    },

    onToggle: () => args.toggleOpen('location'),
    onClose: args.closeAll,
    onChange: (v: string | null) => {
      locationModel.value = v;
      args.closeAll();
    },

    selectListProps: {
      items: locationItems.value,
      activeIndex: activeCityIndex.value >= 0 ? activeCityIndex.value : undefined,
      searchableFilterProps: {
        name: 'cityFilterInput',
        placeholder: 'Zoek steden',
        value: cityQuery.value,
        errorMessage: 'Er is geen stad genaamd:',
      },
      onQueryChange: (v: string) => (cityQuery.value = v),
    },
  }));

  const ratingSection = computed<FilterbarRatingProps>(() => ({
    open: args.isOpen('rating'),

    dropdownProps: {
      placeholder: 'Geen voorkeur',
      label: 'Beoordelingen',
      disableBorder: true,
      value: selectedRatingLabel.value,
      active: args.isOpen('rating'),
    },

    onToggle: () => args.toggleOpen('rating'),
    onClose: args.closeAll,
    onChange: (v: string | null) => {
      ratingModel.value = v;
      args.closeAll();
    },

    selectListProps: {
      items: ratingItems.value,
      activeIndex: activeRatingIndex.value >= 0 ? activeRatingIndex.value : undefined,
    },
  }));

  return {
    locationModel,
    categoryModel,
    ratingModel,
    cityQuery,
    categoryQuery,
    locationSection,
    categorySection,
    ratingSection,
  };
}
