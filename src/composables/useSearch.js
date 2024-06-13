import { ref, getCurrentInstance, watch, toRefs } from 'vue'

export default function useSearch (props, context, dep)
{
  const { regex } = toRefs(props)

  const $this = getCurrentInstance().proxy

  // ============ DEPENDENCIES ============

  const isOpen = dep.isOpen
  const open = dep.open

  // ================ DATA ================

  const search = ref(null)

  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = ''
  }

  const handleSearchInput = (e) => {
    search.value = e.target.value
  }

  const handleKeypress = (e) => {
    if (regex.value) {
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
    if (regex.value) {
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
    if (!isOpen.value && val) {
      open()
    }

    context.emit('search-change', val, $this)
  })

  return {
    search,
    clearSearch,
    handleSearchInput,
    handleKeypress,
    handlePaste,
  }
}
