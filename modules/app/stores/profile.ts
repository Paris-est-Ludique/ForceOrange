
// HELP: to use the store outside of the setup function, you can use the `useStore` function
// import { useStore } from '~/stores/myStore'
// export default {
//   asyncData({ $pinia }) {
//     const store = useStore($pinia)
//   },
// }

export const useProfile = defineStore('profile', () => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  const { showErrorPage } = useErrorSystem()

  const loading = ref(false)

  const profile = ref<{
    firstname: string
    lastname: string
    displayname: string | null
    email: string
    is_validated: boolean
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

  async function fetchProfile() {
    loading.value = true

    const { data, error } = await useAsyncData('profiles', async () => {
      if (!user.value) {
        return
      }

      const { data, error } = await client.from('profiles').select('id,firstname,lastname,displayname,email,is_validated').eq('id', user.value.id).single()

      if (error) {
        throw error
      }

      return data
    })

    if (error.value) {
      showErrorPage(error.value)
    } else {
      profile.value = data.value
    }

    loading.value = false
  }

  watch(user, async (user) => {
    if (user && !loading.value) {
      await fetchProfile()
    } else {
      profile.value = null
    }
  }, { immediate: true })

  return {
    user,
    loading,
    profile,
    roles: computed(() => []),
    displayName,
    waitingMailValidation,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfile, import.meta.hot))
}