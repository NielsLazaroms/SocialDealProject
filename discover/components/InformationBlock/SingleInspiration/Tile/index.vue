<script setup lang="ts">
import type { HexTileProps } from './types';
import { useHexSprite } from '~~/layers/discover/composables/useHexSprite';

const props = defineProps<HexTileProps>();

const tile = 100;
const { sheetWidth, sheetHeight, calculatePosition } = useHexSprite(
  tile,
  props.layoutRows,
  props.layoutCols,
);

const imagePos = computed(() => calculatePosition(props.col, props.row, props.rowOffset));

const clipId = computed(() => `hexClip-${props.col}-${props.row}`);
</script>

<template>
  <div class="size-36">
    <svg
      viewBox="0 0 100 100"
      class="size-full"
    >
      <defs>
        <clipPath :id="clipId">
          <polygon points="25,0 75,0 100,50 75,100 25,100 0,50" />
        </clipPath>
      </defs>

      <g
        v-if="image && !transparent"
        :clip-path="`url(#${clipId})`"
      >
        <image
          :href="image"
          :x="imagePos.horizontal"
          :y="imagePos.vertical"
          :width="sheetWidth"
          :height="sheetHeight"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </svg>
  </div>
</template>
