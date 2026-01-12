import type { SectionTitleTextVariants, SectionTitleVariants } from './variants';

export interface SectionTitleProps {
  text: string;
  color?: string;
  position?: SectionTitleVariants['position'];
  size?: SectionTitleTextVariants['size'];
  textShadow?: SectionTitleTextVariants['textShadow'];
  showLines?: SectionTitleVariants['showLines'];
  moreDealsTextButton?: string;
}
