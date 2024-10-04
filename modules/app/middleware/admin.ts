export default defineNuxtRouteMiddleware((to, _from) => {
  const { roles } = storeToRefs(useMember())

  if (!roles.value.include('admin')) {
    return navigateTo('/')
  }
})