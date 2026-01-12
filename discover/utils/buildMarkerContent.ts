import { categoryIcons } from '../assets/icons';
import { markerTv } from '../components/GoogleMapsSection/Marker/markerStyles';
import type { GoogleMapsMarker } from '../components/GoogleMapsSection/types';

export function buildMarkerContent(p: GoogleMapsMarker): HTMLElement {
  const styles = markerTv();

  const wrapper = document.createElement('div');
  wrapper.className = styles.wrapper();

  const circle = document.createElement('div');
  circle.className = styles.circle();
  circle.style.borderColor = p.color;

  const icon = document.createElement('span');
  icon.className = styles.icon();
  icon.style.color = p.color;
  icon.innerHTML = categoryIcons[p.icon];

  const triangle = document.createElement('div');
  triangle.className = styles.triangle();
  triangle.style.borderTopColor = p.color;

  const inner = document.createElement('div');
  inner.className = styles.triangleInner();

  triangle.appendChild(inner);
  circle.appendChild(icon);
  wrapper.appendChild(circle);
  wrapper.appendChild(triangle);

  return wrapper;
}
