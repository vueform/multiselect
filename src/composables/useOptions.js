import { ref, toRefs, computed, watch } from 'composition-api'
import normalize from './../utils/normalize'
import isObject from './../utils/isObject'
import isNullish from './../utils/isNullish'
import arraysEqual from './../utils/arraysEqual'
import arrayObjectsEqual from './../utils/arrayObjectsEqual'

export default function useOptions (props, context, dependencies)
{
  const { 
    options, mode, trackBy, limit, hideSelected, createTag, label,
    appendNewTag, multipleLabel, object, loading, delay, resolveOnLoad,
    minChars, filterResults, clearOnSearch, clearOnSelect, valueProp,
    canDeselect, max
  } = toRefs(props)

  // ============ DEPENDENCIES ============

  const internalValue = dependencies.internalValue
  const externalValue = dependencies.externalValue
  const currentValue = dependencies.currentValue
  const search = dependencies.search
  const blurSearch = dependencies.blurSearch
  const clearSearch = dependencies.clearSearch
  const update = dependencies.update
  const blurInput = dependencies.blurInput
  const pointer = dependencies.pointer

  // ================ DATA ================

  // no export
  const appendedOptions = ref([])

  // no export
  const resolvedOptions = ref([])

  const resolving = ref(false)

  // ============== COMPUTED ==============

  // no export
  const extendedOptions = computed(() => {
    let extendedOptions = resolvedOptions.value || []

    // Transforming an object to an array of objects
    if (isObject(extendedOptions)) {
      extendedOptions = Object.keys(extendedOptions).map((key) => {
        let val = extendedOptions[key]

        return { [valueProp.value]: key, [trackBy.value]: val, [label.value]: val}
      })
    }

    // Transforming an plain arrays to an array of objects
    extendedOptions = extendedOptions.map((val, key) => {
      return typeof val === 'object' ? val : { [valueProp.value]: key, [trackBy.value]: val, [label.value]: val}
    })

    if (appendedOptions.value.length) {
      extendedOptions = extendedOptions.concat(appendedOptions.value)
    }

    return extendedOptions
  })

  const filteredOptions = computed(() => {
    let filteredOptions = extendedOptions.value

    if (createdTag.value.length) {
      filteredOptions = createdTag.value.concat(filteredOptions)
    }

    if (search.value && filterResults.value) {
      filteredOptions = filteredOptions.filter((option) => {
        return normalize(option[trackBy.value]).indexOf(normalize(search.value)) !== -1
      })
    }

    if (hideSelected.value) {
      filteredOptions = filteredOptions.filter((option) => !shouldHideOption(option))
    }

    if (limit.value > 0) {
      filteredOptions = filteredOptions.slice(0, limit.value)
    }

    return filteredOptions
  })

  const hasSelected = computed(() => {
    switch (mode.value) {
      case 'single':
        return !isNullish(internalValue.value[valueProp.value])

      case 'multiple':
      case 'tags':
        return !isNullish(internalValue.value) && internalValue.value.length > 0
    }
  })

  const multipleLabelText = computed(() => {
    return multipleLabel !== undefined && multipleLabel.value !== undefined
      ? multipleLabel.value(internalValue.value)
      : (internalValue.value && internalValue.value.length > 1 ? `${internalValue.value.length} options selected` : `1 option selected`)
  })

  const noOptions = computed(() => {
    return !extendedOptions.value.length && !resolving.value
  })

  const noResults = computed(() => {
    return extendedOptions.value.length > 0 && filteredOptions.value.length == 0 
  })

  // no export
  const createdTag = computed(() => {
    if (createTag.value === false || !search.value) {
      return []
    }

    return getOptionByTrackBy(search.value) !== -1 ? [] : [{
      [valueProp.value]: search.value,
      [label.value]: search.value,
      [trackBy.value]: search.value,
    }]
  })

  // no export
  const nullValue = computed(() => {
    switch (mode.value) {
      case 'single':
        return null

      case 'multiple':
      case 'tags':
        return []
    }
  })

  const busy = computed(() => {
    return loading.value || resolving.value
  })

  // =============== METHODS ==============

  const select = (option) => {
    if (typeof option !== 'object') {
      option = getOption(option)
    }

    switch (mode.value) {
      case 'single':
        update(option)
        break

      case 'multiple':
      case 'tags':
        update((internalValue.value).concat(option))
        break
    }

    context.emit('select', finalValue(option))
  }

  const deselect = (option) => {
    if (typeof option !== 'object') {
      option = getOption(option)
    }

    switch (mode.value) {
      case 'single':
        clear()
        break

      case 'tags':
      case 'multiple':
        update(internalValue.value.filter((val) => val[valueProp.value] != option[valueProp.value]))
        break
    }

    context.emit('deselect', finalValue(option))
  }

  // no export
  const finalValue = (option) => {
    return object.value ? option : option[valueProp.value]
  }

  const remove = (option) => {
    deselect(option)
  }

  const handleTagRemove = (option, e) => {
    if (e.button !== 0) {
      e.preventDefault()
      return
    }

    remove(option)
  }

  const clear = () => {
    update(nullValue.value)
  }

  const isSelected = (option) => {
    switch (mode.value) {
      case 'single':
        return !isNullish(internalValue.value) && internalValue.value[valueProp.value] == option[valueProp.value]

      case 'tags':
      case 'multiple':
        return !isNullish(internalValue.value) && internalValue.value.map(o => o[valueProp.value]).indexOf(option[valueProp.value]) !== -1
    }
  }

  const isDisabled = (option) => {
    return option.disabled === true
  }

  const isMax = () => {
    if (max === undefined || max.value === -1 || (!hasSelected.value && max.value > 0)) {
      return false
    }
    
    return internalValue.value.length >= max.value
  }

  const handleOptionClick = (option) => {
    if (isDisabled(option)) {
      return
    }

    switch (mode.value) {
      case 'single':
        if (isSelected(option)) {
          if (canDeselect.value) {
            deselect(option)
          }
          return
        }

        select(option)
        blurSearch()
        blurInput()
        break

      case 'multiple':
        if (isSelected(option)) {
          deselect(option)
          return
        }

        if (isMax()) {
          return
        }

        select(option)

        if (clearOnSelect.value) {
          clearSearch()
        }
        break

      case 'tags':
        if (isSelected(option)) {
          deselect(option)
          return
        }

        if (isMax()) {
          return
        }

        if (getOption(option[valueProp.value]) === undefined && createTag.value) {
          context.emit('tag', option[valueProp.value])

          if (appendNewTag.value) {
            appendOption(option)
          }

          clearSearch()
        }

        if (clearOnSelect.value) {
          clearSearch()
        }

        select(option)
        break
    }
  }

  const getOption = (val) => {
    return extendedOptions.value[extendedOptions.value.map(o => String(o[valueProp.value])).indexOf(String(val))]
  }

  // no export
  const getOptionByTrackBy = (val) => {
    return extendedOptions.value.map(o => normalize(o[trackBy.value])).indexOf(normalize(val))
  }

  // no export
  const shouldHideOption = (option) => {
    return mode.value === 'tags' && hideSelected.value && isSelected(option)
  }

  // no export
  const appendOption = (option) => {
    appendedOptions.value.push(option)
  }

  // no export
  const initInternalValue = () => {
    if (!isNullish(externalValue.value)) {
      internalValue.value = makeInternal(externalValue.value)
    }
  }

  const resolveOptions = (callback) => {
    resolving.value = true

    options.value(search.value).then((response) => {
      resolvedOptions.value = response

      if (typeof callback == 'function') {
        callback(response)
      }

      resolving.value = false
    })
  }

  const refreshOptions = (callback) => {
    resolveOptions(callback)
  }

  // no export
  const makeInternal = (val) => {
    if (isNullish(val)) {
      return mode.value === 'single' ? {} : []
    }

    if (object.value) {
      return val
    }

    // If external should be plain transform
    // value object to plain values
    return mode.value === 'single' ? getOption(val) || {} : val.filter(v => !! getOption(v)).map(v => getOption(v))
  }

  // ================ HOOKS ===============

  if (mode.value !== 'single' && !isNullish(externalValue.value) && !Array.isArray(externalValue.value)) {
    throw new Error(`v-model must be an array when using "${mode.value}" mode`)
  }

  if (options && typeof options.value == 'function') {
    if (resolveOnLoad.value) {
      resolveOptions(initInternalValue)
    } else if (object.value == true) {
      initInternalValue()
    }
  }
  else {
    resolvedOptions.value = options && options.value ? options.value : []

    initInternalValue()
  }
  
  // ============== WATCHERS ==============

  if (delay.value > -1) {
    watch(search, (query) => {
      if (query.length < minChars.value) {
        return
      }

      resolving.value = true

      if (clearOnSearch.value) {
        resolvedOptions.value = []
      }
      setTimeout(() => {
        if (query != search.value) {
          return
        }

        options.value(search.value).then((response) => {
          if (query == search.value) {
            resolvedOptions.value = response
            pointer.value = filteredOptions.value.filter(o => o.disabled !== true)[0] || null
            resolving.value = false
          }
        })
      }, delay.value)

    }, { flush: 'sync' })
  }

  watch(externalValue, (newValue) => {
    if (isNullish(newValue)) {
      internalValue.value = makeInternal(newValue)
      return
    }

    switch (mode.value) {
      case 'single':
        if (object.value ? newValue[valueProp.value] != internalValue.value[valueProp.value] : newValue != internalValue.value[valueProp.value]) {
          internalValue.value = makeInternal(newValue)
        }
        break

      case 'multiple':
      case 'tags':
        if (!arraysEqual(object.value ? newValue.map(o => o[valueProp.value]) : newValue, internalValue.value.map(o => o[valueProp.value]))) {
          internalValue.value = makeInternal(newValue)
        }
        break
    }
  }, { deep: true })

  watch(() => props.options, (n) => {
    if (typeof props.options !== 'function') {
      resolvedOptions.value = props.options
    }
  }, { flush: 'sync' })

  watch(extendedOptions, (n, o) => {
    if (!Object.keys(internalValue.value).length) {
      initInternalValue()
    }
    
    if (!n.length || !currentValue.value || !currentValue.value.length) {
      return
    }

    let newValue

    if (mode.value === 'single') {
      newValue = n[n.map(v=>v[valueProp.value]).indexOf(currentValue.value)]

      if (JSON.stringify(newValue) === JSON.stringify(internalValue.value)) {
        return
      }
    } else {
      newValue = []

      currentValue.value.forEach((val) => {
        newValue.push(n[n.map(v=>v[valueProp.value]).indexOf(val)])
      })

      if (arrayObjectsEqual(newValue, internalValue.value)) {
        return
      }
    }

    // Update both internal and external value if user is using object values
    if (object.value) {
      update(newValue)

    // Only update internal value if external is only valueProp
    } else {
      internalValue.value = newValue
    }
  }, { flush: 'sync', deep: true, immediate: false })

  return {
    filteredOptions,
    hasSelected,
    multipleLabelText,
    extendedOptions,
    noOptions,
    noResults,
    resolving,
    busy,
    select,
    deselect,
    remove,
    clear,
    isSelected,
    isDisabled,
    isMax,
    getOption,
    handleOptionClick,
    handleTagRemove,
    refreshOptions,
    resolveOptions,
  }
}