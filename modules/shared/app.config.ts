export default defineAppConfig({
  ui: {
    primary: 'orange',
    button: {
      default: {
        color: 'primary',
      },
    },
    input: {
      base: 'focus:bg-orange-100',
      default: {
        size: 'md',
        color: 'primary',
      },
    },
    formGroup: {
      label: {
        base: 'font-thin'
      },
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
