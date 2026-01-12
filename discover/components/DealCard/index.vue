<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), {
  as: 'div',
});
</script>

<template>
  <component
    :is="props.as"
    class="bg-input-gray-100 relative flex rounded-lg shadow-md"
  >
    <template v-if="$slots.header">
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </component>
</template>
