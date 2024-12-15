// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxthq/studio",
    "@vueuse/nuxt",
    "nuxt-og-image",
  ],

  devtools: {
    enabled: true,
  },

  colorMode: {
    disableTransition: false,
    preference: "system",
  },

  routeRules: {
    "/api/search.json": { prerender: true },
    "/docs": { redirect: "/docs/getting-started", prerender: false },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-07-11",

  nitro: {
    prerender: {
      routes: ["/", "/docs"],
      crawlLinks: true,
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
      { name: "Open Sans", provider: "google" },
      { name: "Futura", provider: "google" },
      // only resolve this font with the `google` provider
      { name: "Space Grotesk", provider: "google" },
      // specify specific font data - this will bypass any providers
    ],
  },
});
