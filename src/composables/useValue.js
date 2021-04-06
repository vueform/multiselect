import { computed, toRefs, ref } from 'composition-api'

export default function useValue (props, context)
{
  const { value, modelValue, mode, valueProp } = toRefs(props)

  // ================ DATA ================

  const internalValue = ref(mode.value !== 'single' ? [] : {})

  // ============== COMPUTED ==============

  /* istanbul ignore next */
  const externalValue = context.expose !== undefined ? modelValue : value

  const textValue = computed(() => {
    return mode.value !== 'single' ? internalValue.value.map(v=>v[valueProp.value]).join(',') : internalValue.value[valueProp.value]
  })

  return {
    internalValue,
    externalValue,
    textValue,
  }
}