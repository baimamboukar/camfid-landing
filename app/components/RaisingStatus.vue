<script setup>
import { defineProps } from "vue";

const props = defineProps({
  videoLink: {
    type: String,
    required: true,
  },
  fundsCollected: {
    type: Number,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  investors: {
    type: Number,
    required: true,
  },
  minTicket: {
    type: Number,
    required: true,
  },
});

const progress = (props.fundsCollected / props.target) * 100;
</script>

<template>
  <ULandingSection
    :title="'Fundraising Campaign'"
    :description="'Support the project and make a difference.'"
  >
    <div class="flex gap-6">
      <!-- Added gap for spacing between video and stats -->

      <!-- Left Side: Video -->
      <div class="flex-1 flex flex-col mr-8">
        <ImagePlaceholder :path="props.videoLink" class="flex-1" />
      </div>

      <!-- Right Side: Fundraising Stats in Card -->
      <div
        class="w-1/3 flex flex-col bg-gray-900/5 dark:bg-white/5 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 rounded-xl lg:-m-4 p-4"
      >
        <UCard class="flex-1 color-auto">
          <div class="px-4 py-2">
            <!-- Funds Collected -->
            <div class="mb-4">
              <div class="text-sm text-gray-600">Funds Collected</div>
              <div class="text-xl font-bold">XAF</div>
            </div>

            <!-- Fundraising Progress -->
            <div class="mb-4">
              <div class="text-sm text-gray-600">Progress</div>
              <UMeter
                :size="'2xl'"
                indicator
                label="Objectifs"
                :value="progress"
              />
            </div>

            <!-- Investors -->
            <div class="mb-4">
              <div class="text-sm text-gray-600">Investors</div>
              <div class="text-xl font-bold">{{ props.investors }}</div>
            </div>

            <!-- Minimum Ticket -->
            <div class="mb-4">
              <div class="text-sm text-gray-600">Ticket Minimum</div>
              <div class="text-xl font-bold">XAF</div>
            </div>
          </div>

          <template #footer>
            <UButton block>Investir Maintenant</UButton>
          </template>
        </UCard>
      </div>
    </div>
  </ULandingSection>
</template>

<style scoped>
/* Optional: Customize the layout and design as needed */
</style>
