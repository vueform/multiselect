import { toRefs } from 'composition-api'

export default function useKeyboard (props, context, dep)
{
  const { mode, addTagOn, createTag, openDirection, searchable } = toRefs(props)

  // ============ DEPENDENCIES ============

  const iv = dep.iv
  const update = dep.update
  const search = dep.search
  const selectPointer = dep.selectPointer
  const backwardPointer = dep.backwardPointer
  const forwardPointer = dep.forwardPointer
  const blur = dep.blur

  // =============== METHODS ==============

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

        selectPointer()
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
        selectPointer()
        break

      // up
      case 38:
        e.preventDefault()
        openDirection.value === 'top' ? forwardPointer() : backwardPointer()
        break

      // down
      case 40:
        e.preventDefault()
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

        selectPointer()
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

        selectPointer()
        e.preventDefault()
        break
    }
  }

  return {
    handleKeydown,
  }
}