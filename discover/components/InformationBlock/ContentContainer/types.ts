import type { SectionTitleProps } from '~~/layers/discover/components/SectionTitle/types';
import type { TextAlignVariants } from '../variants';

export interface TextContainerProps {
  leadingHeader?: string;
  description: string;
  title: SectionTitleProps;
  position?: TextAlignVariants['position'];
  buttonText: string;
}
