import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["Alef"], //, ...defaultTheme.fontFamily.serif],
      },
      colors: {
        backblue: {
          50: "#eff9ff",
          100: "#def3ff",
          200: "#b5e8ff",
          300: "#74d8ff",
          400: "#2ac5ff",
          500: "#00aff8",
          600: "#008bd5",
          700: "#006fac",
          800: "#005e8e",
          900: "#054e75",
          950: "#032b44",
        },
        "camfid-primary": {
          50: "#f0f7fc",
          100: "#dceaf6",
          200: "#bfd8ee",
          300: "#93bfe2",
          400: "#619ed1",
          500: "#3f81bc",
          600: "#32679f",
          700: "#2b5481",
          800: "#284769",
          900: "#032B44", // Primary color
          950: "#0f1f2e",
        },
        "camfid-secondary": {
          50: "#f0f9fe",
          100: "#dff3fd",
          200: "#b8e7fb",
          300: "#87CEEB", // Secondary color
          400: "#3db7ef",
          500: "#1a9fe7",
          600: "#0d81c7",
          700: "#0d67a0",
          800: "#105784",
          900: "#134a6e",
          950: "#0c2d46",
        },
        "camfid-accent": {
          50: "#fefbec",
          100: "#fdf6d4",
          200: "#F7DC6F", // Accent color
          300: "#f7d451",
          400: "#f5c423",
          500: "#e4ac0c",
          600: "#c38508",
          700: "#9c610a",
          800: "#804c0f",
          900: "#6c3f11",
          950: "#3d2009",
        },
      },
    },
  },
};
