import { ref } from 'vue'

export default function useRefs (props, context, dep)
{
  // ================ DATA ================

  const multiselect = ref(null)
  
  const wrapper = ref(null)

  const tags = ref(null)

  const input = ref(null)

  const dropdown = ref(null)

  return {
    multiselect,
    wrapper,
    tags,
    input,
    dropdown,
  }
}