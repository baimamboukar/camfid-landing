<script setup lang="ts">
import type { NavItem } from "@nuxt/content";

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

const links = [
  {
    label: "Docs",
    to: "/docs",
  },
  {
    label: "Notre Solution",
    to: "/pricing",
  },
  {
    label: "Pourquoi Investir?",
    to: "/blog",
  },
  {
    label: "Aide",
    to: "/blog",
    icon: "i-heroicons-question-mark-circle-20-solid",
  },
];
</script>

<template>
  <UHeader :links="links">
    <template #logo> CAMFID Engineering </template>

    <template #right>
      <UButton label="Sign in" color="gray" to="/login" />
      <UButton
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="/signup"
        class="hidden lg:flex"
      />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
