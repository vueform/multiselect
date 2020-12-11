import { ref, toRefs, computed, watch } from 'composition-api'

export default function useSearch (props, context, dependencies)
{
  const { searchable, mode } = toRefs(props)

  // ============ DEPENDENCIES ============

  const value = dependencies.value

  // ================ DATA ================

  const search = ref(null)

  const input = ref(null)

  // ============== COMPUTED ==============

  const tagsSearchWidth = computed(() => {
    if (search.value) {
      return `${search.value.length}ch`
    }

    if (mode.value !== 'tags' || [null, undefined].indexOf(value.value) !== -1 || !value.value.length) {
      return '100%'
    }

    return '1ch'
  })


  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = null
  }

  const blurSearch = () => {
    if (!searchable.value) {
      return
    }

    input.value.blur()
  }

  const handleTagsSearchBackspace = (e) => {
    if (search.value !== null) {
      e.stopPropagation()
    }

    if (search.value === '') {
      search.value = null
    }
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
    blurSearch,
    handleTagsSearchBackspace,
  }
}