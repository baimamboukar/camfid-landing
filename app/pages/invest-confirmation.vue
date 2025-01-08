// pages/confirmation.vue
<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const transactionDetails = {
  amount: 150000,
  numberOfShares: 10,
  date: new Date(),
  transactionId: "TRX-" + Math.random().toString(36).substr(2, 9),
  paymentMethod: "Mobile Money",
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
};

const navigateToInvest = () => navigateTo("/invest");
const navigateToHome = () => navigateTo("/");
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="max-w-xl w-full">
      <!-- CAMFID Logo -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold">
          <span class="text-primary">CAMFID</span> Engineering
        </h2>
        <p class="text-sm text-gray-500 mt-1">
          Investissez dans l'innovation africaine
        </p>
      </div>

      <!-- Success Icon -->
      <div class="flex justify-center mb-6">
        <div
          class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
        >
          <UIcon name="i-heroicons-check" class="w-16 h-16 text-green-500" />
        </div>
      </div>

      <!-- Confirmation Message -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold mb-2">Investissement Réussi!</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Votre investissement a été traité avec succès
        </p>
      </div>

      <!-- Transaction Details -->
      <div class="space-y-4 mb-8">
        <UDivider label="Détails de la Transaction" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <p class="text-sm text-gray-500">Montant Investi</p>
            <p class="text-lg font-bold text-primary">
              XAF {{ transactionDetails.amount.toLocaleString() }}
            </p>
          </div>

          <div class="space-y-1">
            <p class="text-sm text-gray-500">Nombre d'Actions</p>
            <p class="text-lg font-bold">
              {{ transactionDetails.numberOfShares }} actions
            </p>
          </div>

          <div class="space-y-1">
            <p class="text-sm text-gray-500">Date</p>
            <p class="text-lg">
              {{ formatDate(transactionDetails.date) }}
            </p>
          </div>

          <div class="space-y-1">
            <p class="text-sm text-gray-500">ID Transaction</p>
            <p class="text-lg font-mono">
              {{ transactionDetails.transactionId }}
            </p>
          </div>

          <div class="space-y-1">
            <p class="text-sm text-gray-500">Méthode de Paiement</p>
            <p class="text-lg">
              {{ transactionDetails.paymentMethod }}
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-4">
        <UButton color="primary" block @click="navigateToInvest">
          Investir à Nouveau
        </UButton>

        <UButton color="gray" variant="soft" block @click="navigateToHome">
          Retour à l'Accueil
        </UButton>
      </div>
    </UCard>
  </div>
</template>
