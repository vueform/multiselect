import { ref, toRefs, computed } from 'composition-api'

export default function useDropdown (props, context, dependencies)
{
  const { maxHeight, disabled, searchable } = toRefs(props)

  // ============ DEPENDENCIES ============

  const multiselect = dependencies.multiselect
  const blurInput = dependencies.blurInput
  const blurSearch = dependencies.blurSearch
  const focusInput = dependencies.focusInput
  const focusSearch = dependencies.focusSearch

  // ================ DATA ================

  const isOpen = ref(false)

  // ============== COMPUTED ==============

  const contentMaxHeight = computed(() => {
    return `${maxHeight.value}px`
  })

  // =============== METHODS ==============

  const openDropdown = () => {
    if (disabled.value) {
      return
    }

    isOpen.value = true
    context.emit('open')
  }

  const closeDropdown = () => {
    isOpen.value = false
    context.emit('close')
  }

  const open = () => {
    if (searchable && searchable.value) {
      focusSearch()
    } else {
      focusInput()
    }
  }

  const close = () => {
    if (searchable && searchable.value) {
      blurSearch()
    } else {
      blurInput()
    }
  }

  const handleInputMousedown = (e) => {
    if (isOpen.value && !searchable.value) {
      multiselect.value.querySelector('.multiselect-input').dispatchEvent(new Event('blur'))
      multiselect.value.querySelector('.multiselect-input').blur()
      e.preventDefault()
    }
  }

  return {
    isOpen,
    contentMaxHeight,
    openDropdown,
    closeDropdown,
    open,
    close,
    handleInputMousedown,
  }
}