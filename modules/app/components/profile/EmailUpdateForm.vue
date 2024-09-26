<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { Database } from '@pel/supabase/types'
import type { FormSubmitEvent } from '#ui/types'
import { lowerString } from '~/utils/commons';

definePageMeta({
  name: 'EmailUpdateForm',
})

const emit = defineEmits(['success', 'error'])

const toast = useToast()
const { auth } = useSupabaseClient<Database>()
const { inputStyle, formGroupStyle } = useFoStyle()

const loading = ref(false)
const schema = object({
  email: string().lowercase().trim().email('Il semble que l\'email ne soit pas bon').max(500, 'hmmmm c\'est un peu beaucoup là non ?').required('Champ obligatoire'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
})

async function onSave(event: FormSubmitEvent<Schema>) {
  loading.value = true

  const formSubmit = event.data
  const { data, error } = await auth.updateUser({
    email: lowerString(formSubmit.email),
  })

  if (error) {
    console.log(error)
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de l\'envoi du nouveau courriel',
      color: 'red',
    })

    emit('error')
  } else {
    console.log(data)

    toast.add({
      title: 'Adresse de courriel changé',
      description: 'Nouveau courriel sauvegardé, vérifie tes mails pour confirmer le changement',
      color: 'orange',
    })

    emit('success')
  }

  loading.value = false
}
</script>

<template>
  <h1 class="text-2xl uppercase">Modification de votre adresse de couriel</h1>

  <UForm :schema="schema" :state="state" @submit="onSave">
    <UFormGroup :ui="formGroupStyle.ui" label="Nouvelle adresse courriel" name="email">
      <template #default="{ error }">
        <UInput :ui="inputStyle.ui" v-bind="inputStyle.attrs" placeholder="Adresse courriel" type="email"
          v-model="state.email" :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
      </template>
    </UFormGroup>

    <p class="mt-8 text-center">
      <UButton type="submit" variant="soft" :disabled="loading" :loading="loading">
        Sauvegarder la nouvelle adresse
      </UButton>
    </p>
  </UForm>
</template>