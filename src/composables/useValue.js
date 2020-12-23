import { computed, toRefs, ref } from 'composition-api'

export default function useValue (props, context)
{
  const { value, modelValue, mode } = toRefs(props)

  // ================ DATA ================

  const internalValue = ref(mode.value !== 'single' ? [] : {})

  // ============== COMPUTED ==============

  /* istanbul ignore next */
  const externalValue = computed(() => {
    return context.expose !== undefined ? modelValue.value : value.value
  })

  return {
    internalValue,
    externalValue,
  }
}