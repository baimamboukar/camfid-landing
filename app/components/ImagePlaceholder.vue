<script setup>
import { defineProps } from "vue";

const props = defineProps({
  isVideo: {
    type: Boolean,
    default: false,
  },
  videoLink: {
    type: String,
    default: null,
  },
  path: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div
    class="bg-gray-900/5 dark:bg-white/5 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 rounded-xl lg:-m-4 p-4"
  >
    <div
      class="aspect-w-16 aspect-h-9 rounded-lg relative overflow-hidden border border-dashed border-gray-900/10 dark:border-white/10"
    >
      <!-- Check if it's a video and render the video tag -->
      <template v-if="isVideo && videoLink">
        <video
          class="absolute inset-0 h-full w-full object-cover"
          controls
          :src="videoLink"
          alt="Video"
        />
      </template>

      <!-- Otherwise, render the image -->
      <template v-else-if="path">
        <img
          :src="props.path"
          alt="Image"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </template>

      <!-- Placeholder if no video or image -->
      <template v-else>
        <svg
          class="absolute inset-0 h-full w-full stroke-gray-900/10 dark:stroke-white/10"
          fill="none"
        >
          <defs>
            <pattern
              id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
            </pattern>
          </defs>
          <rect
            stroke="none"
            fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)"
            width="100%"
            height="100%"
          />
        </svg>
      </template>
    </div>
  </div>
</template>
