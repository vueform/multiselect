import { ref, toRefs, watch, nextTick } from 'composition-api'

export default function usePointer (props, context, dependencies)
{
  const { id } = toRefs(props)

  // ============ DEPENDENCIES ============

  const filteredOptions = dependencies.filteredOptions
  const handleOptionClick = dependencies.handleOptionClick
  const search = dependencies.search

  // ================ DATA ================

  const pointer = ref(null)

  // =============== METHODS ==============

  const isPointed = (option) => {
    return !!pointer.value && pointer.value.value == option.value
  }

  const setPointer = (option) => {
    pointer.value = option
  }

  const setPointerFirst = () => {
    pointer.value = filteredOptions.value[0] || null
  }

  const clearPointer = () => {
    pointer.value = null
  }

  const selectPointer = () => {
    if (!pointer.value) {
      return
    }

    handleOptionClick(pointer.value)

    clearPointer()
  }

  const forwardPointer = (option) => {
    if (pointer.value === null) {
      setPointer(filteredOptions.value[0])
    }
    else {
      let next = filteredOptions.value.map(o => o.value).indexOf(pointer.value.value) + 1

      if (filteredOptions.value.length <= next) {
        next = 0
      }

      setPointer(filteredOptions.value[next])
    }

    nextTick(() => {
      adjustWrapperScrollToPointer()
    })
  }

  const backwardPointer = () => {
    if (pointer.value === null) {
      setPointer(filteredOptions.value[filteredOptions.value.length - 1])
    }
    else {
      let prevIndex = filteredOptions.value.map(o => o.value).indexOf(pointer.value.value) - 1

      if (prevIndex < 0) {
        prevIndex = filteredOptions.value.length - 1
      }

      setPointer(filteredOptions.value[prevIndex])
    }

    nextTick(() => {
      adjustWrapperScrollToPointer()
    })
  }

  // no export
  /* istanbul ignore next */
  const adjustWrapperScrollToPointer = () => {
    let pointedOption = document.getElementById(id.value).querySelector(`.is-pointed`)

    if (!pointedOption) {
      return
    }

    let wrapper = pointedOption.parentElement

    if (pointedOption.offsetTop + pointedOption.offsetHeight > wrapper.clientHeight + wrapper.scrollTop) {
      wrapper.scrollTop = pointedOption.offsetTop + pointedOption.offsetHeight - wrapper.clientHeight
    }
    
    if (pointedOption.offsetTop < wrapper.scrollTop) {
      wrapper.scrollTop = pointedOption.offsetTop
    }
  }

  // ============== WATCHERS ==============

  watch(search, (val) => {
    setPointerFirst()
  })

  return {
    pointer,
    isPointed,
    setPointer,
    setPointerFirst,
    clearPointer,
    selectPointer,
    forwardPointer,
    backwardPointer,
  }
}