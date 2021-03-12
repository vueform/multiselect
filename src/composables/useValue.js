import { computed, toRefs, ref } from 'composition-api'
import isNullish from './../utils/isNullish'

export default function useValue (props, context)
{
  const { value, modelValue, mode, valueProp } = toRefs(props)

  // ================ DATA ================

  const internalValue = ref(mode.value !== 'single' ? [] : {})

  // ============== COMPUTED ==============

  /* istanbul ignore next */
  const externalValue = context.expose !== undefined ? modelValue : value

  const currentValue = computed(() => {
    if (!Object.keys(internalValue.value).length) {
      return internalValue.value
    }

    return mode.value !== 'single' ? internalValue.value.map(v=>v[valueProp.value]) : internalValue.value[valueProp.value]
  })

  const textValue = computed(() => {
    return mode.value !== 'single' ? internalValue.value.map(v=>v[valueProp.value]).join(',') : internalValue.value[valueProp.value]
  })

  return {
    internalValue,
    externalValue,
    currentValue,
    textValue,
  }
}