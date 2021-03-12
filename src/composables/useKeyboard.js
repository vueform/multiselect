import { toRefs } from 'composition-api'
import filterObjectKeys from './../utils/filterObjectKeys'

export default function useKeyboard (props, context, dependencies)
{
  const { mode, addTagOn } = toRefs(props)

  const KEYCODES = {
    enter: 13,
    space: 32,
  }

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
    if (Object.values(filterObjectKeys(KEYCODES, addTagOn.value)).indexOf(e.keyCode) !== -1) {
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