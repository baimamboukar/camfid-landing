<script setup lang="ts">
import { computed } from "vue";
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

const loading = ref(false);
const router = useRouter();
const supabase = useSupabaseClient();
async function onSubmit(data: any) {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    // Redirect to home page after successful login
    router.push("/");
  } catch (error: any) {
    // console.error(">>>>>> Auth Error <<<<<<", error.message);
  } finally {
    loading.value = false;
  }
}

// ----- CONFIGURE MESSAGE READING ----- //

const route = useRoute();
const message = computed(() => route.query.message);
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="flex flex-col items-center gap-4">
    <!-- Notification above the card -->
    <div v-if="message" class="w-full max-w-sm">
      <UNotification
        icon="i-heroicons-circle-info"
        color="primary"
        :id="6"
        title="Notification"
        :description="message"
        :timeout="2000"
      />
    </div>

    <!-- Auth Card -->
    <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
      <UAuthForm
        :loading="false"
        :fields="fields"
        :validate="validate"
        title="Salut 👋, Bienvenue!"
        align="bottom"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        :submit-button="{
          trailingIcon: 'i-heroicons-arrow-right-20-solid',
          loading: loading,
        }"
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
  </div>
</template>
