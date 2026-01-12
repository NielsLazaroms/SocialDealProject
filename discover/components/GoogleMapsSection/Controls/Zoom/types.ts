export interface ZoomButtonProps {
  disableIncrease?: boolean;
  disableDecrease?: boolean;
}

export interface ZoomButtonEmits {
  (e: 'onIncreaseZoom'): void;
  (e: 'onDecreaseZoom'): void;
}
