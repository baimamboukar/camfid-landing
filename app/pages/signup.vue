<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Creer un Compte",
});

// Initialize Supabase client and router
const signupEmail = useSignupEmail();
const supabase = useSupabaseClient();
const router = useRouter();
const loading = ref(false);

// Form fields configuration
const fields = [
  {
    name: "name",
    type: "text",
    label: "Noms",
    placeholder: "Entez votre nom complet",
  },
  // add date of birth field
  {
    name: "date_of_birth",
    type: "date",
    label: "Date de Naissance",
    placeholder: "Entrez votre date de naissance",
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

// Form validation
const validate = (state: any) => {
  const errors = [];
  if (!state.name) {
    errors.push({ path: "name", message: "Le nom est obligatoire" });
  }
  if (!state.email) {
    errors.push({ path: "email", message: "L'email est obligatoire" });
  }
  if (!state.phone) {
    errors.push({ path: "phone", message: "Le téléphone est obligatoire" });
  }
  if (!state.password) {
    errors.push({
      path: "password",
      message: "Le mot de passe est obligatoire",
    });
  }
  return errors;
};

// Handle form submission
async function onSubmit(data: any) {
  try {
    console.log(data);
    loading.value = true;

    // Sign up with Supabase
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: "http://localhost:3000/confirm",
        data: {
          full_name: data.name,
          phone: data.phone,
          date_of_birth: data.date_of_birth,
        },
      },
    });

    if (signUpError) throw signUpError;
    // Set email in state before redirecting
    signupEmail.value = data.email;
    // Redirect to login page with success message
    await navigateTo("/confirm", {
      query: {
        message:
          "Compte créé avec succès. Veuillez vérifier votre email pour confirmer votre compte.",
      },
    });
  } catch (error: any) {
    console.error("Error during signup:", error.message);
    // Handle specific error cases here
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      align="top"
      title="Espace Investisseur"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{
        label: 'Creer Mon Espace',
        loading: loading,
      }"
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
