<script setup lang="ts">
import type { Database } from '@pel/supabase/types'

defineOptions({
  name: 'FOHeader',
})

const router = useRouter()
const { user, displayName, waitingMailValidation, loading } = useProfile()
const { auth } = useSupabaseClient<Database>()

const links = computed(() => {
  const tmp = []

  if (!user.value) {
    tmp.push({
      label: 'Rejoindre FO',
      to: '/join'
    })
  } else {
    tmp.push({
      label: 'Les actus',
      to: '/news'
    })
  }

  return tmp
})

const signOut = async () => {
  const { error } = await auth.signOut()
  if (error) console.log(error)
  router.push('/')
}
</script>

<template>
  <UHeader class="bg-white dark:bg-gray-900 rounded-xl shadow-lg mx-4 mt-4">
    <template #left>
      <NuxtLink to="/">
        <NuxtImg src="/assets/img/logo-fo.svg" alt="Force Orange" />
      </NuxtLink>
    </template>

    <template #right>
      <UHeaderLinks class="mx-2" :ui="{ base: 'gap-2' }" :links="links" />

      <template v-if="user">
        <UButton to="/profile" :loading="loading" icon="i-mdi-account-circle">
          {{ displayName }}
        </UButton>
        <UButton @click="signOut" variant="soft">Se déconnecter</UButton>
      </template>

      <UButton v-else to="/signin" variant="soft">Se connecter</UButton>
      <UColorModeButton />
    </template>
  </UHeader>

  <UNotification v-if="waitingMailValidation" title="N'oublies pas de confirmer ton adresse de courriel !" :id="1"
    :timeout="0" />
</template>