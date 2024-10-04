<script setup lang="ts">
definePageMeta({
  name: 'ProfileAuthResetPassword',
})

const router = useRouter()
</script>

<template>
  <UCard class="container mx-auto max-w-screen-md">
    <PasswordUpdateForm @success="() => router.push('/')" />
  </UCard>
</template>