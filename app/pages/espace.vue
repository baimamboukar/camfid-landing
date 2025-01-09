// pages/dashboard/index.vue
<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const investments = ref([]);
const loading = ref(true);

// Navigation links
const sidebarLinks = [
  {
    label: "Tableau de Bord",
    icon: "i-heroicons-home",
    to: "/dashboard",
  },
  {
    label: "Mes Contrats",
    icon: "i-heroicons-check-badge",
    to: "/dashboard/contracts",
  },
  {
    label: "Droits & Obligations",
    icon: "i-heroicons-folder",
    to: "/dashboard/rights",
  },
  {
    label: "Confidentialité",
    icon: "i-heroicons-lock-closed",
    to: "/dashboard/privacy",
  },
];

// User navigation
const userNavigation = [
  {
    label: "Mon Profil",
    icon: "i-heroicons-user-circle",
    to: "/dashboard/profile",
  },
  {
    label: "Paramètres",
    icon: "i-heroicons-cog-6-tooth",
    to: "/dashboard/settings",
  },
  {
    label: "Déconnexion",
    icon: "i-heroicons-arrow-right-on-rectangle",
    click: async () => {
      await supabase.auth.signOut();
      navigateTo("/login");
    },
  },
];

const fetchInvestments = async () => {
  try {
    const { data, error } = await supabase
      .from("investments")
      .select("*")
      .eq("user_id", user.value?.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    investments.value = data;
  } catch (error) {
    console.error("Error fetching investments:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchInvestments();
});
</script>

<template>
  <UDashboardPage>
    <!-- Left Sidebar -->
    <UDashboardPanel :width="280">
      <!-- Company Logo -->
      <div class="p-4 border-b">
        <h1 class="text-xl font-bold">
          <span class="text-primary">CAMFID</span> Engineering
        </h1>
        <p class="text-sm text-gray-500">Espace Investisseur</p>
      </div>

      <!-- Navigation Links -->
      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="sidebarLinks" />
      </UDashboardSidebar>
    </UDashboardPanel>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Top Navigation Bar -->
      <UDashboardNavbar class="border-b">
        <template #left>
          <h2 class="text-lg font-semibold">Tableau de Bord</h2>
        </template>
        <template #right>
          <UDropdown
            :items="userNavigation"
            :popper="{ placement: 'bottom-end' }"
          >
            <UButton
              color="gray"
              variant="ghost"
              class="flex items-center gap-2"
            >
              <UAvatar
                :src="user?.user_metadata?.avatar_url"
                :alt="user?.email"
                size="sm"
              />
              <span>{{ user?.email }}</span>
              <UIcon name="i-heroicons-chevron-down" />
            </UButton>
          </UDropdown>
        </template>
      </UDashboardNavbar>

      <!-- Dashboard Content -->
      <div class="flex-1 p-6 bg-gray-50">
        <div class="max-w-7xl mx-auto space-y-6">
          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UCard class="bg-white">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">Total Investi</h3>
                  <UIcon
                    name="i-heroicons-currency-dollar"
                    class="text-primary text-xl"
                  />
                </div>
              </template>
              <p class="text-2xl font-bold text-primary">
                XAF
                {{
                  investments
                    .reduce((sum, inv) => sum + inv.total_amount, 0)
                    .toLocaleString()
                }}
              </p>
            </UCard>

            <UCard class="bg-white">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">ROI Projeté</h3>
                  <UIcon
                    name="i-heroicons-chart-bar"
                    class="text-green-500 text-xl"
                  />
                </div>
              </template>
              <p class="text-2xl font-bold text-green-500">12% / an</p>
            </UCard>

            <UCard class="bg-white">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">Contrats Actifs</h3>
                  <UIcon
                    name="i-heroicons-document-check"
                    class="text-blue-500 text-xl"
                  />
                </div>
              </template>
              <p class="text-2xl font-bold text-blue-500">
                {{ investments.length }}
              </p>
            </UCard>
          </div>

          <!-- Investment History -->
          <UCard class="bg-white">
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold">
                  Historique des Investissements
                </h2>
                <UButton
                  color="primary"
                  variant="soft"
                  icon="i-heroicons-plus"
                  to="/invest"
                >
                  Nouvel Investissement
                </UButton>
              </div>
            </template>

            <div v-if="loading" class="flex justify-center py-8">
              <ULoader />
            </div>

            <div v-else-if="investments.length === 0" class="text-center py-12">
              <UIcon
                name="i-heroicons-document"
                class="mx-auto h-12 w-12 text-gray-400"
              />
              <h3 class="mt-2 text-sm font-semibold text-gray-900">
                Aucun investissement
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Commencez par faire votre premier investissement
              </p>
              <div class="mt-6">
                <UButton color="primary" to="/invest">
                  Investir Maintenant
                </UButton>
              </div>
            </div>

            <div v-else class="divide-y divide-gray-100">
              <div
                v-for="investment in investments"
                :key="investment.id"
                class="p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center justify-between">
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <UBadge
                        :color="
                          investment.payment_status === 'completed'
                            ? 'green'
                            : 'yellow'
                        "
                      >
                        {{
                          investment.payment_status === "completed"
                            ? "Confirmé"
                            : "En attente"
                        }}
                      </UBadge>
                      <span class="text-sm text-gray-500">
                        {{
                          new Date(investment.created_at).toLocaleDateString(
                            "fr-FR"
                          )
                        }}
                      </span>
                    </div>
                    <div class="mt-2 flex items-center gap-4">
                      <div>
                        <p class="text-sm font-medium text-gray-900">
                          {{ investment.number_of_shares }} actions
                        </p>
                        <p class="text-sm text-gray-500">
                          XAF {{ investment.total_amount.toLocaleString() }}
                        </p>
                      </div>
                      <div class="border-l pl-4">
                        <p class="text-sm font-medium text-gray-900">
                          ROI Projeté (1 an)
                        </p>
                        <p class="text-sm text-green-600">
                          XAF
                          {{
                            (investment.total_amount * 1.12).toLocaleString()
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <UButton
                      color="gray"
                      variant="soft"
                      icon="i-heroicons-document-arrow-down"
                      @click="downloadReceipt(investment)"
                    >
                      Reçu
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </UDashboardPage>
</template>
