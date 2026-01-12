<script setup lang="ts">
import {
  categoryIcons,
  dealIcons,
  searchbarIcons,
  dropDownIcons,
  mapIcons,
} from '../../assets/icons';

const iconMap = {
  ...dealIcons,
  ...categoryIcons,
  ...mapIcons,
  ...searchbarIcons,
  ...dropDownIcons,
} as const;

export type IconName = keyof typeof iconMap;

const props = defineProps<{
  name: IconName;
}>();

const svg = computed(() => iconMap[props.name]);
</script>

<template>
  <span
    class="inline-block"
    v-html="svg"
  />
</template>

<style scoped>
span :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
