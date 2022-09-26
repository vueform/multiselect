import { toRefs, onMounted, ref, computed } from 'vue'

export default function useScroll (props, context, dep)
{
  const { placeholder, id, valueProp, label: labelProp, mode, groupLabel } = toRefs(props)

  // ============ DEPENDENCIES ============

  const pointer = dep.pointer
  const iv = dep.iv
  const hasSelected = dep.hasSelected
  const multipleLabelText = dep.multipleLabelText
  const isOpen = dep.isOpen

  // ================ DATA ================

  const label = ref(null)

  // ============== COMPUTED ==============

  const ariaOwns = computed(() => {
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

  const ariaOptionLabel = (option) => {
    let texts = []

    texts.push(option[labelProp.value])

    return texts.join(' ')
  }

  const ariaGroupLabel = (group) => {
    let texts = []

    texts.push(group[groupLabel.value])

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
    ariaOwns,
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