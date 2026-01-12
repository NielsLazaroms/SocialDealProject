import { leadingZero } from '../utils/formatLeadingZero';

export const useCountDownTimer = (targetDate: Date) => {
  const startNow = useState<number>('countdown-start-now', () => Date.now());

  const nowMs = ref<number>(startNow.value);
  const timerId = ref<ReturnType<typeof setInterval> | null>(null);

  const timeDifference = computed(() => Math.max(0, targetDate.getTime() - nowMs.value));
  const isExpired = computed(() => timeDifference.value <= 0);

  const ms_per_second = 1000;
  const ms_per_minute = ms_per_second * 60;
  const ms_per_hour = ms_per_minute * 60;
  const ms_per_day = ms_per_hour * 24;

  const displayHours = computed(() =>
    leadingZero(Math.floor((timeDifference.value % ms_per_day) / ms_per_hour)),
  );
  const displayMinutes = computed(() =>
    leadingZero(Math.floor((timeDifference.value % ms_per_hour) / ms_per_minute)),
  );
  const displaySeconds = computed(() =>
    leadingZero(Math.floor((timeDifference.value % ms_per_minute) / ms_per_second)),
  );

  onMounted(() => {
    timerId.value = setInterval(() => {
      nowMs.value = Date.now();
      if (isExpired.value && timerId.value) {
        clearInterval(timerId.value);
        timerId.value = null;
      }
    }, 1000);
  });

  onUnmounted(() => {
    if (timerId.value) clearInterval(timerId.value);
  });

  return {
    displayHours,
    displayMinutes,
    displaySeconds,
  };
};
