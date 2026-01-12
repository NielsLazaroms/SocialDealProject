import { tv } from 'tailwind-variants';

export const markerTv = tv({
  slots: {
    wrapper: 'relative flex flex-col items-center hover:scale-[1.05]',
    circle: 'flex size-9 items-center justify-center rounded-full bg-white border-2 shadow-md',
    icon: 'inline-block size-5',
    triangle:
      'absolute top-[33px] left-1/2 -translate-x-1/2 h-0 w-0 border-l-9 border-r-9 border-t-12 border-l-transparent border-r-transparent',

    triangleInner:
      'absolute left-1/2 top-[-13px] -translate-x-1/2 h-0 w-0 border-l-6 border-r-6 border-t-10 border-l-transparent border-r-transparent border-t-white',
  },
});
