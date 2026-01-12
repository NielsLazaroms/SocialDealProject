<script setup lang="ts">
import { InputText } from '@socialdeal/uikit3-shared';
import { ListItem } from '@socialdeal/uikit3-travel';
import type { SelectListProps } from './types';

const props = defineProps<SelectListProps>();
</script>

<template>
  <div
    class="border-brand-500 absolute z-50 -mt-0.5 w-full rounded-b-lg border-x-2 border-b-2 bg-white"
  >
    <InputText
      v-if="props.searchableFilterProps"
      class="mx-4 my-2"
      v-bind="props.searchableFilterProps"
      @onValueChange="(_, v) => props.onQueryChange?.(v)"
    />

    <div class="not-touch:max-h-[350px] not-touch:overflow-y-auto scrollbar-thin min-h-[200px]">
      <template v-if="props.items.length > 0">
        <div
          v-for="(item, index) in props.items"
          class="hover:bg-brand-50 flex w-full flex-row items-center gap-x-1 pl-5 hover:cursor-pointer"
          :class="item.disableItemPadding ? 'first:pl-0' : ''"
          :key="index"
          @click="item.onClick?.()"
        >
          <BaseIcon
            v-for="(ic, i) in item.icons"
            :key="i"
            :name="ic"
            class="size-5"
            :class="item.iconsClass ?? 'text-gray-700'"
          />
          <ListItem
            class="pointer-events-none"
            v-bind="item"
            variant="select"
            :disable-arrow="true"
            :active="props.activeIndex === index"
          />
        </div>
      </template>

      <template v-else>
        <div class="typography-body-m px-4 py-6 text-center">
          {{ props.searchableFilterProps?.errorMessage }}
          <template
            v-if="
              props.searchableFilterProps &&
              (props.searchableFilterProps?.value ?? '').trim().length > 0
            "
          >
            <span class="font-medium"> “{{ props.searchableFilterProps!.value }}”</span>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
  margin-right: 4px;
}
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
</style>
