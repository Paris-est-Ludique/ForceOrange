export const useAuth = () => {
  const user = useSupabaseUser()
  const { auth } = useSupabaseClient()

  auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_OUT')
      navigateTo('/')
  })

  return {
    user
  }
}