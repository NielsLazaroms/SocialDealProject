export interface TileProps {
  index: number;
  styleObj: Record<string, string | number>;
  imageSrc?: string;
}

export interface TileEmits {
  (e: 'activate'): void;
}
