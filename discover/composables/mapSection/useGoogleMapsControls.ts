export interface UseGoogleMapsControlsReturn {
  /**
   * Whether the map is currently in fullscreen mode.
   */
  isFullscreen: Ref<boolean>;

  /**
   * Toggles the fullscreen state of the map and triggers a resize.
   */
  toggleFullscreen(): void;

  /**
   * Whether zooming in is currently allowed.
   */
  canZoomIn: Ref<boolean>;

  /**
   * Whether zooming out is currently allowed.
   */
  canZoomOut: Ref<boolean>;

  /**
   * Zooms the map in by one level.
   */
  zoomIn(): void;

  /**
   * Zooms the map out by one level.
   */
  zoomOut(): void;

  /**
   * Syncs the internal zoom state with the current map zoom.
   */
  syncZoom(): void;
}

export function useGoogleMapsControls(
  options: UseGoogleMapsControlsArgs,
): UseGoogleMapsControlsReturn {
  const { mapInstance, maxZoom, minZoom } = options;
  const isFullscreen = ref(false);
  const currentZoom = ref<number | undefined>(undefined);

  function syncZoom() {
    currentZoom.value = mapInstance.value?.getZoom() ?? undefined;
  }

  const canZoomIn = computed(() => {
    if (maxZoom === undefined) return true;
    const z = currentZoom.value;
    return z === undefined ? true : z < maxZoom;
  });

  const canZoomOut = computed(() => {
    if (minZoom === undefined) return true;
    const z = currentZoom.value;
    return z === undefined ? true : z > minZoom;
  });

  function setZoomStep(step: 1 | -1) {
    const map = mapInstance.value;
    if (!map) return;

    const current = map.getZoom();
    if (current === undefined) return;

    if (step === 1 && maxZoom !== undefined && current >= maxZoom) return;
    if (step === -1 && minZoom !== undefined && current <= minZoom) return;

    const nextZoom = current + step;
    map.setZoom(nextZoom);
    currentZoom.value = nextZoom;
  }

  const zoomIn = () => setZoomStep(1);
  const zoomOut = () => setZoomStep(-1);

  function toggleFullscreen() {
    isFullscreen.value = !isFullscreen.value;

    nextTick(() => {
      const map = mapInstance.value;
      if (!map) return;

      google.maps.event.trigger(map, 'resize');
      const c = map.getCenter();
      if (c) map.setCenter(c);

      syncZoom();
    });
  }

  watch(
    mapInstance,
    (map) => {
      if (!map) return;
      syncZoom();
      map.addListener('zoom_changed', syncZoom);
    },
    { immediate: true },
  );

  return { isFullscreen, toggleFullscreen, canZoomIn, canZoomOut, zoomIn, zoomOut, syncZoom };
}
