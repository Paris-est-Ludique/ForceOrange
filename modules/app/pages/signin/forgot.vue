<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { Database } from '@pel/supabase/types'
import type { FormSubmitEvent } from '#ui/types'
import { lowerString } from '~/utils/commons';

definePageMeta({
  name: 'SigninForgot',
})

const config = useRuntimeConfig()
const router = useRouter()
const toast = useToast()
const { showErrorToast } = useErrorSystem()

const loading = ref(false)
const sended = ref(false)
const { auth } = useSupabaseClient<Database>()

const { inputStyle, formGroupStyle } = useFoStyle()

const schema = object({
  email: string().lowercase().trim().email('Il semble que l\'email ne soit pas bon').required('Champ obligatoire'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
})

async function onSend(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const formSubmit = event.data

  const { data, error } = await auth.resetPasswordForEmail(lowerString(formSubmit.email), {
    redirectTo: `${config.public.baseUrl}/profile/auth/reset`,
  })

  if (error) {
    showErrorToast(error, 'Une erreur est survenue lors de l\'envoi du lien de récupération')
  } else {
    toast.add({
      title: 'Va regarder ta boite de courriel !',
      description: 'Nous avons envoyé un lien de récupération à votre adresse courriel',
      color: 'orange',
    })
  }

  loading.value = false
  sended.value = true
}
</script>

<template>
  <UCard v-if="sended" class="container mx-auto max-w-screen-md">
    <h1 class="text-2xl uppercase mb-8">C’est parti</h1>
    <p>
      Si nous avons connaissance de cette adresse, vous devriez recevoir un courriel contenant les instructions pour
      récupérer votre compte Force Orange.
    </p>
    <p class="my-8">
      <UButton to="/" variant="ghost">
        Fermer cette page
      </UButton>
    </p>
  </UCard>

  <UCard v-else class="container mx-auto max-w-screen-md">
    <h1 class="text-2xl uppercase mb-4">Réinitialiser votre mot de passe</h1>
    <p>Nous pouvons envoyer un lien de récupération à l’adresse courriel associé à votre compte.</p>

    <UForm :schema="schema" :state="state" @submit="onSend" class="my-8">
      <UFormGroup :ui="formGroupStyle.ui" label="Adresse courriel" name="email">
        <UInput :ui="inputStyle.ui" v-bind="inputStyle.attrs" v-model="state.email" />
      </UFormGroup>

      <p class="mt-8 text-center">
        <UButton type="submit" variant="soft" :disabled="loading" :loading="loading">Récupérer mon compte</UButton>
      </p>
    </UForm>
  </UCard>
</template>