<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "dark:bg-gray-950",
  },
});
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Left Column - Brand Section -->
    <div
      class="hidden md:flex md:w-1/2 relative bg-gray-50 dark:bg-gray-900 p-8"
    >
      <div class="gradient absolute inset-0" />
      <div class="overlay absolute inset-0" />

      <!-- Brand Content -->
      <div
        class="relative z-10 flex flex-col items-center justify-center w-full space-y-6"
      >
        <!-- <img src="/images/momo.jpg" alt="CAMFID Logo" class="w-32 h-32" /> -->
        <!-- Add your logo -->
        <h1 class="text-4xl font-bold">
          <span class="text-primary">CAMFID</span> Engineering Recycling
        </h1>
        <p
          class="text-xl text-gray-600 dark:text-gray-400 max-w-md text-center"
        >
          Investissez dans l'avenir durable avec CAMFID Engineering Recycling
        </p>
      </div>
    </div>

    <!-- Right Column - Auth Form -->
    <div class="flex-1 flex flex-col md:w-1/2 dark:bg-gray-900 bg-gray-50">
      <!-- <div class="overlay absolute inset-0" /> -->
      <!-- Mobile Brand Header (visible on small screens) -->
      <div class="md:hidden text-center p-6">
        <h1 class="text-2xl font-bold mb-2">
          <b class="text-primary">CAMFID</b> Engineering Recycling
        </h1>
        <UDivider label="Investissez et Profitez" />
      </div>

      <!-- Auth Form Container -->
      <div class="flex-1 flex items-center justify-center p-6 md:p-12">
        <div class="w-full max-w-md">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient {
  cursor: pointer;
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    rgb(var(--color-primary-500) / 0.25) 0,
    transparent 70%
  );
}

.dark .gradient {
  background: radial-gradient(
    circle at center,
    rgb(var(--color-primary-100) / 0.1) 0,
    transparent 90%
  );
}

.overlay {
  background-size: 100px 100px;
  opacity: 0.5;
  background-image: linear-gradient(
      to right,
      rgb(var(--color-gray-100)) 0.5px,
      transparent 0.5px
    ),
    linear-gradient(
      to bottom,
      rgb(var(--color-gray-100)) 0.5px,
      transparent 0.5px
    );
}

.dark .overlay {
  background-image: linear-gradient(
      to right,
      rgb(var(--color-gray-800)) 0.5px,
      transparent 0.5px
    ),
    linear-gradient(
      to bottom,
      rgb(var(--color-gray-800)) 0.5px,
      transparent 0.5px
    );
}

@media (max-width: 768px) {
  .overlay,
  .gradient {
    opacity: 0.3;
  }
}
</style>
