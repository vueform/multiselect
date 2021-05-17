import { ref, toRefs, computed, watch } from 'composition-api'
import normalize from './../utils/normalize'
import isObject from './../utils/isObject'
import isNullish from './../utils/isNullish'
import arraysEqual from './../utils/arraysEqual'

export default function useOptions (props, context, dep)
{
  const { 
    options, mode, trackBy, limit, hideSelected, createTag, label,
    appendNewTag, multipleLabel, object, loading, delay, resolveOnLoad,
    minChars, filterResults, clearOnSearch, clearOnSelect, valueProp,
    canDeselect, max
  } = toRefs(props)

  // ============ DEPENDENCIES ============

  const iv = dep.iv
  const ev = dep.ev
  const search = dep.search
  const blurSearch = dep.blurSearch
  const clearSearch = dep.clearSearch
  const update = dep.update
  const blurInput = dep.blurInput
  const pointer = dep.pointer

  // ================ DATA ================

  // no export
  // appendedOptions
  const ap = ref([])

  // no export
  // resolvedOptions
  const ro = ref([])

  const resolving = ref(false)

  // ============== COMPUTED ==============

  // no export
  // extendedOptions
  const eo = computed(() => {
    let eo = ro.value || []

    // Transforming an object to an array of objects
    if (isObject(eo)) {
      eo = Object.keys(eo).map((key) => {
        let val = eo[key]

        return { [valueProp.value]: key, [trackBy.value]: val, [label.value]: val}
      })
    }

    // Transforming an plain arrays to an array of objects
    eo = eo.map((val, key) => {
      return typeof val === 'object' ? val : { [valueProp.value]: val, [trackBy.value]: val, [label.value]: val}
    })

    if (ap.value.length) {
      eo = eo.concat(ap.value)
    }

    return eo
  })

  // filteredOptions
  const fo = computed(() => {
    let fo = eo.value

    if (createdTag.value.length) {
      fo = createdTag.value.concat(fo)
    }

    if (search.value && filterResults.value) {
      fo = fo.filter((option) => {
        return normalize(option[trackBy.value]).indexOf(normalize(search.value)) !== -1
      })
    }

    if (hideSelected.value) {
      fo = fo.filter((option) => !shouldHideOption(option))
    }

    if (limit.value > 0) {
      fo = fo.slice(0, limit.value)
    }

    return fo
  })

  const hasSelected = computed(() => {
    switch (mode.value) {
      case 'single':
        return !isNullish(iv.value[valueProp.value])

      case 'multiple':
      case 'tags':
        return !isNullish(iv.value) && iv.value.length > 0
    }
  })

  const multipleLabelText = computed(() => {
    return multipleLabel !== undefined && multipleLabel.value !== undefined
      ? multipleLabel.value(iv.value)
      : (iv.value && iv.value.length > 1 ? `${iv.value.length} options selected` : `1 option selected`)
  })

  const noOptions = computed(() => {
    return !eo.value.length && !resolving.value
  })

  const noResults = computed(() => {
    return eo.value.length > 0 && fo.value.length == 0 
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
        update((iv.value).concat(option))
        break
    }

    context.emit('select', finalValue(option), option)
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
        update(iv.value.filter((val) => val[valueProp.value] != option[valueProp.value]))
        break
    }

    context.emit('deselect', finalValue(option), option)
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
    context.emit('clear')
    update(nullValue.value)
  }

  const isSelected = (option) => {
    switch (mode.value) {
      case 'single':
        return !isNullish(iv.value) && iv.value[valueProp.value] == option[valueProp.value]

      case 'tags':
      case 'multiple':
        return !isNullish(iv.value) && iv.value.map(o => o[valueProp.value]).indexOf(option[valueProp.value]) !== -1
    }
  }

  const isDisabled = (option) => {
    return option.disabled === true
  }

  const isMax = () => {
    if (max === undefined || max.value === -1 || (!hasSelected.value && max.value > 0)) {
      return false
    }
    
    return iv.value.length >= max.value
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
    return eo.value[eo.value.map(o => String(o[valueProp.value])).indexOf(String(val))]
  }

  // no export
  const getOptionByTrackBy = (val) => {
    return eo.value.map(o => normalize(o[trackBy.value])).indexOf(normalize(val))
  }

  // no export
  const shouldHideOption = (option) => {
    return mode.value === 'tags' && hideSelected.value && isSelected(option)
  }

  // no export
  const appendOption = (option) => {
    ap.value.push(option)
  }

  // no export
  const initInternalValue = () => {
    if (!isNullish(ev.value)) {
      iv.value = makeInternal(ev.value)
    }
  }

  const resolveOptions = (callback) => {
    resolving.value = true

    options.value(search.value).then((response) => {
      ro.value = response

      if (typeof callback == 'function') {
        callback(response)
      }

      resolving.value = false
    })
  }

  // no export
  const refreshLabels = () => {
    if (!hasSelected.value) {
      return
    }

    if (mode.value === 'single') {
      let newLabel = getOption(iv.value[valueProp.value])[label.value]

      iv.value[label.value] = newLabel

      if (object.value) {
        ev.value[label.value] = newLabel
      }
    } else {
      iv.value.forEach((val, i) => {
        let newLabel = getOption(iv.value[i][valueProp.value])[label.value]

        iv.value[i][label.value] = newLabel

        if (object.value) {
          ev.value[i][label.value] = newLabel
        }
      })
    }
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

  if (mode.value !== 'single' && !isNullish(ev.value) && !Array.isArray(ev.value)) {
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
    ro.value = options.value

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
        ro.value = []
      }
      setTimeout(() => {
        if (query != search.value) {
          return
        }

        options.value(search.value).then((response) => {
          if (query == search.value) {
            ro.value = response
            pointer.value = fo.value.filter(o => o.disabled !== true)[0] || null
            resolving.value = false
          }
        })
      }, delay.value)

    }, { flush: 'sync' })
  }

  watch(ev, (newValue) => {
    if (isNullish(newValue)) {
      iv.value = makeInternal(newValue)
      return
    }

    switch (mode.value) {
      case 'single':
        if (object.value ? newValue[valueProp.value] != iv.value[valueProp.value] : newValue != iv.value[valueProp.value]) {
          iv.value = makeInternal(newValue)
        }
        break

      case 'multiple':
      case 'tags':
        if (!arraysEqual(object.value ? newValue.map(o => o[valueProp.value]) : newValue, iv.value.map(o => o[valueProp.value]))) {
          iv.value = makeInternal(newValue)
        }
        break
    }
  }, { deep: true })

  if (typeof props.options !== 'function') {
    watch(options, (n, o) => {
      ro.value = props.options

      if (!Object.keys(iv.value).length) {
        initInternalValue()
      }

      refreshLabels()
    })
  }

  return {
    fo,
    filteredOptions: fo,
    hasSelected,
    multipleLabelText,
    eo,
    extendedOptions: eo,
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