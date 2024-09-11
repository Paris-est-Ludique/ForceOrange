<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UMain>
    <div v-if="error?.statusCode === 404">
      <div i-mdi-robot-confused text-8xl text-white block />
      <div text-white>
        <h1>
          404<br />
          Page non trouvée
        </h1>
      </div>
      <div>
        <UButton m="3 t8" @click="handleError" bg-white font-bold>
          Retourner vite sur Force Orange
        </UButton>
      </div>
    </div>
    <div v-else>
      <h1>{{ error?.statusCode }}</h1>

      {{ error?.message }}

      <UButton m="3 t8" @click="handleError" bg-white font-bold>
        Retourner vite sur FO
      </UButton>
    </div>
  </UMain>
</template>
