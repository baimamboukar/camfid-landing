<script setup lang="ts">
import type { NavItem } from "@nuxt/content";
// import * as locales from "@nuxt/ui/locale";

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

// const { locale } = useI18n();
// const links = [
//   {
//     label: "Acceuil",
//     to: "/docs",
//   },
//   {
//     label: "Notre Solution",
//     to: "/pricing",
//   },
//   {
//     label: "Pourquoi Investir?",
//     to: "/blog",
//   },
//   {
//     label: "Aide",
//     to: "/blog",
//     icon: "i-heroicons-question-mark-circle-20-solid",
//   },
// ];
const links = [
  {
    label: "Acceuil",
    to: "/",
  },

  {
    label: "Actualites",
    to: "/blog",
  },
  {
    label: "Aide & FAQs",
    to: "/faq",
    icon: "i-heroicons-question-mark-circle-20-solid",
  },
  {
    label: "A Propos",
    to: "/about",
  },
  {
    label: "Mon Espace",
    to: "/espace",
  },
];
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <b class="text-bold text-camfid-primary-300">CAMFID</b> Engineering
      Recycling
    </template>

    <template #right>
      <!-- <ULocaleSelect v-model="locale" :locales="locales" /> -->
      <!-- <UButton
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="/signup"
        class="hidden lg:flex"
      /> -->
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
      <!-- <UButton label="Investir Maintenant" color="primary" to="/signup" /> -->
    </template>
  </UHeader>
</template>
