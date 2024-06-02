import { toRefs, getCurrentInstance } from 'vue'
import toRef from './../utils/toRef'

export default function useKeyboard (props, context, dep)
{
  const {
    mode, addTagOn, openDirection, searchable,
    showOptions, valueProp, groups: groupped,
    addOptionOn: addOptionOn_, createTag, createOption: createOption_,
    reverse,
  } = toRefs(props)

  const $this = getCurrentInstance().proxy

  // ============ DEPENDENCIES ============

  const iv = dep.iv
  const update = dep.update
  const deselect = dep.deselect
  const search = dep.search
  const setPointer = dep.setPointer
  const selectPointer = dep.selectPointer
  const backwardPointer = dep.backwardPointer
  const forwardPointer = dep.forwardPointer
  const multiselect = dep.multiselect
  const wrapper = dep.wrapper
  const tags = dep.tags
  const isOpen = dep.isOpen
  const open = dep.open
  const blur = dep.blur
  const fo = dep.fo

  // ============== COMPUTED ==============

  // no export
  const createOption = toRef(() => {
    return createTag.value || createOption_.value || false
  })

  // no export
  const addOptionOn = toRef(() => {
    if (addTagOn.value !== undefined) {
      return addTagOn.value
    }
    else if (addOptionOn_.value !== undefined) {
      return addOptionOn_.value
    }

    return ['enter']
  })

  // =============== METHODS ==============

  // no export
  const preparePointer = () => {
    // When options are hidden and creating tags is allowed
    // no pointer will be set (because options are hidden).
    // In such case we need to set the pointer manually to the 
    // first option, which equals to the option created from
    // the search value.
    if (mode.value === 'tags' && !showOptions.value && createOption.value && searchable.value && !groupped.value) {
      setPointer(fo.value[fo.value.map(o => o[valueProp.value]).indexOf(search.value)])
    }
  }

  const handleKeydown = (e) => {
    context.emit('keydown', e, $this)

    let tagList
    let activeIndex

    if (['ArrowLeft', 'ArrowRight', 'Enter'].indexOf(e.key) !== -1 && mode.value === 'tags') {
      tagList = [...(multiselect.value.querySelectorAll(`[data-tags] > *`))].filter(e => e !== tags.value)
      activeIndex = tagList.findIndex(e => e === document.activeElement)
    }

    switch (e.key) {
      case 'Backspace':
        if (mode.value === 'single') {
          return
        }

        if (searchable.value && [null, ''].indexOf(search.value) === -1) {
          return
        }

        if (iv.value.length === 0) {
          return
        }

        let deselectables = iv.value.filter(v=>!v.disabled && v.remove !== false)

        if (deselectables.length) {
          deselect(deselectables[deselectables.length - 1])
        }
        break

      case 'Enter':
        e.preventDefault()

        if (e.keyCode === 229) {
          // ignore IME confirmation
          return
        }

        if (activeIndex !== -1 && activeIndex !== undefined) {
          update([...iv.value].filter((v, k) => k !== activeIndex))

          if (activeIndex === tagList.length - 1) {
            if (tagList.length - 1) {
              tagList[tagList.length - 2].focus()
            } else if (searchable.value) {
              tags.value.querySelector('input').focus()
            } else {
              wrapper.value.focus()
            }
          }
          return
        }

        if (addOptionOn.value.indexOf('enter') === -1 && createOption.value) {
          return
        }
        
        preparePointer()
        selectPointer()
        break

      case ' ':
        if (!createOption.value && !searchable.value) {
          e.preventDefault()
          
          preparePointer()
          selectPointer()
          return
        }

        if (!createOption.value) {
          return false
        } 

        if (addOptionOn.value.indexOf('space') === -1 && createOption.value) {
          return
        }

        e.preventDefault()
        
        preparePointer()
        selectPointer()
        break
      
      case 'Tab':
      case ';':
      case ',':
        if (addOptionOn.value.indexOf(e.key.toLowerCase()) === -1 || !createOption.value) {
          return
        }

        preparePointer()
        selectPointer()
        e.preventDefault()
        break

      case 'Escape':
        blur()
        break

      case 'ArrowUp':
        e.preventDefault()

        if (!showOptions.value) {
          return
        }

        /* istanbul ignore else */
        if (!isOpen.value) {
          open()
        }
        
        backwardPointer()
        break

      case 'ArrowDown':
        e.preventDefault()

        if (!showOptions.value) {
          return
        }

        /* istanbul ignore else */
        if (!isOpen.value) {
          open()
        }

        forwardPointer()
        break

      case 'ArrowLeft':
        if (
          (searchable.value && tags.value && tags.value.querySelector('input').selectionStart)
          || e.shiftKey || mode.value !== 'tags' || !iv.value || !iv.value.length
        ) {
          return
        }

        e.preventDefault()

        if (activeIndex === -1) {
          tagList[tagList.length-1].focus()
        }
        else if (activeIndex > 0) {
          tagList[activeIndex-1].focus()
        }
        break

      case 'ArrowRight':
        if (activeIndex === -1 || e.shiftKey || mode.value !== 'tags' || !iv.value || !iv.value.length) {
          return
        }

        e.preventDefault()
        
        /* istanbul ignore else */
        if (tagList.length > activeIndex + 1) {
          tagList[activeIndex+1].focus()
        }
        else if (searchable.value) {
          tags.value.querySelector('input').focus()
        }
        else if (!searchable.value) {
          wrapper.value.focus()
        }
        
        break
    }
  }

  const handleKeyup = (e) => {
    context.emit('keyup', e, $this)
  }

  return {
    handleKeydown,
    handleKeyup,
    preparePointer,
  }
}