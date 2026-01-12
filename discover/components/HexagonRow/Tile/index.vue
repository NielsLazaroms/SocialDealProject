<script setup lang="ts">
import type { HexagonProps, HexagonTileEmits } from './types';
import { hexagonTileStyles } from './variants';

const props = defineProps<HexagonProps>();
const emit = defineEmits<HexagonTileEmits>();

const isActive = computed(() => props.state === 'active');
const isDisabled = computed(() => props.state === 'disabled');

const select = () => {
  if (isDisabled.value) return;
  emit('select', props.category.id);
};
const styles = computed(() =>
  hexagonTileStyles({
    state: props.state,
    size: props.size,
  }),
);

const maskId = `hexMask-${useId()}-${props.category.id}`;
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    :class="styles.button()"
    @click="select"
  >
    <svg
      viewBox="0 0 100 100"
      class="size-full transition-colors duration-300 ease-out"
      :style="{ color: isActive ? props.category.color : 'var(--color-brand-100)' }"
      aria-hidden="true"
      style="pointer-events: none"
    >
      <defs>
        <mask
          :id="maskId"
          maskUnits="userSpaceOnUse"
        >
          <rect
            width="100"
            height="100"
            fill="black"
          />
          <polygon
            points="50,5 95,30 95,70 50,95 5,70 5,30"
            fill="white"
          />
        </mask>
      </defs>
      <polygon
        points="50,5 95,30 95,70 50,95 5,70 5,30"
        fill="none"
        stroke="currentColor"
        :stroke-width="isActive ? '5' : '2.5'"
        stroke-linejoin="round"
        :mask="`url(#${maskId})`"
        vector-effect="non-scaling-stroke"
        class="transition-[stroke-width] duration-300 ease-out"
      />

      <foreignObject
        x="8"
        y="20"
        width="84"
        height="80"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          class="flex h-full w-full flex-col items-center justify-start gap-1"
          :style="{ color: isActive ? props.category.color : 'var(--color-input-gray-700)' }"
        >
          <div
            class="flex size-6 items-center justify-center transition-[color] duration-300 ease-out"
          >
            <slot name="icon" />
          </div>

          <span :class="styles.label()">
            {{ props.category.label }}
          </span>
        </div>
      </foreignObject>
    </svg>
  </button>
</template>
