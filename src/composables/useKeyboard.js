import { toRefs } from 'composition-api'

export default function useKeyboard (props, context, dependencies)
{
  const { mode, addTagOn, createTag } = toRefs(props)

  // ============ DEPENDENCIES ============

  const internalValue = dependencies.internalValue
  const update = dependencies.update
  const closeDropdown = dependencies.closeDropdown
  const clearPointer = dependencies.clearPointer
  const search = dependencies.search
  const selectPointer = dependencies.selectPointer

  // =============== METHODS ==============

  const handleBackspace = (e) => {
    if (mode.value === 'single') {
      return
    }

    update([...internalValue.value].slice(0,-1))
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

  const handleAddTag = (e) => {
    if (e.keyCode === 13 && (addTagOn.value.indexOf('enter') !== -1 || !createTag.value)) {
      selectPointer()
    }

    else if (e.keyCode === 32 && addTagOn.value.indexOf('space') !== -1 && createTag.value) {
      selectPointer()
    }
  }

  return {
    handleBackspace,
    handleEsc,
    handleSearchBackspace,
    handleAddTag,
  }
}