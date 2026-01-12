<script setup lang="ts">
import { DefaultButton, DefaultButtonTypes, DefaultButtonRole } from '@socialdeal/uikit3-shared';
import type { InformationBlockEmits, InformationBlockProps } from '../types';
import { textAlign } from '../variants';
import { imageSlot } from './variants';

const props = defineProps<InformationBlockProps>();
const emit = defineEmits<InformationBlockEmits>();

const slotForIndex = (index: number) => (index === 0 ? 'start' : 'end');
</script>

<template>
  <InformationBlock>
    <template #leftSide>
      <InformationBlockContentContainer>
        <span>{{ props.textProps.leadingHeader }}</span>
        <SectionTitle v-bind="props.textProps.title"></SectionTitle>
        <p :class="textAlign({ position: props.textProps.position })">
          {{ props.textProps.description }}
        </p>
        <DefaultButton
          class="self-center"
          :text="props.textProps.buttonText"
          :type="DefaultButtonTypes.Outline"
          :role="DefaultButtonRole.Link"
          @click="emit('view-all')"
        />
      </InformationBlockContentContainer>
    </template>
    <template #rightSide>
      <InformationBlockMediaContainer>
        <div class="flex w-full flex-col -space-y-5 md:-space-y-10 lg:-space-y-5">
          <div
            v-for="(src, index) in props.images"
            :key="`${index}-${src}`"
            :class="imageSlot({ slot: slotForIndex(index) })"
          >
            <NuxtImg
              :src="src"
              alt="Hotel afbeelding"
              class="size-full object-cover"
            />
          </div>
        </div>
      </InformationBlockMediaContainer>
    </template>
  </InformationBlock>
</template>
