import type { ShallowRef } from 'vue';
import type {
  GoogleMapsLimitBoundEmit,
  GoogleMapsMarkerClickPayload,
  GoogleMapsProps,
} from '../components/GoogleMapsSection/types';

export const defaultMinZoom = 9;
export const defaultMaxZoom = 19;
export const defaultInitialZoom = 10;

export type UseGoogleMapsMarkersArgs = {
  mapInstance: ShallowRef<google.maps.Map | null>;
  showFullMap?: boolean;
  hasPosition?: boolean;
  onMarkerClick?: (payload: GoogleMapsMarkerClickPayload) => void;
};

export type UseGoogleMapsInitArgs = {
  mapElement: Ref<HTMLDivElement | undefined>;
  props: GoogleMapsProps;
  onDragStart?: () => void;
};

export type UseGoogleMapsBoundsEmitArgs = {
  mapInstance: ShallowRef<google.maps.Map | null>;
  limitBoundEmit?: GoogleMapsLimitBoundEmit;
  onBoundsChanged: (bounds: google.maps.LatLngBounds) => void;
};

export type UseGoogleMapsControlsArgs = {
  mapInstance: ShallowRef<google.maps.Map | null>;
  minZoom?: number;
  maxZoom?: number;
};
