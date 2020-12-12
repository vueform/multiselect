import { ref, toRefs, computed } from 'composition-api'
import normalize from './../utils/normalize'
import isObject from './../utils/isObject'

export default function useOptions (props, context, dependencies)
{
  const { options, mode, trackBy, limit, hideSelectedTag, createTag, label, appendNewTag, multipleLabel, object } = toRefs(props)

  // ============ DEPENDENCIES ============

  const value = dependencies.value
  const search = dependencies.search
  const blurSearch = dependencies.blurSearch
  const clearSearch = dependencies.clearSearch
  const update = dependencies.update
  const blurInput = dependencies.blurInput

  // ================ DATA ================

  // no export
  const appendedOptions = ref([])

  // ============== COMPUTED ==============

  // no export
  const extendedOptions = computed(() => {
    let extendedOptions = options === undefined || options.value === undefined  ? [] : options.value

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

    if (search.value) {
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

  const valueObject = computed(() => {
    if (isValueNull.value || value.value.length === 0 || object.value) {
      return value.value
    }

    return mode.value == 'single'
      ? getOption(value.value)
      : value.value.map((val) => getOption(val))
  })

  const hasSelected = computed(() => {
    switch (mode.value) {
      case 'single':
        return !isValueNull.value

      case 'multiple':
      case 'tags':
        return !isValueNull.value && value.value.length > 0
    }
  })

  const multipleLabelText = computed(() => {
    return multipleLabel !== undefined && multipleLabel.value !== undefined
      ? multipleLabel.value(value.value)
      : (value.value && value.value.length > 1 ? `${value.value.length} options selected` : `1 option selected`)
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
    return [null, undefined, false].indexOf(value.value) !== -1
  })

  // =============== METHODS ==============

  const select = (option) => {
    if (typeof option !== 'object') {
      option = getOption(option)
    }

    switch (mode.value) {
      case 'single':
        update(finalValue(option))
        break

      case 'multiple':
      case 'tags':
        update([...(value.value || [])].concat(finalValue(option)))
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
        update(value.value.filter((val) => (object.value && val.value != option.value) || (!object.value && val != option.value)))
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
        return !isValueNull.value && valueObject.value.value == option.value

      case 'tags':
      case 'multiple':
        return !isValueNull.value && valueObject.value.map(o => o.value).indexOf(option.value) !== -1
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
        clearSearch()
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

  return {
    filteredOptions,
    hasSelected,
    multipleLabelText,
    extendedOptions,
    noOptions,
    noResults,
    valueObject,
    select,
    deselect,
    remove,
    clear,
    isSelected,
    getOption,
    handleOptionClick,
  }
}