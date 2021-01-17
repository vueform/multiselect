import { toRefs, watch, nextTick, computed } from 'composition-api'

export default function usePointer (props, context, dependencies)
{
  const { id, valueProp } = toRefs(props)

  // ============ DEPENDENCIES ============

  const filteredOptions = dependencies.filteredOptions
  const handleOptionClick = dependencies.handleOptionClick
  const search = dependencies.search
  const pointer = dependencies.pointer

  // ============== COMPUTED ==============

  // no export
  const options = computed(() => {
    return filteredOptions.value.filter(o => o.disabled !== true)
  })

  // =============== METHODS ==============

  const isPointed = (option) => {
    return !!pointer.value && pointer.value[valueProp.value] == option[valueProp.value]
  }

  const setPointer = (option) => {
    pointer.value = option
  }

  const setPointerFirst = () => {
    pointer.value = options.value[0] || null
  }

  const clearPointer = () => {
    pointer.value = null
  }

  const selectPointer = () => {
    if (!pointer.value || pointer.value.disabled === true) {
      clearPointer()
      return
    }

    handleOptionClick(pointer.value)

    clearPointer()
  }

  const forwardPointer = () => {
    if (pointer.value === null) {
      setPointer(options.value[0] || null)
    }
    else {
      let next = options.value.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) + 1

      if (options.value.length <= next) {
        next = 0
      }

      setPointer(options.value[next] || null)
    }

    nextTick(() => {
      adjustWrapperScrollToPointer()
    })
  }

  const backwardPointer = () => {
    if (pointer.value === null) {
      setPointer(options.value[options.value.length - 1] || null)
    }
    else {
      let prevIndex = options.value.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) - 1

      if (prevIndex < 0) {
        prevIndex = options.value.length - 1
      }

      setPointer(options.value[prevIndex] || null)
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