<script setup lang="ts">
import { setOptions } from '@googlemaps/js-api-loader';
import type { GoogleMapsProps, GoogleMapsEmits } from './types';
import { useGoogleMapsBoundsEmit } from '../../composables/mapSection/useGoogleMapsBoundsEmit';
import { useGoogleMapsInit } from '../../composables/mapSection/useGoogleMapsInit';
import { useGoogleMapsMarkers } from '../../composables/mapSection/useGoogleMapsMarkers';
import { useGoogleMapsControls } from '../../composables/mapSection/useGoogleMapsControls';

const props = defineProps<GoogleMapsProps>();
const emit = defineEmits<GoogleMapsEmits>();

const overlayOpen = defineModel<boolean>('overlayOpen', { default: false });
const expandedDealId = defineModel<number | null>('expandedDealId', { default: null });

const mapElement = ref<HTMLDivElement>();

let optionsSet = (globalThis as any).__gmapsOptionsSet === true;

function ensureOptions() {
  if (optionsSet) return;
  const runtimeConfig = useRuntimeConfig();

  setOptions({
    key: runtimeConfig.public.googleMapsKey,
    v: 'weekly',
  });

  optionsSet = true;
  (globalThis as any).__gmapsOptionsSet = true;
}

const { mapInstance, createMap, attachCoreListeners, fitBoundsToPosition, cleanupMap } =
  useGoogleMapsInit({
    mapElement,
    props,
    onDragStart: () => emit('onDragStart'),
  });

const { isFullscreen, toggleFullscreen, canZoomIn, canZoomOut, zoomIn, zoomOut, syncZoom } =
  useGoogleMapsControls({
    mapInstance,
    minZoom: props.minZoom,
    maxZoom: props.maxZoom,
  });
const { emitCurrentBounds } = useGoogleMapsBoundsEmit({
  mapInstance,
  limitBoundEmit: props.limitBoundEmit,
  onBoundsChanged: (bounds) => emit('onBoundsChanged', bounds),
});
const { renderMarkers, cleanupMarkers } = useGoogleMapsMarkers({
  mapInstance,
  hasPosition: computed(() => !!props.position).value,
  showFullMap: props.options?.showFullMap,
  onMarkerClick: (payload) => emit('onMarkerClick', payload),
});

onMounted(async () => {
  await nextTick();
  if (!mapElement.value) return;

  ensureOptions();

  await createMap();
  syncZoom();

  attachCoreListeners(emitCurrentBounds);

  await renderMarkers(props.markers ?? []);
  fitBoundsToPosition();
});

// On revisiting a cached page, tell Google Maps to reload the markers
onActivated(() => {
  renderMarkers(props.markers ?? []);
});

// On updating the DOM, update the markers
onUpdated(() => {
  renderMarkers(props.markers ?? []);
});

watch(
  () => props.position,
  () => fitBoundsToPosition(),
);

watch(
  () => overlayOpen.value,
  (open) => {
    if (open && !isFullscreen.value) {
      toggleFullscreen();
    }
  },
);

onUnmounted(() => {
  cleanupMarkers();
  cleanupMap();
});
</script>

<template>
  <div
    :class="[
      'relative h-screen w-screen overflow-hidden transition-[height] duration-300 ease-in-out md:h-[400px] md:w-full',
      { 'md:z-10 md:h-[800px]': isFullscreen },
    ]"
  >
    <div
      ref="mapElement"
      class="size-full"
    />

    <GoogleMapsSectionControlsZoom
      v-if="props.controls?.zoom"
      class="can-hover:block absolute right-4 bottom-8 z-10 hidden"
      :disable-increase="!canZoomIn"
      :disable-decrease="!canZoomOut"
      @on-increase-zoom="zoomIn"
      @on-decrease-zoom="zoomOut"
    />

    <div class="absolute top-4 right-4 flex flex-row gap-x-4">
      <GoogleMapsSectionControlsOverlay
        :label="overlayOpen ? 'Close overlay' : 'Open overlay'"
        :icon="overlayOpen ? 'closeOverlay' : 'openOverlay'"
        class="z-10"
        @on-click="overlayOpen = !overlayOpen"
      />

      <GoogleMapsSectionControlsFullScreen
        v-if="props.controls?.fullScreen"
        class="z-10 hidden md:flex"
        :is-fullscreen="isFullscreen"
        @toggle="toggleFullscreen"
      />
    </div>
    <GoogleMapsSectionControlsOverlay
      class="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 transition-transform duration-300 ease-out lg:flex"
      :icon="overlayOpen ? 'chevronLeft' : 'chevronRight'"
      :class="{ 'lg:translate-x-[500px]': overlayOpen }"
      @on-click="overlayOpen = !overlayOpen"
    />

    <GoogleMapsSectionOverlay
      v-if="props.overlay"
      v-bind="props.overlay"
      v-model:overlayOpen="overlayOpen"
      v-model:expandedDealId="expandedDealId"
    />
  </div>
</template>

<style>
.gm-style iframe + div {
  border: none !important;
}
</style>
