import { importLibrary } from '@googlemaps/js-api-loader';
import type { ShallowRef } from 'vue';

export interface UseGoogleMapsInitReturn {
  /**
   * The active Google Maps instance (or null if not yet created or already cleaned up).
   */
  mapInstance: ShallowRef<google.maps.Map | null>;

  /**
   * Creates the map and assigns it to `mapInstance.value`.
   *
   * @returns The created map, or null if the map element is not available.
   */
  createMap(): Promise<google.maps.Map | null>;

  /**
   * Attaches the core Google Maps event listeners.
   *
   * @param emitCurrentBounds Callback used to emit the current map bounds.
   */
  attachCoreListeners(emitCurrentBounds: () => void): void;

  /**
   * Fits the map bounds to the provided position (if available).
   */
  fitBoundsToPosition(): void;

  /**
   * Removes all map listeners and resets internal references.
   */
  cleanupMap(): void;
}

export function useGoogleMapsInit(options: UseGoogleMapsInitArgs): UseGoogleMapsInitReturn {
  const mapInstance: ShallowRef<google.maps.Map | null> = shallowRef(null);
  const { mapElement, props, onDragStart } = options;

  const disableBoundsUpdate = ref(true);

  async function createMap() {
    if (!mapElement.value) return null;

    const fallbackCenter: google.maps.LatLngLiteral = { lat: 51.6853, lng: 5.2917 };
    const fallbackZoom = props.initialZoom ?? defaultInitialZoom;

    const { Map } = await importLibrary('maps');

    const map = new Map(mapElement.value, {
      disableDefaultUI: true,
      gestureHandling: props.options?.disableDragging ? 'none' : 'greedy',
      scrollwheel: props.options?.disableScrollZoom ? false : undefined,
      clickableIcons: false,
      isFractionalZoomEnabled: true,
      minZoom: props.minZoom ?? defaultMinZoom,
      maxZoom: props.maxZoom ?? defaultMaxZoom,
      center: props.options?.showFullMap ? { lat: 0, lng: 0 } : fallbackCenter,
      zoom: props.options?.showFullMap ? (props.minZoom ?? defaultMinZoom) : fallbackZoom,
      ...(props.mapId ? ({ mapId: props.mapId } as google.maps.MapOptions) : {}),
      restriction: {
        latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
        strictBounds: false,
      },
    });

    mapInstance.value = map;
    return map;
  }

  function attachCoreListeners(emitCurrentBounds: () => void) {
    const map = mapInstance.value;
    if (!map) return;

    map.addListener('dragstart', () => onDragStart?.());

    map.addListener('bounds_changed', () => {
      if (disableBoundsUpdate.value) return;
      emitCurrentBounds();
    });

    map.addListener('idle', () => {
      if (disableBoundsUpdate.value) {
        disableBoundsUpdate.value = false;
        emitCurrentBounds();
      }
    });
  }

  function fitBoundsToPosition() {
    const map = mapInstance.value;
    if (!map || !props.position) return;

    const bounds = new google.maps.LatLngBounds(props.position.southWest, props.position.northEast);
    map.fitBounds(bounds, 0);
  }

  function cleanupMap() {
    if (mapInstance.value) google.maps.event.clearInstanceListeners(mapInstance.value);
    mapInstance.value = null;
  }

  return { mapInstance, createMap, attachCoreListeners, fitBoundsToPosition, cleanupMap };
}
