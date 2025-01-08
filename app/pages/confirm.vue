// pages/auth/confirm.vue
<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const email = useState("signupEmail");
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

      <!-- Waiting Icon -->
      <div class="flex justify-center mb-6">
        <div
          class="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center"
        >
          <UIcon
            name="i-heroicons-envelope"
            class="w-16 h-16 text-primary animate-pulse"
          />
        </div>
      </div>

      <!-- Confirmation Message -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold mb-2">Vérifiez votre email</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Nous avons envoyé un lien de confirmation à
          <span class="font-medium">{{ email }}</span>
        </p>
        <p class="text-sm text-gray-500">
          Veuillez vérifier votre boîte de réception et cliquer sur le lien pour
          activer votre compte. Le lien expirera dans 24 heures.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-4">
        <UButton color="primary" block @click="() => window.location.reload()">
          J'ai confirmé mon email
        </UButton>

        <UButton color="gray" variant="soft" block to="/">
          Retour à l'Accueil
        </UButton>
      </div>
    </UCard>
  </div>
</template>
