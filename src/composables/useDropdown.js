import { ref, toRefs, computed } from 'composition-api'

export default function useDropdown (props, context, dependencies)
{
  const { maxHeight, disabled } = toRefs(props)

  // ================ DATA ================

  const isOpen = ref(false)

  // ============== COMPUTED ==============

  const contentMaxHeight = computed(() => {
    return `${maxHeight.value}px`
  })

  // =============== METHODS ==============

  const open = () => {
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

  return {
    isOpen,
    contentMaxHeight,
    open,
    close,
  }
}