import { tv, type VariantProps } from 'tailwind-variants';

export const textAlign = tv({
  variants: {
    position: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    position: 'left',
  },
});

export type TextAlignVariants = VariantProps<typeof textAlign>;
