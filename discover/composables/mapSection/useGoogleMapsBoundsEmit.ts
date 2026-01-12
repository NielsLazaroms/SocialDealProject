export function useGoogleMapsBoundsEmit(options: UseGoogleMapsBoundsEmitArgs) {
  const { mapInstance, limitBoundEmit, onBoundsChanged } = options;
  function emitCurrentBounds() {
    const map = mapInstance.value;
    if (!map) return;

    const originalBounds = map.getBounds();
    if (!originalBounds) return;

    if (!limitBoundEmit) {
      onBoundsChanged(originalBounds);
      return;
    }

    const ne = originalBounds.getNorthEast();
    const sw = originalBounds.getSouthWest();

    const height = ne.lat() - sw.lat();
    const width = ne.lng() >= sw.lng() ? ne.lng() - sw.lng() : 360 - (sw.lng() - ne.lng());

    const topAdjust = height * (limitBoundEmit.top ?? 0);
    const bottomAdjust = height * (limitBoundEmit.bottom ?? 0);
    const leftAdjust = width * (limitBoundEmit.left ?? 0);
    const rightAdjust = width * (limitBoundEmit.right ?? 0);

    const north = ne.lat() - topAdjust;
    const east = ne.lng() - rightAdjust;
    const south = sw.lat() + bottomAdjust;
    const west = sw.lng() + leftAdjust;

    onBoundsChanged(
      new google.maps.LatLngBounds({ lat: south, lng: west }, { lat: north, lng: east }),
    );
  }

  return { emitCurrentBounds };
}
