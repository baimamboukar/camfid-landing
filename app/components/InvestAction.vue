<script setup lang="ts">
import { ref, computed } from "vue";
const isOpen = ref(false);
const user = useSupabaseUser();

const isAuthenticated = computed(() => user !== null);
console.log("----------------IS AUTH---------------------------🚩`");
console.log(isAuthenticated.value);
console.log("------------------------------------------🚩`");

console.log("---------------USER---------------------------🎊`");
console.log(user.value);
console.log("------------------------------------------🎊`");
// toggle open action
</script>

<template>
  <UPricingCard
    title="Invester Maintenant"
    price="15000"
    discount="7,500 FCFA"
    cycle=""
    :highlight="false"
    :button="{
      label: 'Acheter Maintenant',
      click: () =>
        isAuthenticated ? (isOpen = !isOpen) : navigateTo('/login'),
    }"
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
