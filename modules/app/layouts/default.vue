<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-orange-200 dark:bg-orange-900 dark:bg-opacity-30'
  }
})
</script>

<template>
  <FOHeader />

  <UMain class="m-4">
    <slot />
  </UMain>

  <UNotifications />
</template>
