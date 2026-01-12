<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), {
  as: 'div',
});
</script>

<template>
  <component
    :is="props.as"
    class="w-full min-w-0 overflow-hidden lg:w-[40%]"
  >
    <slot />
  </component>
</template>
