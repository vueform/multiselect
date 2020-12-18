import { ref, toRefs, computed, watch } from 'composition-api'
import normalize from './../utils/normalize'
import isObject from './../utils/isObject'

export default function useOptions (props, context, dependencies)
{
  const { options, mode, trackBy, limit, hideSelectedTag, createTag, label,
          appendNewTag, multipleLabel, object, loading, delay, resolveOnLoad,
          minChars, filterResults, clearOnSearch, clearOnSelect } = toRefs(props)

  // ============ DEPENDENCIES ============

  const internalValue = dependencies.internalValue
  const externalValue = dependencies.externalValue
  const search = dependencies.search
  const blurSearch = dependencies.blurSearch
  const clearSearch = dependencies.clearSearch
  const update = dependencies.update
  const blurInput = dependencies.blurInput

  // ================ DATA ================

  // no export
  const appendedOptions = ref([])

  // no export
  const resolvedOptions = ref([])

  // no export
  const resolving = ref(false)

  // ============== COMPUTED ==============

  // no export
  const extendedOptions = computed(() => {
    let extendedOptions = resolvedOptions.value || []

    // Transforming an object to an array of objects
    if (isObject(extendedOptions)) {
      extendedOptions = Object.keys(extendedOptions).map((key) => {
        let val = extendedOptions[key]

        return { value: key, [trackBy.value]: val, [label.value]: val}
      })
    }

    // Transforming an plain arrays to an array of objects
    extendedOptions = extendedOptions.map((val, key) => {
      return typeof val === 'object' ? val : { value: key, [trackBy.value]: val, [label.value]: val}
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

    if (hideSelectedTag.value) {
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
        return !isValueNull.value

      case 'multiple':
      case 'tags':
        return !isValueNull.value && internalValue.value.length > 0
    }
  })

  const multipleLabelText = computed(() => {
    return multipleLabel !== undefined && multipleLabel.value !== undefined
      ? multipleLabel.value(internalValue.value)
      : (internalValue.value && internalValue.value.length > 1 ? `${internalValue.value.length} options selected` : `1 option selected`)
  })

  const noOptions = computed(() => {
    return !extendedOptions.value.length
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
      [label.value]: search.value,
      [trackBy.value]: search.value,
      value: search.value,
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

  // no export
  const isValueNull = computed(() => {
    return [null, undefined, false].indexOf(internalValue.value) !== -1
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
        update((internalValue.value || []).concat(option))
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
        update(internalValue.value.filter((val) => val.value != option.value))
        break
    }

    context.emit('deselect', finalValue(option))
  }

  // no export
  const finalValue = (option) => {
    return object.value ? option : option.value
  }

  const remove = (option) => {
    deselect(option)
  }

  const clear = (option) => {
    update(nullValue.value)
  }

  const isSelected = (option) => {
    switch (mode.value) {
      case 'single':
        return !isValueNull.value && internalValue.value.value == option.value

      case 'tags':
      case 'multiple':
        return !isValueNull.value && internalValue.value.map(o => o.value).indexOf(option.value) !== -1
    }
  }

  const handleOptionClick = (option) => {
    switch (mode.value) {
      case 'single':
        if (isSelected(option)) {
          deselect(option)
          return
        }

        clear()
        select(option)
        blurSearch()
        blurInput()
        break

      case 'multiple':
        if (isSelected(option)) {
          deselect(option)
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

        if (getOption(option.value) === undefined && createTag.value) {
          context.emit('tag', option.value)

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
    return extendedOptions.value[extendedOptions.value.map(o => o.value).indexOf(val)]
  }

  // no export
  const getOptionByTrackBy = (val) => {
    return extendedOptions.value.map(o => normalize(o[trackBy.value])).indexOf(normalize(val))
  }

  // no export
  const shouldHideOption = (option) => {
    return mode.value === 'tags' && hideSelectedTag.value && isSelected(option)
  }

  // no export
  const appendOption = (option) => {
    appendedOptions.value.push(option)
  }

  // no export
  const resolveOptions = async () => {
    resolving.value = true
    resolvedOptions.value = await options.value(search.value)
    resolving.value = false
  }

  // no export
  const makeInternal = (val) => {
    if (object.value) {
      return val
    }

    // If external should be plain transform
    // value object to plain values
    return !Array.isArray(val) ? getOption(val) : val.map(v => getOption(v))
  }

  // ================ HOOKS ===============

  if (mode.value !== 'single' && [null, undefined, false].indexOf(externalValue.value) === -1 && !Array.isArray(externalValue.value)) {
    throw new Error(`v-model must be an array when using "${mode.value}" mode`)
  }

  if (options && typeof options.value == 'function') {
    if (resolveOnLoad.value) {
      resolveOptions()
    }
  }
  else {
    resolvedOptions.value = options && options.value ? options.value : []
  }

  if ([null, false, undefined].indexOf(externalValue.value) === -1) {
    internalValue.value = makeInternal(externalValue.value)
  } 
  
  // ============== WATCHERS ==============

  if (delay.value > -1) {
    watch(search, (query) => {
      if (query.length < minChars.value) {
        return
      }

      if (clearOnSearch.value) {
        resolvedOptions.value = []
      }
      setTimeout(async () => {
        if (query != search.value) {
          return
        }

        resolving.value = true

        let newOptions = await options.value(search.value)

        if (query == search.value) {
          resolvedOptions.value = newOptions
        }

        resolving.value = false
      }, delay.value)

    }, { flush: 'sync' })
  }

  return {
    filteredOptions,
    hasSelected,
    multipleLabelText,
    extendedOptions,
    noOptions,
    noResults,
    busy,
    select,
    deselect,
    remove,
    clear,
    isSelected,
    getOption,
    handleOptionClick,
  }
}