<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { Database } from '@pel/supabase/types'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  name: 'Signin',
})

const router = useRouter()
const toast = useToast()
const { showErrorToast } = useErrorSystem()

const loading = ref(false)
const { auth } = useSupabaseClient<Database>()

const { inputStyle, formGroupStyle } = useFoStyle()

const schema = object({
  email: string().lowercase().trim().email('Invalid email').required('Required'),
  password: string().trim().required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

async function onSignin(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const formSubmit = event.data

  const { data, error } = await auth.signInWithPassword({
    email: formSubmit.email,
    password: formSubmit.password
  })

  // TODO: add possibility to signin with magic link -> signInWithOtp
  // const { data, error } = await auth.signInWithOtp({
  //   email: 'example@email.com',
  //   options: {
  //     // set this to false if you do not want the user to be automatically signed up
  //     shouldCreateUser: false,
  //     emailRedirectTo: 'https://example.com/waiting',
  //   },
  // })

  if (error) {
    showErrorToast(error, 'Une erreur est survenue lors de ton inscription')
  } else {
    toast.add({
      title: 'Connecté(e)',
      description: 'Que la force Orange soit avec toi !',
      color: 'orange',
    })

    router.push('/')
  }
  loading.value = false
}
</script>

<template>
  <UCard class="container mx-auto max-w-screen-md">
    <h1 class="text-2xl uppercase mb-4">Qui êtes-vous ?</h1>

    <UForm :schema="schema" :state="state" @submit="onSignin">
      <UFormGroup :ui="formGroupStyle.ui" label="Adresse courriel" name="email">
        <UInput :ui="inputStyle.ui" v-bind="inputStyle.attrs" v-model="state.email" />
      </UFormGroup>

      <UFormGroup :ui="formGroupStyle.ui" label="Mot de passe" name="password">
        <UInput :ui="inputStyle.ui" v-bind="inputStyle.attrs" type="password" v-model="state.password" />
      </UFormGroup>

      <div class="mt-8 md:justify-center flex flex-col md:flex-row gap-2 md:gap-8">
        <UButton type="submit" :disabled="loading" :loading="loading">Se Connecter</UButton>
        <UButton :to="{ name: 'SigninForgot' }" variant="ghost">Mot de passe oublié ?</UButton>
      </div>
    </UForm>

    <p class="mt-8">
      Tu n'as pas encore de compte ? alors tu peux
      <UButton class="ml-2" to="/join" variant="outline">t'inscrire sur Force Orange</UButton>
    </p>

    <!-- <p>ou bien</p>

    <div>
      <UButton>Se connecter avec Google</UButton>
      <UButton>Se connecter avec Discord</UButton>
    </div> -->
  </UCard>
</template>