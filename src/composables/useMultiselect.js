import { ref, toRefs, computed } from 'composition-api'

export default function useMultiselect (props, context, dep)
{
  const { searchable } = toRefs(props)

  // ============ DEPENDENCIES ============

  const input = dep.input

  // ================ DATA ================

  const multiselect = ref(null)

  // ============== COMPUTED ==============

  const tabindex = computed(() => {
    return searchable.value ? -1 : 0
  })

  // =============== METHODS ==============

  const blur = () => {
    if (searchable.value) {
      input.value.blur()
    }

    multiselect.value.blur()
  }

  const handleFocus = () => {
    if (searchable.value) {
      input.value.focus()
    }
  }

  return {
    multiselect,
    tabindex,
    blur,
    handleFocus,
  }
}