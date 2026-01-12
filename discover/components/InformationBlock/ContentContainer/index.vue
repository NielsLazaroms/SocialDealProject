<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), {
  as: 'div',
});
</script>

<template>
  <component
    :is="props.as"
    class="flex w-full flex-col gap-y-4 lg:w-[60%]"
  >
    <slot />
  </component>
</template>
