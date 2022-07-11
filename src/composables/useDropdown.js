import { ref, toRefs, getCurrentInstance } from 'vue'

export default function useDropdown (props, context, dep)
{
  const { disabled } = toRefs(props)

  const $this = getCurrentInstance().proxy

  // ================ DATA ================

  const isOpen = ref(false)

  // =============== METHODS ==============

  const open = () => {
    if (isOpen.value || disabled.value) {
      return
    }

    isOpen.value = true
    context.emit('open', $this)
  }

  const close = () => {
    if (!isOpen.value) {
      return
    }

    isOpen.value = false
    context.emit('close', $this)
  }

  return {
    isOpen,
    open,
    close,
  }
}