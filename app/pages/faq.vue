<script setup lang="ts">
const { data: page } = await useAsyncData("FAQs", () =>
  queryContent("/faq").findOne()
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
  <ULandingSection :title="page.faq.title" :description="page.faq.description">
    <ULandingFAQ :items="page.faq.items" multiple>
      <template #item="{ item }">
        <MDC
          :value="item.content"
          class="prose prose-primary dark:prose-invert max-w-none text-gray-500 dark:text-gray-400"
        />
      </template>
    </ULandingFAQ>
  </ULandingSection>
</template>
