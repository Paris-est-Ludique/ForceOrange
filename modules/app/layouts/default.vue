<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-[#F9DD75F2]'
  }
})
const links = [{
  label: 'Les actus',
  to: '/'
}, {
  label: 'Rejoindre FO',
  to: '/join'
}]
</script>

<template>
  <UHeader :links="links" class="rounded-xl shadow-lg bg-white mx-4 mt-4">
    <template #left>
      <!-- <p class="font-logo text-orange-500 stroke-5 stroke-black-500 text-hlogo">Force Orange</p> -->
      <NuxtImg src="/assets/img/logo-fo.svg" alt="Force Orange" />
    </template>

    <template #right>
      <UColorModeButton />
      <UButton to="/signin" variant="soft">Se connecter</UButton>
    </template>
  </UHeader>

  <UMain class="m-4">
    <slot />
  </UMain>

  <UNotifications />
</template>
