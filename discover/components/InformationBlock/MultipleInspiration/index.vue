<script setup lang="ts">
import { useInspirationGrid } from '~~/layers/discover/composables/multipleInspiration/useInspirationGrid';
import Tile from './Tile/index.vue';
import type { MultipleInspirationProps } from './types';
import { textAlign } from '../variants';
import { DefaultButton, DefaultButtonTypes } from '@socialdeal/uikit3-shared';

const props = defineProps<MultipleInspirationProps>();
const blocks = computed(() => props.blocks);

const {
  activeBlock,
  imagesForTiles,
  tiles,
  tileStyle,
  setActiveByTile,
  activeTileItem,
  startCountdown,
  stopCountdown,
} = useInspirationGrid(blocks, props.transitionDurationMs);

onMounted(() => {
  startCountdown();
});
onUnmounted(() => {
  stopCountdown();
});
</script>

<template>
  <div
    @mouseenter="stopCountdown()"
    @mouseleave="startCountdown()"
  >
    <InformationBlock>
      <template #leftSide>
        <InformationBlockMediaContainer class="flex justify-center">
          <TransitionGroup
            name="tiles"
            tag="div"
            role="grid"
            aria-label="Inspiration tiles"
            class="grid w-fit auto-cols-[100px] grid-flow-col auto-rows-[100px] gap-2.5 rounded-2xl p-3"
          >
            <Tile
              v-for="tile in tiles"
              :key="tile.index"
              :index="tile.index"
              :style-obj="tileStyle(tile)"
              :image-src="imagesForTiles[tile.index]"
              @activate="() => setActiveByTile(tile.index)"
            />
          </TransitionGroup>
        </InformationBlockMediaContainer>
      </template>
      <template #rightSide>
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          leave-active-class="transition-all duration-300 ease-in"
          leave-to-class="opacity-0 translate-y-1"
          mode="out-in"
        >
          <InformationBlockContentContainer
            v-if="activeBlock"
            :key="activeTileItem?.blockIndex"
          >
            <span>{{ activeBlock?.textProps.leadingHeader }}</span>
            <section-title v-bind="activeBlock?.textProps.title" />
            <p :class="textAlign({ position: activeBlock?.textProps.position })">
              {{ activeBlock?.textProps.description }}
            </p>
            <!-- TODO include link to inspiration page  -->
            <div
              class="self-end"
              :style="{ color: activeBlock.textProps.title.color }"
            >
              <DefaultButton
                class="ring-current! hover:bg-current/5!"
                text-color="currentColor"
                :text="activeBlock.textProps.buttonText"
                :type="DefaultButtonTypes.Outline"
              />
            </div>
          </InformationBlockContentContainer>
        </Transition>
      </template>
    </InformationBlock>
  </div>
</template>

<style>
.tiles-move {
  transition: transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-origin: top left;
  will-change: transform;
}

.tiles-enter-active,
.tiles-leave-active {
  transition:
    opacity 240ms ease,
    transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.tiles-enter-from,
.tiles-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .tiles-move,
  .tiles-enter-active,
  .tiles-leave-active {
    transition-duration: 0ms !important;
  }
}
</style>
