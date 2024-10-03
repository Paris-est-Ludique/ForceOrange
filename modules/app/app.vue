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

  <!-- TODO: add errors boundaries instead custom toast
    <NuxtErrorBoundary @error="someErrorLogger">
      <template #error="{ error, clearError }">
        You can display the error locally here: {{ error }}
        <button @click="clearError">
          This will clear the error.
        </button>
      </template>
</NuxtErrorBoundary>
-->
</template>

<style>
@import '~/assets/main.css';
</style>