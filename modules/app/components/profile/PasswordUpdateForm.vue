<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { Database } from '@pel/supabase/types'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  name: 'PasswordUpdateForm',
})

const emit = defineEmits(['success', 'error'])

const toast = useToast()
const { auth } = useSupabaseClient<Database>()
const { testPassword } = usePasswordStrength()
const { inputStyle, formGroupStyle } = useFoStyle()

const loading = ref(false)

const schema = object({
  password: string().min(6, 'Il faudrait un minimum de 6 charactères').test({
    name: 'password',
    message: 'Le mot de passe n\'est pas assez fort ~~',
    test: (value) => {
      if (!value) return false
      return testPassword(value).score >= 3
    },
  }).required('Champ obligatoire'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  password: undefined,
})

async function onSave(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const formSubmit = event.data

  const { data, error } = await auth.updateUser({
    password: formSubmit.password,
  })

  if (error) {
    console.log(error)
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de l\'envoi du nouveau mot de passe',
      color: 'red',
    })

    emit('error')
  } else {
    console.log(data)

    toast.add({
      title: 'Mot de passe changé',
      description: 'Nouveau mot de passe sauvegardé, vérifie tes mails pour confirmer le changement',
      color: 'orange',
    })

    emit('success')
  }

  loading.value = false
}
</script>

<template>
  <h1 class="text-2xl uppercase">Réinitialiser votre mot de passe</h1>
  <p>Nous pouvons envoyer un lien de récupération à l’adresse courriel associé à votre compte.</p>

  <UForm :schema="schema" :state="state" @submit="onSave" class="my-8">
    <UFormGroup :ui="formGroupStyle.ui" label="Nouveau mot de passe" name="password">
      <template #default="{ error }">
        <UInput :ui="inputStyle.ui" v-bind="inputStyle.attrs" placeholder="***" type="password" v-model="state.password"
          :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
      </template>
    </UFormGroup>

    <PasswordStrength v-model="state.password" />

    <p class="mt-8 text-center">
      <UButton type="submit" variant="soft" :disabled="loading" :loading="loading">Sauvegarder le nouveau mot de passe
      </UButton>
    </p>
  </UForm>
</template>