<script setup lang="ts">
const props = defineProps({
  logos: {
    type: Array,
    required: true,
    // Expected format: [{ imageUrl: string, name: string }]
  },
});
</script>

<template>
  <div
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center"
  >
    <div
      v-for="(logo, index) in props.logos"
      :key="index"
      class="flex items-center justify-center p-4"
    >
      <img
        :src="logo.src"
        :alt="logo.name"
        class="w-32 h-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style scoped>
.partner-logo {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grayscale {
  filter: grayscale(100%);
}

img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
</style>
