import { zxcvbn, zxcvbnOptions, type ZxcvbnResult } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-fr'

export const usePasswordStrength = (password?: Ref<string | undefined>) => {

  // 0 # too guessable: risky password. (guesses < 10 ^ 3)
  // 1 # very guessable: protection from throttled online attacks. (guesses < 10 ^ 6)
  // 2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10 ^ 8)
  // 3 # safely unguessable: moderate protection from offline slow - hash scenario. (guesses < 10 ^ 10)
  // 4 # very unguessable: strong protection from offline slow - hash scenario. (guesses >= 10 ^ 10)

  const strength = ref<Partial<ZxcvbnResult>>({
    score: 0,
  })

  const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
    },
  }

  zxcvbnOptions.setOptions(options)

  function testPassword(password: string) {
    return zxcvbn(password.trim())
  }

  if (password) {
    watchDebounced(password, (newPassword) => {
      if (!newPassword) {
        strength.value = {
          score: 0,
        }
        return
      }

      strength.value = zxcvbn(newPassword.trim())
    }, { immediate: true, debounce: 500 })
  }

  return {
    strength,
    testPassword,
  }
} 