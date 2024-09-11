<script setup lang="ts">
definePageMeta({
  name: 'Signin',
})

const state = reactive({
  mail: undefined,
  password: undefined,
})
</script>

<template>

  <UCard>
    <h1 class="text-2xl uppercase">Qui êtes-vous ?</h1>

    <UForm :state="state">
      <UFormGroup label="Adresse courriel">
        <UInput name="mail" v-model="state.mail" />
      </UFormGroup>

      <UFormGroup label="Mot de passe">
        <UInput type="password" name="password" v-model="state.password" />
      </UFormGroup>

      <UButton type="submit">Se Connecter</UButton>
      <UButton to="/join">Mot de passe oublié ?</UButton>
    </UForm>

    <!-- <p class="text-error">Nous n’avons pas reconnu vos identifiants.</p> -->

    <p>ou bien</p>

    <div>
      <UButton>Se connecter avec Google</UButton>
      <UButton>Se connecter avec Discord</UButton>
    </div>
  </UCard>
</template>