// pages/auth/welcome.vue
<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const router = useRouter();
const countdown = ref(10);
const signupEmail = useSignupEmail();

onMounted(() => {
  // Clear signup email from state
  signupEmail.value = "";

  // Start countdown
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(timer);
      router.push("/");
    }
  }, 1000);

  // Cleanup
  onUnmounted(() => clearInterval(timer));
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900"
  >
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

      <!-- Success Icon with Animation -->
      <div class="flex justify-center mb-6">
        <div
          class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
        >
          <UIcon
            name="i-heroicons-check-badge"
            class="w-16 h-16 text-green-500 animate-bounce-slow"
          />
        </div>
      </div>

      <!-- Welcome Message -->
      <div class="text-center space-y-4 mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Compte Confirmé avec Succès!
        </h1>
        <div class="space-y-2">
          <p class="text-gray-600 dark:text-gray-400">
            Bienvenue dans la communauté CAMFID Engineering.
          </p>
          <p class="text-gray-600 dark:text-gray-400">
            Vous pouvez maintenant accéder à votre espace investisseur et
            commencer à investir.
          </p>
        </div>
        <div class="text-sm text-primary font-medium">
          Redirection automatique dans {{ countdown }} secondes...
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full h-1 mb-8">
        <div
          class="bg-primary h-1 rounded-full transition-all duration-1000 ease-out"
          :style="{ width: `${(countdown / 5) * 100}%` }"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-4">
        <UButton
          color="primary"
          block
          icon="i-heroicons-presentation-chart-line"
          to="/dashboard"
        >
          Mon Espace Investisseur
        </UButton>

        <UButton
          color="gray"
          variant="soft"
          block
          icon="i-heroicons-home"
          to="/"
        >
          Page d'Accueil
        </UButton>
      </div>

      <!-- Additional Info -->
      <div class="mt-6 text-center text-sm text-gray-500">
        <p>
          Besoin d'aide?
          <UButton
            variant="link"
            color="primary"
            to="/contact"
            class="font-medium"
          >
            Contactez-nous
          </UButton>
        </p>
      </div>
    </UCard>
  </div>
</template>

<style>
.animate-bounce-slow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
