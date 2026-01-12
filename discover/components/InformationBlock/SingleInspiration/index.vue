<script setup lang="ts">
import type { InformationBlockProps } from '../types';
import { textAlign } from '../variants';
import { getSingleInspirationLayout } from './layout';
import { DefaultButton, DefaultButtonTypes } from '@socialdeal/uikit3-shared';

const props = defineProps<InformationBlockProps>();
const hexLayout = computed(() => getSingleInspirationLayout());

const layoutCols = computed(() => hexLayout.value.length);
const layoutRows = computed(
  () => Math.max(...hexLayout.value.flatMap((c) => c.cells.map((cell) => cell.row))) + 1,
);
</script>

<template>
  <InformationBlock>
    <template #leftSide>
      <InformationBlockMediaContainer class="flex flex-row justify-center gap-0 overflow-hidden">
        <div
          v-for="col in hexLayout"
          :key="`col-${col.col}`"
          class="flex flex-col gap-y-1"
          :class="{
            'translate-y-[4.6rem]': col.shiftDown,
            '-ml-[1.9rem]': col.shiftLeft,
          }"
        >
          <InformationBlockSingleInspirationTile
            v-for="cell in col.cells"
            :key="`cell-${col.col}-${cell.row}`"
            :transparent="cell.transparent"
            :image="props.images[0]"
            :col="col.col"
            :row="cell.row"
            :layout-rows="layoutRows"
            :layout-cols="layoutCols"
            :row-offset="cell.rowOffset"
          />
        </div>
      </InformationBlockMediaContainer>
    </template>
    <template #rightSide>
      <InformationBlockContentContainer>
        <span>{{ props.textProps.leadingHeader }}</span>
        <section-title v-bind="props.textProps.title" />
        <p :class="textAlign({ position: props.textProps.position })">
          {{ props.textProps.description }}
        </p>
        <div
          class="self-end"
          :style="{ color: props.textProps.title.color }"
        >
          <!-- TODO include link to inspiration page  -->

          <DefaultButton
            class="ring-current! hover:bg-current/5!"
            text-color="currentColor"
            :text="props.textProps.buttonText"
            :type="DefaultButtonTypes.Outline"
          />
        </div>
      </InformationBlockContentContainer>
    </template>
  </InformationBlock>
</template>
