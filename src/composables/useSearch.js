import { ref, toRefs, computed, watch } from 'composition-api'

export default function useSearch (props, context, dep)
{
  const { mode } = toRefs(props)

  // ============ DEPENDENCIES ============

  const iv = dep.iv

  // ================ DATA ================

  const search = ref(null)

  const input = ref(null)

  // ============== COMPUTED ==============

  const tagsSearchWidth = computed(() => {
    if (search.value) {
      return `${search.value.length}ch`
    }

    if (mode.value !== 'tags' || [null, undefined].indexOf(iv.value) !== -1 || !iv.value.length) {
      return '100%'
    }

    return '1ch'
  })


  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = ''
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
  }
}