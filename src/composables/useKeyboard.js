import { toRefs } from 'composition-api'

export default function useKeyboard (props, context, dep)
{
  const {
      mode, addTagOn, createTag, openDirection, searchable,
      showOptions, valueProp, 
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
  const handleAddTag = () => {
    if (mode.value === 'tags' && !showOptions.value && createTag.value && searchable.value) {
      setPointer(fo.value[fo.value.map(o => o[valueProp.value]).indexOf(search.value)])
    }

    selectPointer()
  }

  const handleKeydown = (e) => {
    switch (e.keyCode) {
      // backspace
      case 8:
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
      case 13:
        e.preventDefault()

        if (mode.value === 'tags' && addTagOn.value.indexOf('enter') === -1) {
          return
        }
        
        handleAddTag()
        break

      // escape
      case 27:
        blur()
        break

      // space
      case 32:
        if (mode.value !== 'tags' && searchable.value) {
          return
        }

        if (mode.value === 'tags' && addTagOn.value.indexOf('space') === -1) {
          return
        }

        e.preventDefault()
        
        handleAddTag()
        break

      // up
      case 38:
        e.preventDefault()

        if (!showOptions.value) {
          return
        }

        openDirection.value === 'top' ? forwardPointer() : backwardPointer()
        break

      // down
      case 40:
        e.preventDefault()

        if (!showOptions.value) {
          return
        }

        openDirection.value === 'top' ? backwardPointer() : forwardPointer()
        break

      // semicolon
      case 186:
        if (mode.value !== 'tags') {
          return
        }

        if (addTagOn.value.indexOf(';') === -1 || !createTag.value) {
          return
        }

        handleAddTag()
        e.preventDefault()
        break
      
      // comma
      case 188:
        if (mode.value !== 'tags') {
          return
        }

        if (addTagOn.value.indexOf(',') === -1 || !createTag.value) {
          return
        }

        handleAddTag()
        e.preventDefault()
        break
    }
  }

  return {
    handleKeydown,
  }
}