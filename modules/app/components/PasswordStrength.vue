<script setup lang="ts">
defineOptions({
  name: 'PasswordStrength',
})

const props = defineProps<{
  modelValue: string | undefined
}>()
const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit)

const { strength } = usePasswordStrength(data)
const color = computed(() => {
  if (strength.value.score === 1) return 'red'
  if (strength.value.score === 2) return 'orange'
  if (strength.value.score === 3) return 'yellow'
  if (strength.value.score === 4) return 'green'
  return 'blue'
})
</script>

<template>
  <div>
    <p class="text-sm">
      force de ton mot de passe :
    </p>
    <div class="flex">

      <UMeter :value="strength.score" :max="4" :color="color">
        <template #label>
          <p class="text-sm font-thin">
            <template v-if="strength.score === 1">
              Le mot de passe est faible
            </template>
            <template v-else-if="strength.score === 2">
              Le mot de passe est moyen
            </template>
            <template v-else-if="strength.score === 3">
              Le mot de passe est bon
            </template>
            <template v-else-if="strength.score === 4">
              Le mot de passe est fort
            </template>
          </p>
        </template>
      </UMeter>
      <UPopover>
        <UIcon name="i-mdi-info-circle" color="blue" class="w-5 h-5 m-2 hover:text-blue-300" />
        <template #panel>
          <p class="max-w-sm p-4 text-gray-400 font-thin">
            Un mot bon mot de passe est souvent lié au nombres de charactères (une phrase est un bon mot de
            passe) et à sa complexité à deviner (non, votre code postal et le nom de votre lapin n'est pas un bon motde
            passe)
          </p>
        </template>
      </UPopover>
    </div>
  </div>
</template>