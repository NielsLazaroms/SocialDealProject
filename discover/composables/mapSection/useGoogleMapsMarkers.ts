import { importLibrary } from '@googlemaps/js-api-loader';
import type { ShallowRef } from 'vue';
import type { GoogleMapsMarker } from '../../components/GoogleMapsSection/types';
import type { UseGoogleMapsMarkersArgs } from '../../types/mapTypes';

export interface UseGoogleMapsMarkersReturn {
  /**
   * Reactive list of active Google Maps marker instances.
   */
  markerInstances: ShallowRef<google.maps.marker.AdvancedMarkerElement[]>;

  /**
   * Renders markers for the given marker data.
   */
  renderMarkers(points: GoogleMapsMarker[]): Promise<void>;

  /**
   * Removes all markers and cleans up listeners.
   */
  cleanupMarkers(): void;
}

export function useGoogleMapsMarkers(
  options: UseGoogleMapsMarkersArgs,
): UseGoogleMapsMarkersReturn {
  const { mapInstance, showFullMap, hasPosition, onMarkerClick } = options;
  const markerInstances = shallowRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  function clearMarkers() {
    for (const marker of markerInstances.value) {
      google.maps.event.clearInstanceListeners(marker);
      marker.map = null;
    }
    markerInstances.value = [];
  }

  async function renderMarkers(points: GoogleMapsMarker[]) {
    const map = mapInstance.value;
    if (!map) return;

    clearMarkers();

    const { AdvancedMarkerElement } = (await importLibrary('marker')) as google.maps.MarkerLibrary;

    const shouldFitBounds = !hasPosition && !!points.length && !showFullMap;
    const bounds = shouldFitBounds ? new google.maps.LatLngBounds() : null;

    await Promise.all(
      points.map((p) => {
        const position: google.maps.LatLngLiteral = { lat: p.lat, lng: p.lng };

        const marker = new AdvancedMarkerElement({
          map,
          position,
          title: p.title,
          content: buildMarkerContent(p),
        });

        if (onMarkerClick) {
          marker.addListener('gmp-click', () => {
            onMarkerClick({
              id: p.id,
              title: p.title,
              position,
            });
          });
        }

        markerInstances.value.push(marker);
        bounds?.extend(position);
      }),
    );

    if (bounds) {
      map.fitBounds(bounds, 50);
    }
  }

  return {
    markerInstances,
    renderMarkers,
    cleanupMarkers: clearMarkers,
  };
}
