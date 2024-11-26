<script setup lang="ts">
const links = [
  {
    label: "Services",
    children: [
      {
        label: "Recyclage Plastique",
      },
      {
        label: "Production de Granulés",
      },
      {
        label: "Fabrication de Produits",
      },
      {
        label: "Points de Collecte",
      },
    ],
  },
  {
    label: "Produits",
    children: [
      {
        label: "Tuyaux PVC",
      },
      {
        label: "Raccords",
      },
      {
        label: "Mobilier",
      },
      {
        label: "Conteneurs",
      },
    ],
  },
  {
    label: "À Propos",
    children: [
      {
        label: "Notre Mission",
      },
      {
        label: "FAQ",
      },
      {
        label: "Rejoignez-nous",
      },
      {
        label: "Contact",
      },
    ],
  },
];

const toast = useToast();
const email = ref("");
const loading = ref(false);

function onSubmit() {
  loading.value = true;
  setTimeout(() => {
    toast.add({
      title: "Inscrit!",
      description: "Vous êtes maintenant inscrit à notre newsletter.",
    });
    loading.value = false;
  }, 1000);
}
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <form @submit.prevent="onSubmit">
            <UFormGroup
              label="Inscrivez-vous à notre newsletter"
              :ui="{ container: 'mt-3' }"
            >
              <UInput
                v-model="email"
                type="email"
                placeholder="Votre email"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                required
                size="xl"
                autocomplete="off"
                class="max-w-sm"
                input-class="rounded-full"
              >
                <template #trailing>
                  <UButton
                    type="submit"
                    size="xs"
                    color="camfid-primary"
                    :label="loading ? 'Inscription...' : 'S\'inscrire'"
                    :loading="loading"
                  />
                </template>
              </UInput>
            </UFormGroup>
          </form>

          <div class="mt-6">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Contact: +33676332863 / +237699308001
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Email: contact@camfidengineering.com
            </p>
          </div>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <div class="flex flex-col gap-2">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Copyright © {{ new Date().getFullYear() }} CAMFID Engineering
          Recycling. Tous droits réservés.
        </p>
      </div>
    </template>

    <template #right>
      <UColorModeButton size="sm" />
    </template>
  </UFooter>
</template>
