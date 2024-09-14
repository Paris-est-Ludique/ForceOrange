export const useProfile = () => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  const toast = useToast()

  const loading = ref(false)
  const profile = ref<{
    firstname: string
    lastname: string
    displayname?: string
  } | null>(null)

  const displayName = computed(() => {
    if (!profile.value) {
      return '...'
    }

    const { firstname, lastname, displayname } = profile.value || {}

    if (!displayname) {
      return `${firstname || ''} ${lastname || ''}`.trim()
    }

    return displayname
  })

  const waitingMailValidation = computed(() => {
    return user.value && !user.value?.email_confirmed_at
  })


  async function getProfile() {
    loading.value = true

    const { data, error } = await useAsyncData('profiles', async () => {
      if (!user.value) {
        return
      }

      const { data, error } = await client.from('profiles').select('id,firstname,lastname,displayname,mail').eq('id', user.value.id).single()
      return data
    })

    if (error.value) {
      toast.add({ color: 'red', description: error.value?.message, title: 'Error' })
    } else {
      profile.value = data.value
    }

    loading.value = false
  }

  watch(user, (user) => {
    if (user && !loading.value) {
      getProfile()
    }
  }, { immediate: true })

  return {
    user,
    loading,
    profile,
    displayName,
    waitingMailValidation,
  }
}