import { toRefs, watch, nextTick, computed } from 'composition-api'

export default function usePointer (props, context, dep)
{
  const { id, valueProp, showOptions, searchable } = toRefs(props)

  // ============ DEPENDENCIES ============

  const fo = dep.fo
  const handleOptionClick = dep.handleOptionClick
  const search = dep.search
  const pointer = dep.pointer
  const multiselect = dep.multiselect

  // ============== COMPUTED ==============

  // no export
  const options = computed(() => {
    return fo.value.filter(o => o.disabled !== true)
  })

  // =============== METHODS ==============

  const isPointed = (option) => {
    return !!pointer.value && pointer.value[valueProp.value] == option[valueProp.value]
  }

  const setPointer = (option) => {
    if (!showOptions.value) {
      return
    }

    pointer.value = option
  }

  const setPointerFirst = () => {
    setPointer(options.value[0] || null)
  }

  const clearPointer = () => {
    setPointer(null)
  }

  const selectPointer = () => {
    if (!pointer.value || pointer.value.disabled === true) {
      return
    }

    handleOptionClick(pointer.value)
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
    let pointedOption = multiselect.value.querySelector(`[data-pointed]`)

    if (!pointedOption) {
      return
    }

    let wrapper = pointedOption.parentElement.parentElement

    if (pointedOption.offsetTop + pointedOption.offsetHeight > wrapper.clientHeight + wrapper.scrollTop) {
      wrapper.scrollTop = pointedOption.offsetTop + pointedOption.offsetHeight - wrapper.clientHeight
    }
    
    if (pointedOption.offsetTop < wrapper.scrollTop) {
      wrapper.scrollTop = pointedOption.offsetTop
    }
  }

  // ============== WATCHERS ==============

  watch(search, (val) => {
    if (searchable.value) {
      if (val.length) {
        setPointerFirst()
      } else {
        clearPointer()
      }
    }
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