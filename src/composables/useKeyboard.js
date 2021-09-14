import { toRefs } from 'composition-api'

export default function useKeyboard (props, context, dep)
{
  const {
      mode, addTagOn, createTag, openDirection, searchable,
      showOptions, valueProp, groups: groupped,
    } = toRefs(props)

  // ============ DEPENDENCIES ============

  const iv = dep.iv
  const update = dep.update
  const search = dep.search
  const setPointer = dep.setPointer
  const selectPointer = dep.selectPointer
  const backwardPointer = dep.backwardPointer
  const forwardPointer = dep.forwardPointer
  const blur = dep.blur
  const fo = dep.fo

  // =============== METHODS ==============

  // no export
  const preparePointer = () => {
    // When options are hidden and creating tags is allowed
    // no pointer will be set (because options are hidden).
    // In such case we need to set the pointer manually to the
    // first option, which equals to the option created from
    // the search value.
    if (mode.value === 'tags' && !showOptions.value && createTag.value && searchable.value && !groupped.value) {
      setPointer(fo.value[fo.value.map(o => o[valueProp.value]).indexOf(search.value)])
    }
  }

  const handleKeydown = (e) => {
    switch (e.key) {
      // backspace
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

        update([...iv.value].slice(0,-1))
        break

      // enter
      case 'Enter':
        e.preventDefault()

        if (mode.value === 'tags' && addTagOn.value.indexOf('enter') === -1 && createTag.value) {
          return
        }

        preparePointer()
        selectPointer()
        break

      // space
      case ' ':
        if (searchable.value && mode.value !== 'tags' && !createTag.value) {
          return
        }

        if (mode.value === 'tags' && ((addTagOn.value.indexOf('space') === -1 && createTag.value) || !createTag.value)) {
          return
        }

        e.preventDefault()

        preparePointer()
        selectPointer()
        break

      // tab
      // semicolon
      // comma
      case 'Tab':
      case ';':
      case ',':
        if (mode.value !== 'tags') {
          return
        }

        const charMap = {
          9: 'tab',
          186: ';',
          188: ','
        }

        if (addTagOn.value.indexOf(charMap[e.keyCode]) === -1 || !createTag.value) {
          return
        }

        preparePointer()
        selectPointer()
        e.preventDefault()
        break

      // escape
      case 'Escape':
        blur()
        break

      // up
      case 'ArrowUp':
        e.preventDefault()

        if (!showOptions.value) {
          return
        }

        openDirection.value === 'top' ? forwardPointer() : backwardPointer()
        break

      // down
      case 'ArrowDown':
        e.preventDefault()

        if (!showOptions.value) {
          return
        }

        openDirection.value === 'top' ? backwardPointer() : forwardPointer()
        break
    }
  }

  return {
    handleKeydown,
    preparePointer,
  }
}
