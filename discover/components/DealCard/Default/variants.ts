import { tv, type VariantProps } from 'tailwind-variants';

export const priceTextStyling = tv({
  slots: {
    main: 'text-center',
    fraction: 'typography-price-xs relative',
  },
  variants: {
    color: {
      green: { main: 'text-green-500' },
      gray: { main: 'text-gray-600' },
    },
    size: {
      small: { main: 'typography-price-xs' },
      big: { main: 'typography-price-m' },
    },
    fractionPosition: {
      withFraction: { fraction: '-top-0.5' },
      noFraction: { fraction: 'top-0' },
    },
  },
  defaultVariants: {
    color: 'gray',
    size: 'small',
    fractionPosition: 'noFraction',
  },
});

export const touristTaxTextColor = tv({
  base: 'text-center typography-body-s ',
  variants: {
    color: {
      green: 'text-green-500',
      gray: 'text-gray-700',
    },
  },
  defaultVariants: {
    color: 'gray',
  },
});

export type PriceTextStyling = VariantProps<typeof priceTextStyling>;
export type TouristTaxTextColor = VariantProps<typeof touristTaxTextColor>;
