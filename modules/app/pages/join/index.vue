<script setup lang="ts">
import { object, string, boolean, type InferType } from 'yup'
import type { Database } from '@pel/supabase/types'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  name: 'Join',
})

const user = useSupabaseUser()
const { auth } = useSupabaseClient<Database>()

const schema = object({
  mail: string().email('Invalid email').required('Required'),
  password: string().min(6).required('Required'),
  firstname: string().required('Required'),
  lastname: string().required('Required'),
  isAdult: boolean().required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  mail: undefined,
  password: undefined,
  firstname: undefined,
  lastname: undefined,
  isAdult: false,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  const formSubmit = event.data
  console.log(event.data)

  const { data, error } = await auth.signUp({
    email: formSubmit.mail,
    password: formSubmit.password,
    options: {
      data: {
        firstname: formSubmit.firstname,
        lastname: formSubmit.lastname,
        is_adult: formSubmit.isAdult,
      },
    },
  })

  // TODO
  // [x] create member in database if user logged in

  if (error) console.log(error)
}
</script>

<template>
  <UCard class="container mx-auto">
    <h1 class="text-2xl uppercase">Rejoindre Paris est Ludique!</h1>
    <p class="font-light">Pour rejoindre la Force orange de Paris est Ludique!, il est nécessaire de compléter le
      formulaire ci-dessous:
    </p>

    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <UFormGroup label="Adresse courriel" eager-validation>
        <UInput placeholder="Adresse courriel" name="mail" type="email" v-model="state.mail" />
      </UFormGroup>

      <UFormGroup label="Password" eager-validation>
        <UInput placeholder="Password" type="password" v-model="state.password" />
      </UFormGroup>
      <PasswordStrength v-model="state.password" />

      <div class="flex md:flex-row flex-col gap-4">
        <UFormGroup label="Prénom" class="flex-1" eager-validation>
          <UInput placeholder="Prénom" name="firstname" v-model="state.firstname" />
        </UFormGroup>

        <UFormGroup label="Nom de famille" class="flex-1" eager-validation>
          <UInput placeholder="Nom de famille" name="lastname" v-model="state.lastname" />
        </UFormGroup>
      </div>

      <UCheckbox name="isAdult" label="Je serais majeur avant la prochaine édition." v-model="state.isAdult" />

      <UButton type="submit">S'inscrire</UButton>
    </UForm>
  </UCard>
</template>