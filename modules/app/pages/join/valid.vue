<script setup lang="ts">
definePageMeta({
  name: 'JoinValid',
})

const user = useSupabaseUser()

// TODO : Add the necessary code to handle the validation of the user's email address
// http://localhost:3000/join/valid?error=access_denied&error_code=403&error_description=Email+link+is+invalid+or+has+expired#error=access_denied&error_code=403&error_description=Email+link+is+invalid+or+has+expired
</script>

<template>
  <UCard class="container mx-auto max-w-screen-md">
    <h1 class="text-2xl uppercase mb-4">Bravo ! Tu as vaillament réussi à valider ton compte Force Orange</h1>
    <p class="font-light">
      Tu peux maintenant te connecter à ton compte et profiter de toutes les fonctionnalités de Force Orange.
    </p>

    <UButton v-if="user" to="/" color="primary" class="mt-4">
      Retour à l'accueil
    </UButton>

    <UButton v-else to="/signin" color="primary" class="mt-4">
      Se connecter
    </UButton>
  </UCard>
</template>