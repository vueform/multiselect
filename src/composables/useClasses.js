import { computed, toRefs } from 'composition-api'

export default function useStyle (props, context, dependencies)
{
  const { mode, searchable, disabled, caret, openDirection } = toRefs(props)

  // ============ DEPENDENCIES ============

  const isOpen = dependencies.isOpen
  const isPointed = dependencies.isPointed
  const isSelected = dependencies.isSelected
  const isDisabled = dependencies.isDisabled

  // ============== COMPUTED ==============

  const classList = computed(() => {
    return {
      container: ['multiselect', `is-${mode.value}`, {
        'is-open': isOpen.value,
        'is-searchable': searchable.value,
        'is-disabled': disabled.value,
        'no-caret': !caret.value,
        'open-top': openDirection.value === 'top',
      }],
      option: (o) => {
        return ['multiselect-option', {
          'is-pointed': isPointed(o),
          'is-selected': isSelected(o),
          'is-disabled': isDisabled(o),
        }]
      },
    }
  })

  return {
    classList,
  }
}