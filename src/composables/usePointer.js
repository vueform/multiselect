import { ref } from 'composition-api'

export default function usePointer (props, context, dependencies)
{
  // ================ DATA ================

  const pointer = ref(null)

  return {
    pointer,
  }
}