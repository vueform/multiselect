import { ref, toRefs, getCurrentInstance, computed, onMounted, watch, onBeforeUnmount } from 'vue'

export default function useDropdown (props, context, dep)
{
  const { disabled, appendToBody, openDirection, closeOnScroll } = toRefs(props)

  const $this = getCurrentInstance().proxy

  // ============ DEPENDENCIES ============

  const multiselect = dep.multiselect
  const dropdown = dep.dropdown
  const iv = dep.iv

  // ================ DATA ================

  const isOpen = ref(false)
  const updates = ref(0)
  
  // ============== COMPUTED ==============

  /* istanbul ignore next: UI feature */
  const dropdownStyles = computed(() => {
    if (!appendToBody.value || typeof window === 'undefined' || !isOpen.value || !dropdown.value || updates.value === -1) {
      return
    }

    let msPos = multiselect.value.getBoundingClientRect()
    let maxHeight = window.getComputedStyle(dropdown.value).maxHeight
    let spaceAbove = msPos.y
    let spaceBelow = window.innerHeight - (msPos.y + msPos.height)

    maxHeight = maxHeight.match(/%/)
      ? (parseInt(maxHeight.replace('%')) / 100) * window.innerHeight
      : parseInt(maxHeight.replace('px', ''))

    return {
      position: 'absolute',
      zIndex: 9999,
      transform: openDirection.value === 'top' ? `translateY(-100%)` : 'none',
      maxHeight: openDirection.value === 'top' ? (
        maxHeight > spaceAbove ? `${spaceAbove}px` : maxHeight
      ) : (
        maxHeight > spaceBelow ? `${spaceBelow}px` : undefined
      ),
      left: `${msPos.x}px`,
      right: `${window.innerWidth - (msPos.x + msPos.width)}px`,
      top: openDirection.value === 'top' ? `${msPos.y}px` : `${msPos.y + msPos.height}px`,
      bottom: 'auto',
    }
  })

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

  /* istanbul ignore next: UI feature */
  const getAllScrollableParents = (element) => {
    const scrollableParents = [document]

    function checkScrollable(element) {
      if (!element || !element.parentNode) {
        return
      }

      const computedStyle = window.getComputedStyle(element)
      const overflowY = computedStyle.overflowY

      if (overflowY === 'scroll' || overflowY === 'auto') {
        scrollableParents.push(element)
      }

      checkScrollable(element.parentNode)
    }

    checkScrollable(element)

    return scrollableParents
  }

  /* istanbul ignore next: UI feature */
  const updatePosition = () => {
    updates.value++
  }

  /* istanbul ignore next: UI feature */
  const handleScroll = () => {
    if (!isOpen.value) {
      return
    }

    if (closeOnScroll.value) {
      close()
    }

    updatePosition()
  }

  /* istanbul ignore next: UI feature */
  const handleResize = () => {
    if (!isOpen.value) {
      return
    }

    updatePosition()
  }

  /* istanbul ignore next: UI feature */
  watch(iv, () => {
    if (!appendToBody.value) {
      return
    }

    updatePosition()
  }, { flush: 'post' })

  /* istanbul ignore next: UI feature */
  onMounted(() => {
    if (!appendToBody.value) {
      return
    }

    getAllScrollableParents(multiselect.value).forEach((el) => {
      el.addEventListener('scroll', handleScroll)
    })

    window.addEventListener('resize', handleResize)
  })

  /* istanbul ignore next: UI feature */
  onBeforeUnmount(() => {
    if (!appendToBody.value) {
      return
    }

    getAllScrollableParents(multiselect.value).forEach((el) => {
      el.removeEventListener('scroll', handleScroll)
    })

    window.removeEventListener('resize', handleResize)
  })

  /* istanbul ignore next: UI feature */
  watch(appendToBody, (n, o) => {
    getAllScrollableParents(multiselect.value).forEach((el) => {
      if (o && !n) {
        el.removeEventListener('scroll', handleScroll)
      }
      
      if (n) {
        el.addEventListener('scroll', handleScroll)
      }
    })

    if (o && !n) {
      window.removeEventListener('resize', handleResize)
    }

    if (n) {
      window.addEventListener('resize', handleResize)
    }
  })

  return {
    isOpen,
    open,
    close,
    dropdownStyles,
  }
}