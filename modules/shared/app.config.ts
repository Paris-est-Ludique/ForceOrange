const preset = {
  border: ''
}

export default defineAppConfig({
  ui: {
    primary: 'orange',
    gray: 'slate',
    button: {
      colors: {
        orange: {
          solid: 'border-x-2 border-b-2 border-orange-600 dark:border-orange-900 active:border-t-2 active:border-b-0',
        }
      },
      variant: {
        solid: 'border-x-2 border-b-2 border-{color}-600 dark:border-{color}-900 active:border-t-2 active:border-b-0',
      },
      default: {
        size: 'md',
      },
    },
    input: {
      colors: {
        orange: {
          base: 'dark:focus:bg-orange-800 focus:bg-orange-100',
        }
      },
      base: 'dark:focus:bg-{color}-800 focus:bg-{color}-100',
      default: {
        size: 'md',
      },
    },
    formGroup: {
      label: {
        base: 'font-thin'
      },
      help: 'text-gray-400 text-xs leading-tight',
      default: {
        size: 'md',
      },
    },
    card: {
      rounded: 'rounded-3xl',
      shadow: 'shadow-lg',
    },
    header: {
      rounded: 'rounded-xl',
    }
  },
})
