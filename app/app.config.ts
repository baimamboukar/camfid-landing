export default defineAppConfig({
  ui: {
    primary: "camfid-primary",
    secondary: "camfid-secondary",
    accent: "camfid-accent",
    gray: "cool",
    button: {
      rounded: "rounded-md",
      default: {
        size: "lg",
        color: "camfid-primary",
      },
    },
    input: {
      default: {
        size: "md",
      },
    },
    card: {
      rounded: "rounded-xl",
      background: "bg-white dark:bg-camfid-primary-900",
    },
    footer: {
      top: {
        wrapper:
          "border-t border-camfid-primary-200 dark:border-camfid-primary-800",
        container: "py-8 lg:py-16",
      },
      bottom: {
        wrapper:
          "border-t border-camfid-primary-200 dark:border-camfid-primary-800",
      },
    },
    page: {
      hero: {
        wrapper:
          "lg:py-24 bg-gradient-to-b from-camfid-secondary-300 to-white dark:from-camfid-primary-900 dark:to-camfid-primary-950",
      },
    },
  },
});
