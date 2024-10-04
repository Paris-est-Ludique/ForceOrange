<script setup lang="ts">
import EmailUpdateForm from '~/components/profile/EmailUpdateForm.vue';

definePageMeta({
  name: 'Profile',
})

const { displayName, profile } = storeToRefs(useMember())

const isPasswordModalOpen = ref(false)
const isEmailModalOpen = ref(false)
</script>

<template>
  <WIPNotif />

  <div class="grid gap-8 md:grid-cols-2">
    <UCard class="md:col-span-2">
      <h1 class="text-2xl">{{ displayName }}</h1>

      <p v-if="!profile?.is_validated">
        Ton compte sera bientôt validé pour les organisateurs du festival Paris est Ludique.<br>
      </p>

      <p v-else>Ton compte a été validé ! Prêt pour Paris est Ludique 2025 ?</p>
    </UCard>

    <UCard>
      <h1 class="text-2xl uppercase mb-4">Authentification</h1>
      <p>Gérer mes manières de me connecter au site de Force Orange.</p>

      <p class="text-orange-500 mt-4">{{ profile?.email }}</p>

      <div class="my-4 flex flex-col gap-4">
        <UButton variant="soft" icon="i-mdi-email" @click="isEmailModalOpen = true">Modifier mon adresse de couriel
        </UButton>
        <UButton variant="soft" icon="i-mdi-form-textbox-password" @click="isPasswordModalOpen = true">Modifier mon mot
          de passe
        </UButton>
      </div>
    </UCard>

    <UModal v-model="isEmailModalOpen">
      <div class="p-4">
        <EmailUpdateForm @success="isEmailModalOpen = false" />
      </div>
    </UModal>

    <UModal v-model="isPasswordModalOpen">
      <div class="p-4">
        <PasswordUpdateForm @success="isPasswordModalOpen = false" />
      </div>
    </UModal>
  </div>
</template>