import { toRefs, watch, nextTick, computed } from 'vue'

export default function usePointer (props, context, dep)
{
  const {
    valueProp, showOptions, searchable, groupLabel,
    groups: groupped, mode, groupSelect, disabledProp,
  } = toRefs(props)

  // ============ DEPENDENCIES ============

  const fo = dep.fo
  const fg = dep.fg
  const handleOptionClick = dep.handleOptionClick
  const handleGroupClick = dep.handleGroupClick
  const search = dep.search
  const pointer = dep.pointer
  const setPointer = dep.setPointer
  const clearPointer = dep.clearPointer
  const multiselect = dep.multiselect
  const isOpen = dep.isOpen

  // ============== COMPUTED ==============

  // no export
  const options = computed(() => {
    return fo.value.filter(o => !o[disabledProp.value])
  })

  const groups = computed(() => {
    return fg.value.filter(o => !o[disabledProp.value])
  })

  const canPointGroups = computed(() => {
    return mode.value !== 'single' && groupSelect.value
  })

  const isPointerGroup = computed(() => {
    return pointer.value && pointer.value.group
  })

  const currentGroupIndex = computed(() => {
    return getParentGroupIndex(pointer.value)
  })

  const currentGroup = computed(() => {
    return groups.value[currentGroupIndex.value]
  })

  const prevGroupIndex = computed(() => {
    let group = isPointerGroup.value ? pointer.value : /* istanbul ignore next */ getParentGroup(pointer.value)
    let groupIndex = groups.value.map(g => g[groupLabel.value]).indexOf(group[groupLabel.value])
    let prevGroupIndex = groupIndex - 1

    let prevGroup = groups.value[prevGroupIndex]

    if (prevGroup === undefined) {
      prevGroupIndex = lastGroupIndex.value
    }

    return prevGroupIndex
  })

  const prevGroup = computed(() => {
    return groups.value[prevGroupIndex.value]
  })
  
  const nextGroupIndex = computed(() => {
    let nextIndex = groups.value.map(g => g.label).indexOf(isPointerGroup.value
      ? pointer.value[groupLabel.value]
      : getParentGroup(pointer.value)[groupLabel.value]) + 1

    if (groups.value.length <= nextIndex) {
      nextIndex = 0
    }

    return nextIndex
  })
  
  const nextGroup = computed(() => {
    return groups.value[nextGroupIndex.value]
  })

  const lastGroupIndex = computed(() => {
    return groups.value.length - 1
  })

  const lastGroup = computed(() => {
    return groups.value[lastGroupIndex.value]
  })
  
  const currentGroupFirstEnabledOption = computed(() => {
    return pointer.value.__VISIBLE__.filter(o => !o[disabledProp.value])[0]
  })

  const currentGroupPrevEnabledOption = computed(() => {
    const options = currentGroup.value.__VISIBLE__.filter(o => !o[disabledProp.value])
    return options[options.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) - 1]
  })
  
  const currentGroupNextEnabledOption = computed(() => {
    const options = getParentGroup(pointer.value).__VISIBLE__.filter(o => !o[disabledProp.value])
    return options[options.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) + 1]
  })

  const prevGroupLastEnabledOption = computed(() => {
    return [...prevGroup.value.__VISIBLE__.filter(o => !o[disabledProp.value])].slice(-1)[0]
  })

  const lastGroupLastEnabledOption = computed(() => {
    return [...lastGroup.value.__VISIBLE__.filter(o => !o[disabledProp.value])].slice(-1)[0]
  })

  // =============== METHODS ==============

  const isPointed = (option) => {
    return (!!pointer.value && (
      (!option.group && pointer.value[valueProp.value] == option[valueProp.value]) ||
      (option.group !== undefined && pointer.value[groupLabel.value] == option[groupLabel.value])
    )) ? true : undefined
  }

  const setPointerFirst = () => {
    setPointer(options.value[0] || null)
  }

  const selectPointer = () => {
    if (!pointer.value || pointer.value[disabledProp.value] === true) {
      return
    }

    if (isPointerGroup.value) {
      handleGroupClick(pointer.value)
    } else {
      handleOptionClick(pointer.value)
    }
  }

  const forwardPointer = () => {
    if (pointer.value === null) {
      setPointer((groupped.value && canPointGroups.value ? groups.value[0] : options.value[0]) || null, 0)
    }
    else if (groupped.value && canPointGroups.value) {
      let nextPointer = isPointerGroup.value ? currentGroupFirstEnabledOption.value : currentGroupNextEnabledOption.value
      let nGroupIndex = null

      if (nextPointer === undefined) {
        nextPointer = nextGroup.value
        nGroupIndex = nextGroupIndex.value
      }

      setPointer(nextPointer || /* istanbul ignore next */ null, nGroupIndex)
    } else {
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
      let prevPointer = options.value[options.value.length - 1]
      let pGroupIndex = null

      if (groupped.value && canPointGroups.value) {
        prevPointer = lastGroupLastEnabledOption.value

        if (prevPointer === undefined) {
          prevPointer = groups.value[lastGroupIndex.value]
          pGroupIndex = lastGroupIndex.value
        }
      }

      setPointer(prevPointer  || null, pGroupIndex)
    }
    else if (groupped.value && canPointGroups.value) {
      let prevPointer = isPointerGroup.value ? prevGroupLastEnabledOption.value : currentGroupPrevEnabledOption.value
      let pGroupIndex = null

      if (prevPointer === undefined) {
        prevPointer = isPointerGroup.value ? prevGroup.value : currentGroup.value
        pGroupIndex = isPointerGroup.value ? prevGroupIndex.value : currentGroupIndex.value
      }

      setPointer(prevPointer || /* istanbul ignore next */ null, pGroupIndex)
    } else {
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

  const getParentGroup = (option) => {
    return groups.value.find((group) => {
      return group.__VISIBLE__.map(o => o[valueProp.value]).indexOf(option[valueProp.value]) !== -1
    })
  }

  const getParentGroupIndex = (option) => {
    return groups.value.findIndex((group) => {
      return group.__VISIBLE__.map(o => o[valueProp.value]).indexOf(option[valueProp.value]) !== -1
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

    if (groupped.value) {
      wrapper = isPointerGroup.value
        ? pointedOption.parentElement.parentElement.parentElement
        : pointedOption.parentElement.parentElement.parentElement.parentElement
    }

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
      if (val.length && showOptions.value) {
        setPointerFirst()
      } else {
        clearPointer()
      }
    }
  })

  watch(isOpen, (val) => {
    if (val) {
      let firstSelected = multiselect.value.querySelectorAll(`[data-selected]`)[0]

      if (!firstSelected) {
        return
      }

      let wrapper = firstSelected.parentElement.parentElement
      
      nextTick(() => {
        /* istanbul ignore next */
        if (wrapper.scrollTop > 0) {
          return
        }

        wrapper.scrollTop = firstSelected.offsetTop
      })
    }
  })

  return {
    pointer,
    canPointGroups,
    isPointed,
    setPointerFirst,
    selectPointer,
    forwardPointer,
    backwardPointer,
  }
}