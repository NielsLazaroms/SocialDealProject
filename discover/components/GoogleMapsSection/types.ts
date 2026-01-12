import type { CategoryIconName } from '../../assets/icons';
import type { GoogleMapsOverlayProps } from './Overlay/types';

export type GoogleMapsPosition = {
  northEast: google.maps.LatLngLiteral;
  southWest: google.maps.LatLngLiteral;
};

export type GoogleMapsControls = {
  fullScreen?: boolean;
  zoom?: boolean;
};

export type GoogleMapsOptions = {
  disableDragging?: boolean;
  showFullMap?: boolean;
  disableScrollZoom?: boolean;
};

export type GoogleMapsLimitBoundEmit = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type GoogleMapsMarker = {
  lat: number;
  lng: number;
  title?: string;
  id?: number;
  icon: CategoryIconName;
  color: string;
};

export type GoogleMapsProps = {
  position?: GoogleMapsPosition;
  controls?: GoogleMapsControls;
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number;
  mapId: string;
  options?: GoogleMapsOptions;
  limitBoundEmit?: GoogleMapsLimitBoundEmit;
  markers?: GoogleMapsMarker[];
  overlay?: GoogleMapsOverlayProps;
};

export type GoogleMapsMarkerClickPayload = {
  id?: number;
  title?: string;
  position: google.maps.LatLngLiteral;
};

export type GoogleMapsEmits = {
  (e: 'onFullScreenClick'): void;
  (e: 'onDragStart'): void;
  (e: 'onBoundsChanged', bounds: google.maps.LatLngBounds): void;
  (e: 'onMarkerClick', payload: GoogleMapsMarkerClickPayload): void;
  (e: 'onOverlayAfterEnter'): void;
};
