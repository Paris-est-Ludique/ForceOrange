<script setup lang="ts">
const { auth } = useSupabaseClient()

auth.onAuthStateChange(async (event) => {
  if (event === 'SIGNED_OUT')
    navigateTo('/')
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import '~/assets/main.css';
</style>