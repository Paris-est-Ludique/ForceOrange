<script setup lang="ts">
definePageMeta({
  name: 'JoinWaiting',
})

const user = useSupabaseUser()
</script>

<template>
  <UCard class="container mx-auto  max-w-screen-md">
    <h1 class="text-2xl uppercase mb-4">En attente de validation</h1>
    <p class="font-light">
      Un email de validation t'a été envoyé à ton adresse de courriel.<br>
      Merci de cliquer sur le lien pour valider ton inscription sur Force Orange.<br>
    </p>

    <UButton v-if="user" to="/" color="primary" class="mt-4">
      Retour à l'accueil
    </UButton>

    <UButton v-else to="/signin" color="primary" class="mt-4">
      Se connecter
    </UButton>
  </UCard>
</template>