import { ref, toRefs, computed } from 'composition-api'

export default function useMultiselect (props, context, dep)
{
  const { searchable, disabled } = toRefs(props)

  // ============ DEPENDENCIES ============

  const input = dep.input
  const open = dep.open
  const close = dep.close
  const clearSearch = dep.clearSearch
  const isOpen = dep.isOpen

  // ================ DATA ================

  const multiselect = ref(null)
  const tags = ref(null)

  const isActive = ref(false)

  // ============== COMPUTED ==============

  const tabindex = computed(() => {
    return searchable.value || disabled.value ? -1 : 0
  })

  // =============== METHODS ==============

  const blur = () => {
    if (searchable.value) {
      input.value.blur()
    }

    multiselect.value.blur()
  }

  const focus = () => {
    if (searchable.value && !disabled.value) {
      input.value.focus()
    }
  }

  const handleFocus = () => {
    focus()
  }

  const activate = () => {
    if (disabled.value) {
      return
    }

    isActive.value = true

    open()
  }

  const deactivate = () => {
    isActive.value = false

    setTimeout(() => {
      if (!isActive.value) {
        close()
        clearSearch()
      }
    }, 1)
  }

  const handleCaretClick = () => {
    deactivate()
    blur()
  }

  /* istanbul ignore next */
  const handleMousedown = (e) => {
    if (isOpen.value && (e.target.isEqualNode(multiselect.value) || e.target.isEqualNode(tags.value))) {
      setTimeout(() => {
        deactivate()
      }, 0)
    } else if (document.activeElement.isEqualNode(multiselect.value) && !isOpen.value) {
      activate()    
    }
  }

  return {
    multiselect,
    tags,
    tabindex,
    isActive,
    blur,
    focus,
    handleFocus,
    activate,
    deactivate,
    handleCaretClick,
    handleMousedown,
  }
}