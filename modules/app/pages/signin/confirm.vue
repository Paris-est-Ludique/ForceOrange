<script setup lang="ts">
import type { Database } from '@pel/supabase/types'

definePageMeta({
  name: 'SigninConfirm',
})

const route = useRoute()
const user = useSupabaseUser()
const { auth } = useSupabaseClient<Database>()
const { showErrorToast } = useErrorSystem()

watch(user, () => {
  if (user.value)
    return navigateTo('/')
}, { immediate: true })

onMounted(async () => {
  const token_hash = route.hash.replace('#', '')
  const type = 'signup'

  const { error } = await auth.verifyOtp({ token_hash, type })
  showErrorToast(error)

  // if (params.get('error_code').startsWith('4')) {
  //   // show error message if error is a 4xx error
  //   window.alert(params.get('error_description'))
  // }

  console.log('redirecting...')
})
</script>

<template>
  <UCard class="container mx-auto max-w-screen-md">
    <p class="u-text-black">
      Redirecting...
    </p>
  </UCard>
</template>
