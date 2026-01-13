<script setup lang="ts">
import {
  DefaultButton,
  DefaultButtonTypes,
  DefaultButtonRole,
  IconStyles,
  IconTypes,
  SharedIcons,
} from '@socialdeal/uikit3-shared';
import type { SelectCategoryEmits, SelectCategoryProps } from './types';

const props = defineProps<SelectCategoryProps>();
const deals = computed(() => props.dealList ?? []);
const allCategoryId = computed(() => {
  const all = props.tiles.find((t) => t.category.key === 'alle_deals');
  if (!all) throw new Error('SelectCategory: missing "alle_deals" tile');
  return all.category.id;
});

const emit = defineEmits<SelectCategoryEmits>();

const { activeIdModel, formattedCategoryTitle, activeCategoryLabel } = useActiveCategory(props);
const { filteredDeals } = useFilterDealsByCategory(deals, activeIdModel, allCategoryId);

const hasAnyDeals = computed(() => deals.value.length > 0);
const hasDealsForSelection = computed(() => filteredDeals.value.length > 0);
</script>
<template>
  <section>
    <SectionTitle v-bind="props.title" />
    <HexagonRow
      :tiles="props.tiles"
      v-model:activeId="activeIdModel"
    >
      <template #icon="{ tile }"> <BaseIcon :name="tile.category.icon" /> </template>
    </HexagonRow>
    <SectionTitle
      :text="formattedCategoryTitle"
      :position="'left'"
    >
      <template
        v-if="hasDealsForSelection"
        #action
      >
        <DefaultButton
          :text="'Bekijk alles'"
          :type="DefaultButtonTypes.Text"
          :role="DefaultButtonRole.Link"
          :icon-right="{
            type: IconTypes.Icon,
            props: {
              name: SharedIcons.ChevronRight,
              style: IconStyles.Shared,
            },
          }"
          @click="emit('view-all')"
        >
        </DefaultButton>
      </template>
    </SectionTitle>
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-250 ease-in-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-250 ease-in-out"
      leave-to-class="opacity-0"
    >
      <ul
        v-if="hasDealsForSelection"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        :key="activeIdModel"
      >
        <li
          v-for="deal in filteredDeals"
          :key="deal.id"
        >
          <slot :deal="deal"> </slot>
        </li>
      </ul>
      <div
        v-else
        :key="`empty-${activeIdModel}`"
        class="flex flex-col gap-y-4 text-center"
      >
        <slot name="empty">
          <template v-if="!hasAnyDeals">
            <p class="text-base">Er zijn momenteel geen deals beschikbaar.</p>
          </template>
          <template v-else>
            <p>
              Geen deals gevonden{{ activeCategoryLabel ? ` voor ${activeCategoryLabel}` : '' }}.
            </p>
            <DefaultButton
              v-if="activeIdModel !== allCategoryId"
              class="self-center"
              text="Toon alle deals"
              :type="DefaultButtonTypes.Outline"
              @click="activeIdModel = allCategoryId"
            />
          </template>
        </slot>
      </div>
    </Transition>
  </section>
</template>
