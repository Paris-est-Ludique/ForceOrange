export const useFoStyle = () => {
  return {
    inputStyle: {
      ui: {
        placeholder: 'placeholder-transparent dark:placeholder-transparent',
      },
      attrs: {
        variant: 'none'
      }
    },
    formGroupStyle: {
      ui: {
        wrapper: 'flex flex-col relative md:flex-row rounded-lg py-1 px-4 border-b-2 border-orange-500 has-[:focus]:bg-orange-100 dark:border-orange-500 dark:has-[:focus]:bg-orange-800  has-[:focus]:border-t-2 has-[:focus]:border-x-2 has-[:focus]:border-b-0 mb-6',
        inner: 'flex-2 content-center',
        container: 'flex-1 mt-auto position-unset',
        error: 'text-red-500 text-sm absolute top[-100%] left-0 mt-2 pointer-events-none',
        help: 'absolute top[-100%] left-0 mt-2 pointer-events-none',
      },
    },
  }
}