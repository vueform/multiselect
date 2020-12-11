import { ref, toRefs, computed } from 'composition-api'

export default function useMultiselect (props, context, dependencies)
{
  const { searchable, id } = toRefs(props)

  // ================ DATA ================

  const multiselect = ref(null)

  // ============== COMPUTED ==============

  const tabindex = computed(() => {
    return searchable.value ? -1 : 0
  })

  // =============== METHODS ==============

  const blurInput = () => {
    document.getElementById(id.value).querySelector('.multiselect-input').blur()
  }

  return {
    multiselect,
    tabindex,
    blurInput,
  }
}