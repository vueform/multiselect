import { computed, toRefs } from 'composition-api'

export default function useValue (props, context)
{
  const { value, modelValue } = toRefs(props)

  // ============== COMPUTED ==============

  /* istanbul ignore next */
  const externalValue = computed(() => {
    return value === undefined ? modelValue.value : value.value
  })

  return {
    value: externalValue,
  }
}