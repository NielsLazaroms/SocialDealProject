<script setup lang="ts">
import { textAlign } from '../variants';
import type { InformationBlockEmits, InformationBlockProps } from '../types';
import { DefaultButton, DefaultButtonTypes, DefaultButtonRole } from '@socialdeal/uikit3-shared';

const props = defineProps<InformationBlockProps>();
const emit = defineEmits<InformationBlockEmits>();

const leftImages = computed(() => props.images.filter((_, index) => index % 2 === 0));

const rightImages = computed(() => props.images.filter((_, index) => index % 2 === 1));
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
        <div class="flex flex-row justify-center gap-x-3">
          <div class="flex flex-1 flex-col items-start gap-3 md:items-end lg:items-start">
            <NuxtImg
              v-for="leftImage in leftImages"
              :key="leftImage"
              :src="leftImage"
              alt="Restaurant afbeelding"
              class="w-full rounded-3xl object-cover md:w-[80%] lg:w-full"
            />
          </div>
          <div class="mt-5 flex flex-1 flex-col gap-3">
            <NuxtImg
              v-for="rightImage in rightImages"
              :key="rightImage"
              :src="rightImage"
              alt="Restaurant afbeelding"
              class="w-full rounded-3xl object-cover md:w-[80%] lg:w-full"
            />
          </div>
        </div>
      </InformationBlockMediaContainer>
    </template>
  </InformationBlock>
</template>
