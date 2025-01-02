<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

// Add payment methods to schema
const schema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .regex(/^[a-zA-Z\s]*$/, "Only letters and spaces allowed"),
  numberOfActions: z
    .number()
    .min(1, "Minimum 1 action required")
    .max(1000, "Maximum 1000 actions allowed"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept terms and conditions"),
});

// Add payment method to state
const state = reactive({
  fullName: undefined,
  numberOfActions: 1,
  paymentMethod: "",
  acceptTerms: false,
});

// Payment methods array
const paymentMethods = [
  {
    value: "orange",
    label: "Orange Money",
    icon: "/images/om.png",
  },
  {
    value: "momo",
    label: "MTN Mobile Money",
    icon: "/images/momo.jpg",
  },
  {
    value: "stripe",
    label: "Stripe",
    icon: "/images/momo.jpg",
  },
];
type Schema = z.output<typeof schema>;

// Constants for calculations
const PRICE_PER_ACTION = 7500; // XAF
const YEARLY_ROI_PERCENTAGE = 12; // 12% per year

// Computed values
const totalPrice = computed(() => {
  return state.numberOfActions * PRICE_PER_ACTION;
});

const ROICalculations = computed(() => {
  const investment = totalPrice.value;
  return {
    oneYear: investment * (1 + YEARLY_ROI_PERCENTAGE / 100),
    threeYears: investment * Math.pow(1 + YEARLY_ROI_PERCENTAGE / 100, 3),
    fiveYears: investment * Math.pow(1 + YEARLY_ROI_PERCENTAGE / 100, 5),
  };
});

// Terms modal state
const isTermsVisible = ref(false);

// Methods
const incrementActions = () => {
  state.numberOfActions++;
};

const decrementActions = () => {
  if (state.numberOfActions > 1) {
    state.numberOfActions--;
  }
};

const showTerms = () => {
  isTermsVisible.value = true;
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Handle form submission
  console.log(event.data);
}
</script>

<template>
  <UPage>
    <!-- Main Form Container -->
    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <!-- Form Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold mb-2">
          <b class="text-primary">CAMFID</b> Engineering Recycling
        </h1>
        <UDivider label="Investissez et Profitez" />
      </div>
      <br />
      <!-- Two Column Layout -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Left Column - Form Inputs -->
        <div class="space-y-6">
          <!-- Full Name Input -->
          <UFormGroup label="Noms Complet" name="fullName">
            <UInput
              v-model="state.fullName"
              placeholder="Entrer votre nom complet..."
            />
          </UFormGroup>

          <!-- Number of Actions Input Group -->
          <UFormGroup label="Nombre d'Actions" name="numberOfActions">
            <div class="flex items-center space-x-4">
              <UButton
                icon="i-heroicons-minus"
                color="gray"
                variant="soft"
                class="h-12 w-12"
                :disabled="state.numberOfActions <= 1"
                @click="decrementActions"
              />
              <UInput
                v-model.number="state.numberOfActions"
                type="number"
                style="text-align: center"
                class="w-24 text-center"
                min="1"
                max="1000"
              />
              <UButton
                icon="i-heroicons-plus"
                color="gray"
                variant="soft"
                class="h-12 w-12"
                @click="incrementActions"
              />
            </div>
          </UFormGroup>

          <!-- Add Payment Method Selector before Terms -->
          <UFormGroup label="Methode de Paiement" name="paymentMethod">
            <USelect
              v-model="state.paymentMethod"
              :options="paymentMethods"
              option-attribute="label"
              value-attribute="value"
              class="w-full"
            >
              <template #option="{ option }">
                <div class="flex items-center gap-2">
                  <img
                    :src="option.icon"
                    :alt="option.label"
                    class="w-6 h-6 object-contain"
                  />
                  <span>{{ option.label }}</span>
                </div>
              </template>
            </USelect>
          </UFormGroup>

          <!-- Updated Terms and Conditions -->
          <UFormGroup name="acceptTerms">
            <UCheckbox v-model="state.acceptTerms">
              <template #label>
                J'accepte les
                <a
                  href="terms-and-conditions"
                  target="_blank"
                  class="text-primary"
                  >Termes et Conditions</a
                >
              </template>
            </UCheckbox>
          </UFormGroup>

          <!-- Submit Button -->
          <UButton
            type="submit"
            size="xl"
            block
            class="mt-6"
            color="primary"
            variant="solid"
          >
            Proceder Au Paiement
          </UButton>
        </div>

        <!-- Right Column - Investment Summary -->
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
          <h3 class="text-xl font-semibold mb-4">Votre Investissement</h3>

          <!-- Total Investment -->
          <div class="mb-6">
            <div class="text-sm text-gray-500">Investissement Total</div>
            <div class="text-3xl font-bold text-primary">
              XAF {{ totalPrice.toLocaleString() }}
            </div>
          </div>

          <!-- ROI Projections -->
          <div class="space-y-4">
            <h4 class="font-medium">Projection des Profits</h4>

            <ul class="grid gap-3">
              <li
                v-for="(value, label) in {
                  '1 Annee': ROICalculations.oneYear,
                  '3 Annees': ROICalculations.threeYears,
                  '5 Annees': ROICalculations.fiveYears,
                }"
                :key="label"
                class="flex justify-between"
              >
                <span>{{ label }}</span>
                <span class="font-semibold">
                  XAF {{ value.toLocaleString() }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </UForm>
  </UPage>
</template>

<style scoped>
/* Add any additional custom styles here */
.prose {
  max-width: none;
}
.payment-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
</style>
