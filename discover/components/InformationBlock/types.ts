import type { TextContainerProps } from './ContentContainer/types';

export interface InformationBlockProps {
  textProps: TextContainerProps;
  images: string[];
}

export interface InformationBlockEmits {
  (e: 'view-all'): void;
}
