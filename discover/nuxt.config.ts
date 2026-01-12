export default defineNuxtConfig({
  $meta: {
    name: 'discover',
  },

  imports: {
    dirs: ['types/**', 'utils/**'],
  },
  css: ['swiper/css', 'swiper/css/navigation', 'swiper/css/pagination'],
});
