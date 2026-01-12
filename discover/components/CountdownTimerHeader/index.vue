<script setup lang="ts">
import { useCountDownTimer } from '~~/layers/discover/composables/useCountdown';
import type { TimerProps } from './types';

const props = withDefaults(defineProps<TimerProps>(), {
  text: 'Tot de nieuwe Social Deals',
});

const { displayHours, displayMinutes, displaySeconds } = useCountDownTimer(props.targetDate);
</script>

<template>
  <div
    class="relative inline-flex w-fit flex-col items-center gap-2 rounded-lg border-2 border-white/40 bg-white/10 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
  >
    <div class="flex justify-center gap-1 sm:gap-2">
      <CountdownTimerHeaderSegment>{{ displayHours }}</CountdownTimerHeaderSegment>
      <span class="self-center text-xl font-semibold text-neutral-900 sm:text-2xl"> : </span>
      <CountdownTimerHeaderSegment>{{ displayMinutes }}</CountdownTimerHeaderSegment>
      <span class="self-center text-xl font-semibold text-neutral-900 sm:text-2xl"> : </span>
      <CountdownTimerHeaderSegment>{{ displaySeconds }}</CountdownTimerHeaderSegment>
    </div>

    <p
      class="typography-body-l text-shadow text-center text-xs font-semibold text-white sm:text-sm md:text-base"
    >
      {{ props.text }}
    </p>
  </div>
</template>
