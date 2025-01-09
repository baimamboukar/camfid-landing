<script setup lang="ts">
// Page metadata configuration
definePageMeta({
  layout: "blank", // Use blank layout for custom dashboard design
});

// Supabase and authentication dependencies
const supabase = useSupabaseClient();
const user = useSupabaseUser();

// Reactive state management
const investments = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const selectedTimeframe = ref("all");
const expand = ref({
  openedRows: [],
  row: null,
});

// Sidebar navigation links
const sidebarLinks = [
  {
    label: "Tableau de Bord",
    icon: "i-heroicons-home",
    to: "/dashboard",
    activeClass: "bg-primary/10 text-primary",
  },
  {
    label: "Mes Contrats",
    icon: "i-heroicons-check-badge",
    to: "/dashboard/contracts",
    activeClass: "bg-primary/10 text-primary",
  },
  {
    label: "Droits & Obligations",
    icon: "i-heroicons-folder",
    to: "/dashboard/rights",
    activeClass: "bg-primary/10 text-primary",
  },
  {
    label: "Confidentialité",
    icon: "i-heroicons-lock-closed",
    to: "/dashboard/privacy",
    activeClass: "bg-primary/10 text-primary",
  },
];

// ROI Projections configuration
const roiProjections = [
  { years: 1, roi: 12, color: "text-green-500" },
  { years: 3, roi: 38, color: "text-blue-500" },
  { years: 5, roi: 68, color: "text-purple-500" },
];

// Table columns with enhanced formatting
const columns = [
  {
    key: "created_at",
    label: "Date",
    sortable: true,
  },
  {
    key: "number_of_shares",
    label: "Actions",
    sortable: true,
  },
  {
    key: "amount_per_share",
    label: "Prix",
    sortable: true,
    //render: (amount: number) => `XAF ${amount.toLocaleString()}`,
  },
  {
    key: "total_amount",
    label: "Montant Total",
    sortable: true,
    //  render: (amount: number) => `XAF ${amount.toLocaleString()}`,
  },
  {
    key: "payment_status",
    label: "Statut",
    render: (status: string) =>
      ({
        completed: "Confirmé",
        pending: "En attente",
      }[status]),
  },
  { key: "actions", label: "Actions" },
];

// Pagination configuration
const page = ref(1);
const itemsPerPage = 100; // Updated to 8 items per page

// Helper function to format dates
const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${day} ${month} ${year}`;
};

// Fetch investments with advanced filtering
const fetchInvestments = async () => {
  try {
    let query = supabase
      .from("investments")
      .select("*")
      .eq("user_id", user.value?.id);

    // Time-based filtering logic
    const now = new Date();
    switch (selectedTimeframe.value) {
      case "thisMonth":
        query = query.gte(
          "created_at",
          new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        );
        break;
      case "thisYear":
        query = query.gte(
          "created_at",
          new Date(now.getFullYear(), 0, 1).toISOString()
        );
        break;
    }

    const { data, error } = await query
      .order("created_at", { ascending: true })
      .range((page.value - 1) * itemsPerPage, page.value * itemsPerPage - 1);

    if (error) throw error;
    // Preprocess data to format dates
    investments.value =
      data.map((investment) => ({
        ...investment,
        created_at: formatDate(investment.created_at),
      })) || [];
  } catch (error) {
    console.error("Error fetching investments:", error);
  } finally {
    loading.value = false;
  }
};

// Logout handler
const handleLogout = async () => {
  try {
    await supabase.auth.signOut();
    navigateTo("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchInvestments();
});

// Watchers for reactive updates
watch([page, selectedTimeframe], () => {
  fetchInvestments();
});
</script>

<template>
  <UDashboardPage>
    <!-- Left Sidebar with Footer -->
    <UDashboardPanel :width="280">
      <div class="p-4 border-b">
        <h1 class="text-xl font-bold">
          <span class="text-primary">CAMFID</span> Engineering
        </h1>
      </div>
      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="sidebarLinks" />
      </UDashboardSidebar>
    </UDashboardPanel>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Top Navigation -->
      <UDashboardNavbar class="border-b">
        <template #left>
          <h2 class="text-lg font-semibold">Espace Investisseur</h2>
        </template>
        <template #right>
          <div class="flex items-center gap-4">
            <!-- User Dropdown -->
            <UDropdown :items="userActions">
              <UButton color="gray" variant="ghost">
                <div class="flex items-center gap-2">
                  <UAvatar
                    :src="user?.user_metadata?.avatar_url"
                    :alt="user?.email"
                    size="sm"
                  />
                  <span class="text-sm">{{ user?.email }}</span>
                </div>
              </UButton>
            </UDropdown>
            <!-- Theme Toggle -->
            <UColorModeToggle />
          </div>
        </template>
      </UDashboardNavbar>

      <!-- Dashboard Content -->
      <div class="flex-1 p-6">
        <!-- ROI Projections -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <UCard
            v-for="projection in roiProjections"
            :key="projection.years"
            class="backdrop-blur-sm bg-white/30 cursor-pointer hover:shadow-lg transition-all"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">
                  ROI {{ projection.years }} ans
                </h3>
                <UIcon
                  name="i-heroicons-chart-bar"
                  :class="`${projection.color} text-xl`"
                />
              </div>
            </template>
            <p class="text-2xl font-bold" :class="projection.color">
              {{ projection.roi }}%
            </p>
          </UCard>
        </div>

        <!-- Investment History -->
        <!-- <h1>Historique D'Investissement</h1> -->
        <UCard class="backdrop-blur-sm bg-white/30">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <USelect
                  size="md"
                  v-model="selectedTimeframe"
                  :options="[
                    { label: 'Toutes les périodes', value: 'all' },
                    { label: 'Ce mois-ci', value: 'thisMonth' },
                    { label: 'Cette année', value: 'thisYear' },
                  ]"
                />
                <UInput
                  v-model="searchQuery"
                  placeholder="Rechercher..."
                  icon="i-heroicons-magnifying-glass"
                  class="w-full"
                  size="md"
                />
              </div>
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

          <UTable
            v-model:expand="expand"
            :rows="investments"
            :columns="columns"
            :loading="loading"
            :pagination="{
              page: page,
              total: investments.length,
              pageCount: itemsPerPage,
            }"
            class="cursor-pointer"
          >
            <!-- Expandable Row Details -->
            <template #expand="{ row }">
              <div
                class="p-6 bg-gray-100 dark:bg-gray-900 grid grid-cols-3 gap-6 rounded-lg"
              >
                <!-- Transaction Details -->
                <div>
                  <h4 class="text-lg font-semibold mb-4">
                    🔥 Détails de la Transaction
                  </h4>
                  <div class="space-y-2">
                    <p>
                      <span class="text-gray-500">Montant Total </span> •●
                      <strong
                        >XAF {{ row.total_amount.toLocaleString() }}</strong
                      >
                    </p>
                    <p>
                      <span class="text-gray-500">Nombre d'Actions </span> •●
                      <strong> {{ row.number_of_shares }} </strong>
                    </p>
                  </div>
                </div>
                <!-- <UDivider orientation="vertical" /> -->
                <!-- ROI Projections -->
                <div>
                  <h4 class="text-lg font-semibold mb-4">
                    Retour sur Investissement
                  </h4>
                  <div class="space-y-2">
                    <ul>
                      <li>
                        <span class="text-gray-500">Sur 1AN &nbsp; &nbsp;</span>
                        •●
                        <strong class="text-green-500">12%</strong>
                      </li>
                      <li>
                        <span class="text-gray-500">Sur 3ANS </span> •●
                        <strong class="text-blue-500">38%</strong>
                      </li>
                      <li>
                        <span class="text-gray-500">Sur 5ANS </span> •●
                        <strong class="text-purple-500">68%</strong>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Additional Information -->
                <div>
                  <h4 class="text-lg font-semibold mb-4">
                    Informations Supplémentaires
                  </h4>
                  <div class="space-y-2">
                    <p>
                      <span class="text-gray-500">Date •● </span>
                      <strong>{{
                        new Date(row.created_at).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      }}</strong>
                    </p>
                    <p>
                      <span class="text-gray-500">Statut •● </span>
                      <UBadge
                        :color="
                          row.payment_status === 'completed'
                            ? 'green'
                            : 'yellow'
                        "
                        class="ml-2"
                      >
                        {{
                          row.payment_status === "completed"
                            ? "Confirmé"
                            : "En attente"
                        }}
                      </UBadge>
                    </p>
                  </div>
                </div>
              </div>
            </template>

            <!-- Status Column -->
            <template #payment_status-data="{ row }">
              <UBadge
                :color="row.payment_status === 'completed' ? 'green' : 'yellow'"
                class="ml-2"
              >
                {{
                  row.payment_status === "completed" ? "Confirmé" : "En attente"
                }}
              </UBadge>
            </template>

            <!-- Actions Column -->
            <template #actions-data="{ row }">
              <UButton
                color="primary"
                variant="ghost"
                icon="i-heroicons-document-arrow-down"
                :disabled="row.payment_status !== 'completed'"
              />
            </template>
          </UTable>
        </UCard>
      </div>
    </div>
  </UDashboardPage>
</template>
