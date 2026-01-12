<script setup lang="ts">
import type { SectionTitleProps } from './types';
import { DefaultButtonTypes, DefaultButtonSize, DefaultButton } from '@socialdeal/uikit3-shared';
import { sectionTitleTextVariants, sectionTitleVariants } from './variants';

const props = withDefaults(defineProps<SectionTitleProps>(), {
  color: '#00345D',
});

const slots = useSlots();
const showAction = computed(
  () =>
    props.position === 'left' &&
    (Boolean(slots.action) || Boolean(props.moreDealsTextButton?.trim())),
);
</script>

<template>
  <div class="flex items-center justify-between gap-4 py-2">
    <div
      class="flex flex-1 items-center gap-4"
      :class="sectionTitleVariants(props)"
      :style="{ color: props.color }"
    >
      <h1
        :class="sectionTitleTextVariants(props)"
        class="text-center font-bold"
      >
        {{ props.text }}
      </h1>
    </div>
    <div
      class="shrink-0"
      v-if="showAction"
    >
      <slot name="action">
        <DefaultButton
          class="text-brand-500 underline underline-offset-4"
          :type="DefaultButtonTypes.Text"
          :size="DefaultButtonSize.Normal"
          :text="props.moreDealsTextButton"
          :aria-label="props.moreDealsTextButton"
        ></DefaultButton>
      </slot>
    </div>
  </div>
</template>
