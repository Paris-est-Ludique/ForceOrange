<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { Database } from '@pel/supabase/types'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  name: 'Signin',
})

const user = useSupabaseUser()
const { auth } = useSupabaseClient<Database>()

const schema = object({
  mail: string().email('Invalid email').required('Required'),
  password: string().required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  mail: undefined,
  password: undefined,
})

async function onSignin(event: FormSubmitEvent<Schema>) {
  const formSubmit = event.data

  const { data, error } = await auth.signInWithPassword({
    email: formSubmit.mail,
    password: formSubmit.password
  })

  // TODO: add possibility to signin with magic link -> signInWithOtp
  // const { data, error } = await auth.signInWithOtp({
  //   email: 'example@email.com',
  //   options: {
  //     // set this to false if you do not want the user to be automatically signed up
  //     shouldCreateUser: false,
  //     emailRedirectTo: 'https://example.com/welcome',
  //   },
  // })

  // TODO confirm signin

  if (error) console.log(error)
}
</script>

<template>

  <UCard>
    <h1 class="text-2xl uppercase">Qui êtes-vous ?</h1>

    <UForm :state="state" @submit="onSignin">
      <UFormGroup label="Adresse courriel">
        <UInput name="mail" v-model="state.mail" />
      </UFormGroup>

      <UFormGroup label="Mot de passe">
        <UInput type="password" name="password" v-model="state.password" />
      </UFormGroup>

      <UButton type="submit">Se Connecter</UButton>
      <UButton to="/join">Mot de passe oublié ?</UButton>
    </UForm>

    <!-- <p class="text-error">Nous n’avons pas reconnu vos identifiants.</p> -->

    <p>ou bien</p>

    <div>
      <UButton>Se connecter avec Google</UButton>
      <UButton>Se connecter avec Discord</UButton>
    </div>
  </UCard>
</template>