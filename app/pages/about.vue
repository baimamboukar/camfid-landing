<script setup lang="ts">
const { data: page } = await useAsyncData("About", () =>
  queryContent("/about").findOne()
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}
</script>

<template>
  <ULandingSection
    title="Mission and Vision"
    description="CAMFID Engineering Recycling Mission and Vision"
  >
    {{ page }}
  </ULandingSection>
</template>
