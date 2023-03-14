import { toRefs, onMounted, ref, computed } from 'vue'

export default function useA11y (props, context, dep)
{
  const {
    placeholder, id, valueProp, label: labelProp, mode, groupLabel, aria, searchable ,
  } = toRefs(props)

  // ============ DEPENDENCIES ============

  const pointer = dep.pointer
  const iv = dep.iv
  const hasSelected = dep.hasSelected
  const multipleLabelText = dep.multipleLabelText

  // ================ DATA ================

  const label = ref(null)

  // ============== COMPUTED ==============

  const ariaAssist = computed(() => {
    let texts = []

    if (id && id.value) {
      texts.push(id.value)
    }

    texts.push('assist')

    return texts.join('-')
  })

  const ariaControls = computed(() => {
    let texts = []

    if (id && id.value) {
      texts.push(id.value)
    }

    texts.push('multiselect-options')

    return texts.join('-')
  })

  const ariaActiveDescendant = computed(() => {
    let texts = []

    if (id && id.value) {
      texts.push(id.value)
    }

    if (pointer.value) {
      texts.push(pointer.value.group ? 'multiselect-group' : 'multiselect-option')

      texts.push(pointer.value.group ? pointer.value.index : pointer.value[valueProp.value])

      return texts.join('-')
    }
  })



  const ariaPlaceholder = computed(() => {
    return placeholder.value
  })

  const ariaMultiselectable = computed(() => {
    return mode.value !== 'single'
  })

  const ariaLabel = computed(() => {
    let ariaLabel = ''

    if (mode.value === 'single' && hasSelected.value) {
      ariaLabel += iv.value[labelProp.value]
    }

    if (mode.value === 'multiple' && hasSelected.value) {
      ariaLabel += multipleLabelText.value
    }

    if (mode.value === 'tags' && hasSelected.value) {
      ariaLabel += iv.value.map(v => v[labelProp.value]).join(', ')
    }

    return ariaLabel
  })

  const arias = computed(() => {
    let arias = { ...aria.value }
    
    // Need to add manually because focusing
    // the input won't read the selected value
    if (searchable.value) {
      arias['aria-labelledby'] = arias['aria-labelledby']
        ? `${ariaAssist.value} ${arias['aria-labelledby']}`
        : ariaAssist.value
      
      if (ariaLabel.value && arias['aria-label']) {
        arias['aria-label'] = `${ariaLabel.value}, ${arias['aria-label']}`
      }
    }

    return arias
  })

  // =============== METHODS ==============

  const ariaOptionId = (option) => {
    let texts = []

    if (id && id.value) {
      texts.push(id.value)
    }

    texts.push('multiselect-option')

    texts.push(option[valueProp.value])

    return texts.join('-')
  }

  const ariaGroupId = (option) => {
    let texts = []

    if (id && id.value) {
      texts.push(id.value)
    }

    texts.push('multiselect-group')

    texts.push(option.index)

    return texts.join('-')
  }

  const ariaOptionLabel = (label) => {
    let texts = []

    texts.push(label)

    return texts.join(' ')
  }

  const ariaGroupLabel = (label) => {
    let texts = []

    texts.push(label)

    return texts.join(' ')
  }

  const ariaTagLabel = (label) => {
    return `${label} ❎`
  }

  // =============== HOOKS ================

  onMounted(() => {
    /* istanbul ignore next */
    if (id && id.value && document && document.querySelector) {
      let forTag = document.querySelector(`[for="${id.value}"]`)
      label.value = forTag ? forTag.innerText : null
    }
  })

  return {
    arias,
    ariaLabel,
    ariaAssist,
    ariaControls,
    ariaPlaceholder,
    ariaMultiselectable,
    ariaActiveDescendant,
    ariaOptionId,
    ariaOptionLabel,
    ariaGroupId,
    ariaGroupLabel,
    ariaTagLabel,
  }
}