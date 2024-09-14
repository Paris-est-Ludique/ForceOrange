export const useFoStyle = () => {
  return {
    inputStyle: {
      ui: {
        placeholder: 'placeholder-transparent',
      },
      attrs: {
        variant: 'none'
      }
    },
    formGroupStyle: {
      ui: {
        wrapper: 'flex flex-col md:flex-row rounded-lg py-1 px-4 border-b-2 border-orange-500 has-[:focus]:bg-orange-100 has-[:focus]:border-t-2 has-[:focus]:border-x-2 has-[:focus]:border-b-0 mb-6',
        inner: 'flex-2 content-center',
        container: 'flex-1 mt-auto relative',
        error: 'text-red-500 text-sm absolute top[-100%] left-0 mt-2 pointer-events-none',
      },
    },
  }
}