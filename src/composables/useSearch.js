import { ref, getCurrentInstance, watch, toRefs } from 'composition-api'

export default function useSearch (props, context, dep)
{7
  const { regex } = toRefs(props)

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

  const handleKeypress = (e) => {
    if (regex && regex.value) {
      let regexp = regex.value

      if (typeof regexp === 'string') {
        regexp = new RegExp(regexp)
      }

      if (!e.key.match(regexp)) {
        e.preventDefault()
      }
    }
  }

  const handlePaste = (e) => {
    if (regex && regex.value) {
      let clipboardData = e.clipboardData || /* istanbul ignore next */ window.clipboardData
      let pastedData = clipboardData.getData('Text')

      let regexp = regex.value

      if (typeof regexp === 'string') {
        regexp = new RegExp(regexp)
      }
      
      if (!pastedData.split('').every(c => !!c.match(regexp))) {
        e.preventDefault()
      }
    }

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
    handleKeypress,
    handlePaste,
  }
}