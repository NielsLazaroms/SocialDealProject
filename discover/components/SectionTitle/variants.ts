import { tv, type VariantProps } from 'tailwind-variants';

export const sectionTitleTextVariants = tv({
  base: 'text-center font-bold',
  variants: {
    size: {
      small: 'typography-display-s',
      medium: 'typography-display-m',
      large: 'typography-display-l',
      xl: 'typography-display-xl',
    },
    textShadow: {
      none: '',
      shadow: 'text-shadow',
    },
  },
  defaultVariants: {
    size: 'small',
    textShadow: 'none',
  },
});

export const sectionTitleVariants = tv({
  variants: {
    position: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    },
    showLines: {
      true: "before:content-[''] before:h-1 before:w-16 before:rounded before:bg-current after:content-[''] after:h-1 after:w-16  after:rounded after:bg-current",
    },
  },
  defaultVariants: {
    position: 'left',
    showLines: false,
  },
});

export type SectionTitleTextVariants = VariantProps<typeof sectionTitleTextVariants>;
export type SectionTitleVariants = VariantProps<typeof sectionTitleVariants>;
