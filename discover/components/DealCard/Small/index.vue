<script setup lang="ts">
import type { CardProps, DealCardEmits } from '../types';

const props = defineProps<CardProps>();
const expandedId = defineModel<number | null>('expandedId');

const emit = defineEmits<DealCardEmits>();

const smallHeaderProps = computed(() => ({
  image: props.header.image,
  discount: props.header.discount,
  favourite: props.favourite,
}));
</script>
<template>
  <template v-if="expandedId !== props.id">
    <DealCard class="w-full flex-row gap-y-3">
      <template #header>
        <div class="h-[180px] w-[40%]">
          <DealCardSmallHeader v-bind="smallHeaderProps" />
        </div>
      </template>
      <div class="mt-2 flex w-[50%] flex-col gap-y-2 px-2">
        <DealCardSmallTitle> {{ props.title }} </DealCardSmallTitle>
        <DealCardDefaultCompanyInformation v-bind="props.companyInformation" />
        <DealCardSmallPriceRow
          v-if="props.prices"
          v-bind="props.prices"
        ></DealCardSmallPriceRow>
      </div>

      <template #footer>
        <div class="hidden md:flex md:flex-col md:justify-center">
          <button @click="expandedId = props.id">
            <BaseIcon
              :name="'arrowRight'"
              class="size-5"
            />
          </button>
        </div>
      </template>
    </DealCard>
  </template>
  <template v-else>
    <DealCardDefault
      v-bind="props"
      @toggle-favorite="emit('toggle-favorite')"
    />
  </template>
</template>
