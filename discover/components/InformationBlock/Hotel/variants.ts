import { tv } from 'tailwind-variants';

export const imageSlot = tv({
  base: 'w-[75%] overflow-hidden rounded-3xl shadow-md md:w-[65%] lg:w-[80%]',
  variants: {
    slot: {
      start: 'self-start',
      end: 'self-end mb-4',
    },
  },
});
