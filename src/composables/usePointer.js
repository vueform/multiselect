import { ref } from 'composition-api'

export default function usePointer (props, context, dep)
{
  // ================ DATA ================

  const pointer = ref(null)

  // =============== METHODS ==============

  const setPointer = (option) => {
    if (option === undefined || (option !== null && option.disabled)) {
      return
    }

    pointer.value = option
  }

  const clearPointer = () => {
    setPointer(null)
  }

  return {
    pointer,
    setPointer,
    clearPointer,
  }
}