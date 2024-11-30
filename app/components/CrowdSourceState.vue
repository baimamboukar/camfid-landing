<script setup lang="ts">
const modules = [
  {
    title: "VueUse",
    description:
      "Collection of essential Vue Composition Utilities for Vue 2 and 3.",
    to: "https://github.com/vueuse/vueuse",
    icon: "i-simple-icons-nuxtdotjs",
  },
  {
    title: "ESLint",
    description: "ESLint module for Nuxt.",
    to: "https://github.com/nuxt-community/eslint-module",
    icon: "i-simple-icons-eslint",
  },
  {
    title: "Tailwind CSS",
    description:
      "Add Tailwind CSS to your Nuxt application in seconds with PurgeCSS included for minimal CSS.",
    to: "https://github.com/nuxt-modules/tailwindcss",
    icon: "i-simple-icons-tailwindcss",
  },
];
</script>

<template>
  <UPageGrid>
    <UPageCard
      v-for="(module, index) in modules"
      :key="index"
      v-bind="module"
      target="_blank"
    >
      <template #description>
        <span class="line-clamp-2">{{ module.description }}</span>
      </template>
    </UPageCard>
  </UPageGrid>
</template>
