import { ref, getCurrentInstance, watch } from 'composition-api'

export default function useSearch (props, context, dep)
{
  const $this = getCurrentInstance().proxy

  // ================ DATA ================

  const search = ref(null)

  const input = ref(null)

  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = ''
  }

  const handleSearchInput = (e) => {
    search.value = e.target.value
  }

  const handlePaste = (e) => {
    context.emit('paste', e, $this)
  }

  // ============== WATCHERS ==============

  watch(search, (val) => {
    context.emit('search-change', val, $this)
  })

  return {
    search,
    input,
    clearSearch,
    handleSearchInput,
    handlePaste,
  }
}