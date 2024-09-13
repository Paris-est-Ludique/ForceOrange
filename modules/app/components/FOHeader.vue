<script setup lang="ts">
import type { Database } from '@pel/supabase/types'

defineOptions({
  name: 'FOHeader',
})

const links = [{
  label: 'Les actus',
  to: '/'
}, {
  label: 'Rejoindre FO',
  to: '/join'
}]

const user = useSupabaseUser()
const { auth } = useSupabaseClient<Database>()

const signOut = async () => {
  const { error } = await auth.signOut()
  if (error) console.log(error)
}
</script>

<template>
  <UHeader :links="links" class="bg-white dark:bg-gray-900 rounded-xl shadow-lg mx-4 mt-4">
    <template #left>
      <!-- <p class="font-logo text-orange-500 stroke-5 stroke-black-500 text-hlogo">Force Orange</p> -->
      <NuxtImg src="/assets/img/logo-fo.svg" alt="Force Orange" />
    </template>

    <template #right>
      <UColorModeButton />
      {{ user?.user_metadata.firstname }}
      <UButton v-if="user" @click="signOut" variant="soft">Se déconnecter</UButton>
      <UButton v-else to="/signin" variant="soft">Se connecter</UButton>
    </template>
  </UHeader>

  <UNotification v-if="user && !user?.email_confirmed_at" title="N'oubliez pas de confirmer votre adresse de courriel !"
    :id="1" :timeout="0" />
</template>