export default defineAppConfig({
  ui: {
    primary: 'orange',
    button: {
      default: {
        color: 'primary',
      },
    },
    input: {
      placeholder: 'placeholder-transparent',
      default: {
        size: 'md',
        color: 'primary',
        variant: 'none'
      },
    },
    formGroup: {
      wrapper: 'flex flex-col md:flex-row rounded-lg py-1 px-4 border-b-2 border-orange-500',
      inner: 'flex-2 content-center',
      container: 'flex-1 mt-auto',
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
