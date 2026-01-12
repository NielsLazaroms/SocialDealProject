<script setup lang="ts">
const props = defineProps<{ availability?: WeekdayKey[] }>();

const displayAvailability = computed(() => formatAvailability(props.availability, 'nl-NL'));
</script>

<template>
  <div class="flex max-h-14 min-h-14 flex-row flex-wrap gap-2">
    <div
      v-for="day in displayAvailability"
      :key="day"
      class="h-fit rounded-lg bg-green-50 px-2"
    >
      <p class="h-fit text-green-500 capitalize">{{ day }}</p>
    </div>
  </div>
</template>
