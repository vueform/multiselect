import { ref, toRefs, getCurrentInstance, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow'
import flip from '@popperjs/core/lib/modifiers/flip'
import toRef from './../utils/toRef'

export default function useDropdown (props, context, dep)
{
  const { disabled, appendTo, appendToBody, openDirection } = toRefs(props)

  const $this = getCurrentInstance().proxy

  // ============ DEPENDENCIES ============

  const multiselect = dep.multiselect
  const dropdown = dep.dropdown

  // ================ DATA ================

  const isOpen = ref(false)
  const popper = ref(null)
  const forcedPlacement = ref(null)
  
  // ============== COMPUTED ==============

  const appended = toRef(() => {
    return appendTo.value || appendToBody.value
  })

  const placement = toRef(() => {
    return (openDirection.value === 'top' && forcedPlacement.value === 'bottom') ||
           (openDirection.value === 'bottom' && forcedPlacement.value !== 'top')
            ? 'bottom'
            : 'top'
  })

  // =============== METHODS ==============

  const open = () => {
    if (isOpen.value || disabled.value) {
      return
    }

    isOpen.value = true
    context.emit('open', $this)


    if (appended.value) {
      nextTick(() => {
        updatePopper()
      })
    }
  }

  const close = () => {
    if (!isOpen.value) {
      return
    }

    isOpen.value = false
    context.emit('close', $this)
  }

  const updatePopper = () => {
    if (!popper.value) {
      return
    }

    let borderTopWidth = parseInt(window.getComputedStyle(dropdown.value).borderTopWidth.replace('px', ''))
    let borderBottomWidth = parseInt(window.getComputedStyle(dropdown.value).borderBottomWidth.replace('px', ''))
    
    popper.value.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        {
          name: 'offset',
          options: {
            offset: [0, (placement.value === 'top' ? borderTopWidth : borderBottomWidth) * -1],
          },
        },
      ]
    }))

    popper.value.update()
  }

  /* istanbul ignore next: UI feature */
  const hasFixedParent = (element) => {
    while (element && element !== document.body) {
      const style = getComputedStyle(element)

      if (style.position === 'fixed') {
          return true
      }

      element = element.parentElement
    }
    
    return false
  }

  onMounted(() => {
    if (!appended.value) {
      return
    }

    /* istanbul ignore next: popper mock */
    popper.value = createPopper(multiselect.value, dropdown.value, {
      strategy: hasFixedParent(multiselect.value) ? /* istanbul ignore next: UI feature */ 'fixed' : undefined,
      placement: openDirection.value,
      modifiers: [
        preventOverflow,
        flip,
        {
          name: 'sameWidth',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: ({ state }) => {
            state.styles.popper.width = `${state.rects.reference.width}px`
          },
          effect: ({ state }) => {
            state.elements.popper.style.width = `${
              state.elements.reference.offsetWidth
            }px`
          }
        },
        {
          name: 'toggleClass',
          enabled: true,
          phase: 'write',
          fn({ state }) {
            forcedPlacement.value = state.placement
          },
        },
      ]
    })
  })

  onBeforeUnmount(() => {
    if (!appended.value || !popper.value) {
      return
    }

    popper.value.destroy()
    popper.value = null
  })

  return {
    popper,
    isOpen,
    open,
    close,
    placement,
    updatePopper,
  }
}