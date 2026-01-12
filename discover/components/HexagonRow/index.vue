<script setup lang="ts">
import { useHexagonRowActive } from '../../composables/useHexagonRowActive';
import type { HexagonProps } from './Tile/types';
import type { HexagonRowEmits, HexagonRowProps } from './types';

const props = defineProps<HexagonRowProps>();
const emit = defineEmits<HexagonRowEmits>();

const modelActiveId = defineModel<number>('activeId', { required: true });

const { activeId, setActiveTile } = useHexagonRowActive(modelActiveId, (id) => emit('select', id));

const getState = (tile: HexagonProps): HexagonProps['state'] => {
  if (tile.state === 'disabled') return 'disabled';
  return tile.category.id === activeId.value ? 'active' : 'inactive';
};

const select = (tileId: number) => setActiveTile(tileId);
</script>

<template>
  <div
    class="hide-scrollbar grid auto-cols-max grid-flow-col grid-rows-2 justify-start gap-x-0.5 gap-y-0 overflow-x-auto sm:justify-center lg:flex lg:justify-center lg:overflow-visible"
  >
    <HexagonRowTile
      v-for="tile in props.tiles"
      :key="tile.category.id"
      v-bind="tile"
      :state="getState(tile)"
      @select="select"
      class="even:-mt-[34px] even:translate-x-14 md:even:-mt-[38px] md:even:translate-x-16 lg:even:mt-0 lg:even:translate-x-0"
    >
      <template #icon>
        <slot
          name="icon"
          :tile="tile"
        />
      </template>
    </HexagonRowTile>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Voor IE, Edge en Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
