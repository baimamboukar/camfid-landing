<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Creer un Compte",
});

const fields = [
  {
    name: "name",
    type: "text",
    label: "Noms",
    placeholder: "Entez votre nom complet",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Entrez votre email",
  },
  {
    name: "phone",
    type: "text",
    label: "Telephone",
    placeholder: "Entez votre numero de Telephone",
  },
  {
    name: "password",
    label: "Mot de Passe",
    type: "password",
    placeholder: "Entrez votre Mot de Passe",
  },
];

const validate = (state: any) => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email is required" });
  if (!state.password)
    errors.push({ path: "password", message: "Password is required" });
  return errors;
};

const providers = [
  {
    label: "Continuer avec Google",
    icon: "i-simple-icons-google",
    color: "white" as const,
    click: () => {
      console.log("Redirect to Google");
    },
  },
];

function onSubmit(data: any) {
  console.log("Submitted", data);
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      align="top"
      title="Espace Investisseur"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: 'Creer Mon Espace' }"
      @submit="onSubmit"
    >
      <template #description>
        Avez-vous déjà un compte?
        <NuxtLink to="/login" class="text-primary font-medium"
          >Acceder a Mon Espace</NuxtLink
        >.
      </template>

      <template #footer>
        En créant un compte, vous acceptez nos
        <NuxtLink to="/" class="text-primary font-medium"
          >Termes de Service</NuxtLink
        >.
      </template>
    </UAuthForm>
  </UCard>
</template>
