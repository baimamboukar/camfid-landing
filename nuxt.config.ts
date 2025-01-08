// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxthq/studio",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
  ],

  // i18n: {
  //   locales: [
  //     { code: "en", language: "en-US" },
  //     { code: "fr", language: "fr-FR" },
  //   ],
  //   defaultLocale: "en",
  // },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: ["/espace", "/invest-confirmation"],
      // exclude: [
      //   "/",
      //   "http://localhost:3000/",
      //   "https://camfidengineering.com/",
      // ],
      cookieRedirect: false,
    },
  },
  devtools: {
    enabled: true,
  },

  colorMode: {
    disableTransition: false,
    preference: "system",
  },

  routeRules: {
    // "/api/search.json": { prerender: true },
    // "/docs": { redirect: "/docs/getting-started", prerender: false },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-07-11",

  nitro: {
    prerender: {
      //routes: ["/", "/docs"],
      //crawlLinks: true,
    },
  },

  typescript: {
    strict: false,
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    "components:extend": (components) => {
      const globals = components.filter((c) =>
        ["UButton"].includes(c.pascalName)
      );

      globals.forEach((c) => (c.global = true));
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
  fonts: {
    families: [
      // do not resolve this font with any provider from `@nuxt/fonts`
      { name: "Montserrat", provider: "google" },
      { name: "Raleway", provider: "google" },
      { name: "Work Sans", provider: "google" },
      // only resolve this font with the `google` provider
      { name: "Space Grotesk", provider: "google" },

      // specify specific font data - this will bypass any providers
    ],
  },
});
