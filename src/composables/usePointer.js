import { ref, toRefs } from 'vue'

export default function usePointer (props, context, dep)
{
  const { groupSelect, mode, groups, disabledProp } = toRefs(props)

  // ================ DATA ================

  const pointer = ref(null)

  // =============== METHODS ==============

  const setPointer = (option, groupIndex = null) => {
    if (option === undefined || (option !== null && option[disabledProp.value])) {
      return
    }

    if (groups.value && option && option.group && (mode.value === 'single' || !groupSelect.value)) {
      return
    }

    let p = option ? {
      ...option
    } : option

    if (p && p.group) {
      p.index = groupIndex
    }

    pointer.value = p
  }

  const clearPointer = () => {
    setPointer(null)
  }

  return {
    pointer,
    setPointer,
    clearPointer,
  }
}