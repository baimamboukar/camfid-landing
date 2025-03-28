<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryContent("/").findOne()
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  titleTemplate: "",
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
let logos = [
  {
    name: "MboaWaste",
    src: "/logos/1.png",
  },
  {
    name: "ReclyingZ",
    src: "/logos/2.jpg",
  },
  {
    name: "GIZ",
    src: "/logos/3.jpg",
  },
  {
    name: "UNDP",
    src: "/logos/4.webp",
  },
];
</script>

<template>
  <div v-if="page">
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <div
        class="absolute inset-0 landing-grid dotted-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      />

      <template #headline>
        <UBadge
          v-if="page.hero.headline"
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold"
        >
          <NuxtLink
            :to="page.hero.headline.to"
            target="_blank"
            class="focus:outline-none"
            tabindex="-1"
          >
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon
            v-if="page.hero.headline.icon"
            :name="page.hero.headline.icon"
            class="ml-1 w-4 h-4 pointer-events-none"
          />
        </UBadge>
      </template>
    </ULandingHero>

    <RaisingStatus
      :videoLink="page.raisingStatus.videoLink"
      :fundsCollected="page.raisingStatus.fundsCollected"
      :target="page.raisingStatus.target"
      :investors="page.raisingStatus.investors"
      :minTicket="page.raisingStatus.minTicket"
      class=""
    />
    <div class="xl:ml-28 xl:mr-28 mb-10 !pt-0 !pb-0 sm:ml-4 sm:mr-4">
      <center>
        <InvestAction />
      </center>
    </div>
    <!-- START | Why Choose CAMFID Engineering Recycling-->
    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>
    <!-- END | Why Choose CAMFID Engineering Reclycling-->

    <!-- <ULandingSection class="!pt-0">
      <ImagePlaceholder path="/images/pipes.jpg" />
    </ULandingSection> -->

    <ULandingSection
      class="!pt-0"
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
    >
      <ImagePlaceholder :path="section.image" />
    </ULandingSection>

    <!-- Partners Logos -->

    <!-- <PartnersLogos :logos="logos" /> -->
    <!-- Partners Logo -->

    <ULandingSection
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
      class="!pt - 0"
    >
      <UPageColumns class="xl:columns-4">
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial
            v-bind="testimonial"
            class="bg-gray-100/50 dark:bg-gray-800/50"
          />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA
        v-bind="page.cta"
        class="bg-gray-100/50 dark:bg-gray-800/50"
      />
    </ULandingSection>
  </div>
</template>

<style scoped>
.gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(var(--color-primary-500) / 0.25) 0,
    #fff 100%
  );
}

.dark {
  .gradient {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgb(var(--color-primary-400) / 0.1) 0,
      rgb(var(--color-gray-950)) 100%
    );
  }
}
.landing-grid {
  background-size: 100px 100px;
  background-image: linear-gradient(
      to right,
      rgb(var(--color-gray-200)) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image: linear-gradient(
        to right,
        rgb(var(--color-gray-800)) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        rgb(var(--color-gray-800)) 1px,
        transparent 1px
      );
  }
  .dotted-grid {
    background-size: 50px 50px;
    background-image: radial-gradient(circle, #87ceeb 1px, transparent 1px);
  }
}
</style>
