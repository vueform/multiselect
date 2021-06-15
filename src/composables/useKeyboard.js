import { toRefs, nextTick } from 'composition-api'

export default function useKeyboard (props, context, dep)
{
  const { mode, addTagOn, createTag, openDirection, searchable } = toRefs(props)

  // ============ DEPENDENCIES ============

  const iv = dep.iv
  const update = dep.update
  const closeDropdown = dep.closeDropdown
  const clearPointer = dep.clearPointer
  const search = dep.search
  const selectPointer = dep.selectPointer
  const backwardPointer = dep.backwardPointer
  const forwardPointer = dep.forwardPointer
  const blur = dep.blur

  // =============== METHODS ==============

  const handleKeydown = (e) => {
    // console.log(e)
    switch (e.keyCode) {
      // enter
      case 13:
        selectPointer()
        e.preventDefault()
        break

      // escape
      case 27:
        blur()
        break

      // space
      case 32:
        if (searchable.value) {
          return
        }

        selectPointer()
        e.preventDefault()
        break

      // up
      case 38:
        openDirection.value === 'top' ? forwardPointer() : backwardPointer()
        break

      // down
      case 40:
        openDirection.value === 'top' ? backwardPointer() : forwardPointer()
        break
    }
  }

  // const handleBackspace = (e) => {
  //   if (mode.value === 'single') {
  //     return
  //   }

  //   update([...iv.value].slice(0,-1))
  // }

  // const handleEsc = (e) => {
  //   closeDropdown()
  //   clearPointer()
  //   e.target.blur()
  // }

  // const handleSearchBackspace = (e) => {
  //   if (search.value !== '') {
  //     e.stopPropagation()
  //   }
  // }

  const handleSearchInput = (e) => {
    search.value = e.target.value
  }

  // const handleAddTag = (e) => {
  //   if (e.keyCode === 13 && (addTagOn.value.indexOf('enter') !== -1 || !createTag.value)) {
  //     selectPointer()
  //   }

  //   else if (e.keyCode === 32 && addTagOn.value.indexOf('space') !== -1 && createTag.value) {
  //     search.value = search.value.trim()

  //     nextTick(() => {
  //       selectPointer()
  //     })
  //   }
  // }

  return {
    handleKeydown,
    handleSearchInput,
  }
}