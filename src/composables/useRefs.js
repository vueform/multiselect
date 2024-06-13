import { shallowRef } from 'vue'

export default function useRefs (props, context, dep)
{
  // ================ DATA ================

  const multiselect = shallowRef(null)
  
  const wrapper = shallowRef(null)

  const tags = shallowRef(null)

  const input = shallowRef(null)

  const dropdown = shallowRef(null)

  return {
    multiselect,
    wrapper,
    tags,
    input,
    dropdown,
  }
}