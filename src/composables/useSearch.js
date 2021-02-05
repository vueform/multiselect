import { ref, toRefs, computed, watch } from 'composition-api'

export default function useSearch (props, context, dependencies)
{
  const { searchable, mode } = toRefs(props)

  // ============ DEPENDENCIES ============

  const internalValue = dependencies.internalValue

  // ================ DATA ================

  const search = ref(null)

  const input = ref(null)

  // ============== COMPUTED ==============

  const tagsSearchWidth = computed(() => {
    if (search.value) {
      return `${search.value.length}ch`
    }

    if (mode.value !== 'tags' || [null, undefined].indexOf(internalValue.value) !== -1 || !internalValue.value.length) {
      return '100%'
    }

    return '1ch'
  })


  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = ''
  }

  const focusSearch = () => {
    input.value.focus()
  }

  const blurSearch = () => {
    if (!searchable.value) {
      return
    }

    input.value.blur()
  }

  // ============== WATCHERS ==============

  watch(search, (val) => {
    context.emit('search-change', val)
  })

  return {
    search,
    input,
    tagsSearchWidth,
    clearSearch,
    focusSearch,
    blurSearch,
  }
}