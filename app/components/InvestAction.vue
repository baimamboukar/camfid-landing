<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(false);
// toggle open action
</script>

<template>
  <UPricingCard
    title="Invester Maintenant"
    price="15000"
    discount="7,500 FCFA"
    cycle=""
    :highlight="false"
    :button="{ label: 'Acheter Maintenant', click: () => (isOpen = !isOpen) }"
    orientation="horizontal"
    align="bottom"
    :features="[
      'Generez des revenus passifs',
      'Participez a la croissance de CAMFID Engineering',
      'Achetez des actions a partir de 15000 FCFA',
      'Recevez des dividendes annuels',
      'Revendez vos actions a tout moment',
      'Recevez des dividendes annuels',
    ]"
  />
  <UModal v-model="isOpen" :ui="{ width: '' }">
    <div class="p-10 w-full">
      <InvestForm />
    </div>
  </UModal>
</template>
