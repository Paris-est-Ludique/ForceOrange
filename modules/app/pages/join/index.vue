<script setup lang="ts">
import { object, string, boolean, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  name: 'Join',
})

const schema = object({
  mail: string().email('Invalid email').required('Required'),
  password: string().required('Required'),
  firstname: string().required('Required'),
  lastname: string().required('Required'),
  isAdult: boolean().required('Required'),
})

type Schema = InferType<typeof schema>

const strenght = ref(0)

const state = reactive({
  mail: undefined,
  password: undefined,
  firstname: undefined,
  lastname: undefined,
  isAdult: false,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <UCard class="container mx-auto">
    <h1 class="text-2xl uppercase">Rejoindre Paris est Ludique!</h1>
    <p class="font-light">Pour rejoindre la Force orange de Paris est Ludique!, il est nécessaire de compléter le
      formulaire ci-dessous:
    </p>

    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <UFormGroup label="Adresse courriel">
        <UInput placeholder="Adresse courriel" name="mail" type="mail" v-model="state.mail" />
      </UFormGroup>

      <UFormGroup label="Password">
        <UInput placeholder="Password" type="password" v-model="state.password" />
      </UFormGroup>
      <UMeter :value="strenght" :max="100">
        <template #label="{ percent }">
          <p class="text-sm font-thin">
            le mot de passe est fort
          </p>
        </template>
      </UMeter>

      <div class="flex md:flex-row flex-col gap-4">
        <UFormGroup label="Prénom" class="flex-1">
          <UInput placeholder="Prénom" name="firstname" v-model="state.firstname" />
        </UFormGroup>

        <UFormGroup label="Nom de famille" class="flex-1">
          <UInput placeholder="Nom de famille" name="lastname" v-model="state.lastname" />
        </UFormGroup>
      </div>

      <UCheckbox name="isAdult" label="Je serais majeur avant la prochaine édition." v-model="state.isAdult" />

      <UButton type="submit">S'inscrire</UButton>
    </UForm>
  </UCard>
</template>