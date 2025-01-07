<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Se Connecter",
});

const fields = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Entrer votre adresse email",
  },
  {
    name: "password",
    label: "Mot De Passe",
    type: "password",
    placeholder: "Entrer votre mote de passe",
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
    label: "Continue with GitHub",
    icon: "i-simple-icons-github",
    color: "white" as const,
    click: () => {
      console.log("Redirect to GitHub");
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
      :loading="false"
      :fields="fields"
      :validate="validate"
      title="Salut 👋, Bienvenue!"
      align="bottom"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
      @submit="onSubmit"
    >
      <template #description>
        Vous n'avez pas de compte?
        <NuxtLink to="/signup" class="text-primary font-medium"
          >Inscrivez-vous</NuxtLink
        >.
      </template>

      <template #password-hint>
        <NuxtLink to="/" class="text-primary font-medium"
          >Mot de passe oublier?</NuxtLink
        >
      </template>

      <template #footer>
        J'accepte les
        <NuxtLink to="/" class="text-primary font-medium"
          >Termes de Service</NuxtLink
        >.
      </template>
    </UAuthForm>
  </UCard>
</template>
