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
    // istanbul ignore next
    if (search.value) {
      return `${textWidth.value}px`
    }

    if (mode.value !== 'tags' || [null, undefined].indexOf(iv.value) !== -1 || !iv.value.length) {
      return '100%'
    }

    return '1ch'
  })

  const textWidth = computed(() => {
    const span = document.createElement('span')
    span.innerHTML = search.value.replace(/ /g, '&nbsp;')
    span.style.position = 'absolute'
    span.style.left = '-9999px'
    span.style.top = '-9999px'
    document.body.append(span)
    const width = span.offsetWidth
    span.remove()

    return width
  })


  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = ''
  }

  const handleSearchInput = (e) => {
    search.value = e.target.value
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
    handleSearchInput,
  }
}