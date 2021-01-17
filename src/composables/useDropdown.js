import { ref, toRefs, computed } from 'composition-api'

export default function useDropdown (props, context, dependencies)
{
  const { maxHeight, disabled, searchable } = toRefs(props)

  // ============ DEPENDENCIES ============

  const multiselect = dependencies.multiselect

  // ================ DATA ================

  const isOpen = ref(false)

  // ============== COMPUTED ==============

  const contentMaxHeight = computed(() => {
    return `${maxHeight.value}px`
  })

  // =============== METHODS ==============

  const open = (e) => {
    if (disabled.value) {
      return
    }

    isOpen.value = true
    context.emit('open')
  }

  const close = () => {
    isOpen.value = false
    context.emit('close')
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
    open,
    close,
    handleInputMousedown,
  }
}