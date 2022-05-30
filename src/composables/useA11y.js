import { toRefs, onMounted, ref, computed } from 'vue'

export default function useScroll (props, context, dep)
{
  const { placeholder, id, valueProp, label: labelProp, mode, groupLabel } = toRefs(props)

  // ============ DEPENDENCIES ============

  const pointer = dep.pointer
  const iv = dep.iv
  const isSelected = dep.isSelected
  const hasSelected = dep.hasSelected
  const multipleLabelText = dep.multipleLabelText

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

    texts.push('multiselect-option')

    if (pointer.value && pointer.value[valueProp.value] !== undefined) {
      texts.push(pointer.value[valueProp.value])

      return texts.join('-')
    }
  })

  const ariaLabel = computed(() => {
    let texts = []

    /* istanbul ignore next */
    if (label.value) {
      texts.push(label.value)
    }

    if (placeholder.value && !hasSelected.value) {
      texts.push(placeholder.value)
    }

    if (mode.value === 'single' && iv.value && iv.value[labelProp.value] !== undefined) {
      texts.push(iv.value[labelProp.value])
    }

    if (mode.value === 'multiple' && hasSelected.value) {
      texts.push(multipleLabelText.value)
    }

    if (mode.value === 'tags' && hasSelected.value) {
      texts.push(...iv.value.map(v => v[labelProp.value]))
    }

    return texts.join(', ')
  })

  const ariaPlaceholder = computed(() => {
    return ariaLabel.value
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

  const ariaOptionLabel = (option) => {
    let texts = []

    if (isSelected(option)) {
      texts.push('✓')
    }

    texts.push(option[labelProp.value])

    return texts.join(' ')
  }

  const ariaGroupLabel = (group) => {
    let texts = []

    texts.push(group[groupLabel.value])

    return texts.join(' ')
  }

  // =============== HOOKS ================

  onMounted(() => {
    if (id && id.value) {
      label.value = document.querySelector(`[for="${id.value}"]`)?.innerText || null
    }
  })

  return {
    ariaOwns,
    ariaLabel,
    ariaPlaceholder,
    ariaActiveDescendant,
    ariaOptionId,
    ariaOptionLabel,
    ariaGroupLabel,
  }
}