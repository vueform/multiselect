import { toRefs, nextTick } from 'composition-api'

export default function useKeyboard (props, context, dep)
{
  const { mode, addTagOn, createTag } = toRefs(props)

  // ============ DEPENDENCIES ============

  const iv = dep.iv
  const update = dep.update
  const closeDropdown = dep.closeDropdown
  const clearPointer = dep.clearPointer
  const search = dep.search
  const selectPointer = dep.selectPointer

  // =============== METHODS ==============

  const handleBackspace = (e) => {
    if (mode.value === 'single') {
      return
    }

    update([...iv.value].slice(0,-1))
  }

  const handleEsc = (e) => {
    closeDropdown()
    clearPointer()
    e.target.blur()
  }

  const handleSearchBackspace = (e) => {
    if (search.value !== '') {
      e.stopPropagation()
    }
  }

  const handleSearchInput = (e) => {
    search.value = e.target.value
  }

  const handleAddTag = (e) => {
    if (e.keyCode === 13 && (addTagOn.value.indexOf('enter') !== -1 || !createTag.value)) {
      selectPointer()
    }

    else if (e.keyCode === 32 && addTagOn.value.indexOf('space') !== -1 && createTag.value) {
      search.value = search.value.trim()

      nextTick(() => {
        selectPointer()
      })
    }
  }

  return {
    handleBackspace,
    handleEsc,
    handleSearchBackspace,
    handleSearchInput,
    handleAddTag,
  }
}