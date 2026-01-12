const getRandomIndex = (exclude: number, max: number) => {
  if (max <= 1) return 0;
  let next = exclude;
  while (next === exclude) next = Math.floor(Math.random() * max);
  return next;
};

export const useInspirationCountDown = (
  activeIndex: Ref<number>,
  max: number,
  durationMs: number,
) => {
  const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = () => {
    if (intervalId.value) return;

    intervalId.value = setInterval(() => {
      activeIndex.value = getRandomIndex(activeIndex.value, max);
    }, durationMs);
  };

  const stopCountdown = () => {
    if (!intervalId.value) return;
    clearInterval(intervalId.value);
    intervalId.value = null;
  };

  const restartCountdown = () => {
    stopCountdown();
    startCountdown();
  };

  return { startCountdown, stopCountdown, restartCountdown };
};
