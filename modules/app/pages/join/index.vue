<script setup lang="ts">
import { object, string, boolean, type InferType } from 'yup'
import type { Database } from '@pel/supabase/types'
import type { FormSubmitEvent, FormErrorEvent } from '#ui/types'
import { lowerString } from '~/utils/commons';

definePageMeta({
  name: 'Join',
})

const { testPassword } = usePasswordStrength()
const { inputStyle, formGroupStyle } = useFoStyle()
const config = useRuntimeConfig()

const router = useRouter()
const toast = useToast()
const { auth } = useSupabaseClient<Database>()

const schema = object({
  email: string().lowercase().trim().max(500, 'hmmmm c\'est un peu beaucoup là non ?').email('Il semble que l\'email ne soit pas bon').required('Champ obligatoire'),
  password: string().min(6, 'Il faudrait un minimum de 6 charactères').max(500, 'hmmmm c\'est un peu beaucoup là non ?').test({
    name: 'password',
    message: 'Le mot de passe n\'est pas assez fort ~~',
    test: (value) => {
      if (!value) return false
      return testPassword(value).score >= 3
    },
  }).required('Champ obligatoire'),
  firstname: string().trim().max(500, 'hmmmm c\'est un peu beaucoup là non ?').required('Champ obligatoire'),
  lastname: string().trim().max(500, 'hmmmm c\'est un peu beaucoup là non ?').required('Champ obligatoire'),
  isAdult: boolean().oneOf([true], 'Pour pouvoir t\'inscrire tu dois être majeur (ou bientôt)'),
  lastEdition: boolean(),
})

type Schema = InferType<typeof schema>

const form = ref<HTMLFormElement | null>(null)
const isJoining = ref(false)
const state = reactive({
  email: undefined,
  password: undefined,
  firstname: undefined,
  lastname: undefined,
  isAdult: false,
  lastEdition: false,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isJoining.value = true

  // Do something with event.data
  const formSubmit = event.data
  const { data, error } = await auth.signUp({
    email: lowerString(formSubmit.email),
    password: formSubmit.password,
    options: {
      data: {
        firstname: lowerString(formSubmit.firstname),
        lastname: lowerString(formSubmit.lastname),
        is_adult: formSubmit.isAdult,
        last_edition: formSubmit.lastEdition,
      },
      emailRedirectTo: `${config.public.baseUrl}/join/valid`,
    },
  })

  if (error) {
    console.log(error)
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de l\'inscription',
      color: 'red',
    })
  } else {
    console.log(data)
    // Redirect to the waiting page
    toast.add({
      title: 'Super !',
      description: 'On a bien reçu ton inscription, un email de validation t\'a été envoyé',
      color: 'green',
    })
    router.push({ name: 'JoinWaiting' })
  }

  isJoining.value = false
}

async function onError(event: FormErrorEvent) {
  console.log(event.errors)
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <UCard class="container mx-auto max-w-screen-lg">
    <h1 class="text-2xl uppercase mb-4">Rejoindre Paris est Ludique!</h1>
    <p class="font-light">Pour rejoindre la Force orange de Paris est Ludique!, il est nécessaire de compléter le
      formulaire ci-dessous:
    </p>

    <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" @error="onError" class="my-8">
      <UFormGroup :ui="formGroupStyle.ui" label="Adresse courriel" name="email">
        <template #default="{ error }">
          <UInput :ui="inputStyle.ui" v-bind="inputStyle.attrs" placeholder="Adresse courriel" v-model="state.email"
            :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
        </template>
      </UFormGroup>

      <div class="flex md:flex-row flex-col gap-4 my-4">
        <div class="flex-1">
          <UFormGroup :ui="formGroupStyle.ui" label="Mot de passe" name="password">
            <template #default="{ error }">
              <UInput :ui="inputStyle.ui" v-bind="inputStyle.attrs" placeholder="***" type="password"
                v-model="state.password"
                :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
            </template>
          </UFormGroup>
        </div>
        <div class="flex-1">
          <PasswordStrength v-model="state.password" />
        </div>
      </div>

      <div class="flex md:flex-row flex-col gap-4 mb-4">
        <div class="flex-1">
          <UFormGroup :ui="formGroupStyle.ui" label="Prénom (le vrai !)" name="firstname">
            <template #default="{ error }">
              <UInput :ui="inputStyle.ui" v-bind="inputStyle.attrs" placeholder="Roger" v-model="state.firstname"
                :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
            </template>
            <template #help>
              Attention pas de pseudos/surnom ici ! (sinon nous ne pouvons pas valider ton profil)
            </template>
          </UFormGroup>
        </div>

        <div class="flex-1">
          <UFormGroup :ui="formGroupStyle.ui" label="Nom de famille" name="lastname">
            <template #default="{ error }">
              <UInput :ui="inputStyle.ui" v-bind="inputStyle.attrs" placeholder="Rabbit" v-model="state.lastname"
                :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
            </template>
          </UFormGroup>
        </div>
      </div>

      <UFormGroup name="lastEdition" class="my-8">
        <UCheckbox label="J'ai participer à la précédente édition ?" v-model="state.lastEdition" />
        <template #help>
          Dis nous si tu étais déjà bénévole à la dernière édition.<br>
          Surtout ne mens pas, on vous connait ! (et on a les photos)
        </template>
      </UFormGroup>

      <UFormGroup name="isAdult" class="mb-4">
        <UCheckbox label="Je serais majeur avant la prochaine édition." v-model="state.isAdult" />
      </UFormGroup>

      <UButton color="orange" type="submit" :loading="isJoining" :disabled="isJoining">S'inscrire</UButton>
    </UForm>
  </UCard>
</template>