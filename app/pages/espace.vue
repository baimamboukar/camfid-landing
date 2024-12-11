<script setup lang="ts">
const links = [
  {
    label: "Home",
    icon: "i-heroicons-home",
  },
  {
    label: "Mes Contrats",
    icon: "i-heroicons-check-badge",
  },

  {
    label: "Droits & Obligations",
    icon: "i-heroicons-folder",
  },
  {
    label: "Confidentialite",
    icon: "i-heroicons-lock-closed",
  },
];
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }">
      <UDashboardNavbar>
        <template #left>
          <b class="text-bold">Mon Espace Investissuer </b></template
        >
      </UDashboardNavbar>
      <NuxtPage />
      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />
      </UDashboardSidebar>
    </UDashboardPanel>
    <div class="flex flex-row gap-4 ml-4 mr-4 mt-10">
      <UDashboardCard
        class="flex-[2]"
        title="Mes Actions"
        description="Accumules"
        icon="i-heroicons-currency-dollar"
      >
        <b class="text text-bold text-2xl">120,000 FCFA</b>
      </UDashboardCard>

      <UDashboardCard
        class="flex-[3.8]"
        title="Mes Contrats D'Investissement"
        description="La valuation actuelle de mes investissements"
        icon="i-heroicons-check-badge"
      >
        <UProgress />
      </UDashboardCard>
    </div>
  </UDashboardPage>
</template>
