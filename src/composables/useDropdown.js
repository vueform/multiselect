import { ref, toRefs, computed } from 'composition-api'

export default function useDropdown (props, context, dep)
{
  const { maxHeight, disabled } = toRefs(props)

  // ================ DATA ================

  const isOpen = ref(false)

  // ============== COMPUTED ==============

  const contentMaxHeight = computed(() => {
    return typeof maxHeight.value === 'number' ? `${maxHeight.value}px` : maxHeight.value
  })

  // =============== METHODS ==============

  const open = () => {
    if (isOpen.value || disabled.value) {
      return
    }

    isOpen.value = true
    context.emit('open')
  }

  const close = () => {
    if (!isOpen.value) {
      return
    }

    isOpen.value = false
    context.emit('close')
  }

  return {
    isOpen,
    contentMaxHeight,
    open,
    close,
  }
}