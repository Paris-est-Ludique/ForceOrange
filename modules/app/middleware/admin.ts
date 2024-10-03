export default defineNuxtRouteMiddleware((to, _from) => {
  const { roles } = storeToRefs(useProfile())

  if (!roles.value.incllude('admin')) {
    return navigateTo('/')
  }
})