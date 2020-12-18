import { toRefs } from 'composition-api'

export default function useData (props, context, dependencies)
{
  const { object } = toRefs(props)

  // ============ DEPENDENCIES ============

  const internalValue = dependencies.internalValue

  // =============== METHODS ==============

  const update = (val) => {
    // Setting object(s) as internal value
    internalValue.value = val

    // Setting object(s) or plain value as external 
    // value based on `option` setting
    context.emit('input', makeExternal(val))
    context.emit('update:modelValue', makeExternal(val))
  } 

  // no export
  const makeExternal = (val) => {
    // If external value should be object
    // no transformation is required
    if (object.value) {
      return val
    }

    // No need to transform if empty value
    if ([null, false, undefined].indexOf(val) !== -1) {
      return val
    }

    // If external should be plain transform
    // value object to plain values
    return !Array.isArray(val) ? val.value : val.map(v => v.value)
  }

  return {
    update,
  }
}