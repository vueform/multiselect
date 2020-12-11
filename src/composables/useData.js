export default function useData (props, context)
{
  // =============== METHODS ==============

  const update = (val) => {
    context.emit('input', val)
    context.emit('update:modelValue', val)
  } 

  return {
    update,
  }
}