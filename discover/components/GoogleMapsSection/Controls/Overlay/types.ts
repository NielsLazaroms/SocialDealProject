import type { IconName } from '../../../BaseIcon/index.vue';

export interface OverlayButtonProps {
  label?: string;
  icon?: IconName;
}

export interface OverlayButtonEmits {
  (e: 'on-click'): void;
}
