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
  <ULandingSection title="Mission and Vision" :description="page.engagement">
  </ULandingSection>
  <!-- <ULandingLogos :title="page.partners.title" align="center">
    <image
      v-for="(partner, index) in page.partners.items"
      :key="index"
      v-bind="partner"
      :src="partner.logo"
      class="w-10 h-10 flex-shrink-0"
    />
  </ULandingLogos> -->
  <ULandingSection
    title="Objectif et Mission"
    :features="page.features"
    align="right"
  >
    <ImagePlaceholder path="/images/fill.jpg" class="h-full" />
  </ULandingSection>
</template>
