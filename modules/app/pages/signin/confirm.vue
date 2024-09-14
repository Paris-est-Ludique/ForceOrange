<script setup lang="ts">
import type { Database } from '@pel/supabase/types'

definePageMeta({
  name: 'SigninConfirm',
})

const user = useSupabaseUser()
const { auth } = useSupabaseClient<Database>()

watch(user, () => {
  if (user.value)
    return navigateTo('/')
}, { immediate: true })

onMounted(async () => {
  const token_hash = window.location.hash.replace('#', '')
  const type = 'signup'

  const { error } = await auth.verifyOtp({ token_hash, type })
  if (error) console.log(error)
})
</script>

<template>
  <UCard class="container mx-auto max-w-screen-md">
    <p class="u-text-black">
      Redirecting...
    </p>
  </UCard>
</template>
