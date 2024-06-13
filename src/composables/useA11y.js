import { toRefs, onMounted, ref, computed } from 'vue'
import toRef from './../utils/toRef'

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

  const ariaAssist = toRef(() => (
    `${id.value ? id.value + '-' : ''}assist`
  ))

  const ariaControls = toRef(() => (
    `${id.value ? id.value + '-' : ''}multiselect-options`
  ))

  const ariaActiveDescendant = toRef(() => {
    if (pointer.value) {
      let texts = id.value
        ? `${id.value}-`
        : '';

      texts += `${pointer.value.group ? 'multiselect-group' : 'multiselect-option'}-`

      texts += pointer.value.group ? pointer.value.index : pointer.value[valueProp.value]

      return texts
    }
  })

  const ariaPlaceholder = toRef(() => {
    return placeholder.value
  })

  const ariaMultiselectable = toRef(() => {
    return mode.value !== 'single'
  })

  const ariaLabel = computed(() => {
    if (mode.value === 'single' && hasSelected.value) {
      return iv.value[labelProp.value]
    }

    if (mode.value === 'multiple' && hasSelected.value) {
      return multipleLabelText.value
    }

    if (mode.value === 'tags' && hasSelected.value) {
      return iv.value.map(v => v[labelProp.value]).join(', ')
    }

    return ''
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

  const ariaOptionId = (option) => (
    `${id.value ? id.value + '-' : ''}multiselect-option-${option[valueProp.value]}`
  )

  const ariaGroupId = (option) => (
    `${id.value ? id.value + '-' : ''}multiselect-group-${option.index}`
  )

  const ariaOptionLabel = (label) => `${label}`

  const ariaGroupLabel = (label) => `${label}`

  const ariaTagLabel = (label) => `${label} ❎`

  // =============== HOOKS ================

  onMounted(() => {
    /* istanbul ignore next */
    if (id.value && document && document.querySelector) {
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