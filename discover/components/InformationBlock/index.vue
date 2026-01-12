<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), {
  as: 'div',
});
</script>

<template>
  <component
    :is="props.as"
    class="flex flex-col items-center gap-4 overflow-hidden md:flex-row"
  >
    <template v-if="$slots.leftSide">
      <slot name="leftSide" />
    </template>
    <template v-if="$slots.rightSide">
      <slot name="rightSide" />
    </template>
  </component>
</template>
