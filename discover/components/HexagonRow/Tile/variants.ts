import { tv, type VariantProps } from 'tailwind-variants';

export const hexagonTileStyles = tv({
  slots: {
    button:
      'flex items-center justify-center [clip-path:polygon(50%_5%,95%_30%,95%_70%,50%_95%,5%_70%,5%_30%)]',
    label:
      'typography-label-xxs w-full text-center transition-[color,text-shadow] duration-300 ease-out',
  },
  variants: {
    state: {
      active: {
        button: 'z-0',
        label: 'text-shadow-[0_0_0.45px_currentColor,0_0_0.8px_currentColor]',
      },
      inactive: {
        button: 'z-10',
        label: 'text-shadow-none',
      },
      disabled: {
        button: 'opacity-50 cursor-not-allowed',
        label: 'text-shadow-none',
      },
    },
    size: {
      responsive: {
        button: 'shrink-0 size-28 md:size-32 lg:size-48 lg:shrink-1',
      },
    },
  },
  defaultVariants: {
    state: 'inactive',
    size: 'responsive',
  },
});

export type HexagonTileVariants = VariantProps<typeof hexagonTileStyles>;
