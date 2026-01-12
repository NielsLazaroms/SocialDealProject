<script setup lang="ts">
import type { CardProps, DealCardEmits } from '../types';

const props = defineProps<CardProps>();

const emit = defineEmits<DealCardEmits>();
</script>
<template>
  <DealCard class="flex flex-col gap-y-4 hover:cursor-pointer">
    <template #header>
      <DealCardDefaultHeader v-bind="props.header" />
    </template>
    <div class="mt-2 flex flex-row justify-between px-2">
      <DealCardDefaultTitle> {{ props.title }} </DealCardDefaultTitle>
      <DealCardDefaultFavoriteButton
        :favourite="props.favourite"
        @toggle-favorite="emit('toggle-favorite')"
      />
    </div>
    <DealCardDefaultCompanyInformation
      class="px-2"
      v-bind="props.companyInformation"
    />
    <DealCardDefaultDetailsRow v-bind="props.detailRow" />
    <span class="bg-brand-100 h-0.5 w-[90%] self-center rounded-lg px-2"></span>
    <template #footer>
      <DealCardDefaultPriceRow
        v-if="props.prices"
        v-bind="props.prices"
      ></DealCardDefaultPriceRow>
    </template>
  </DealCard>
</template>
