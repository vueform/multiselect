import { computed, toRefs } from 'composition-api'

export default function useClasses (props, context, dependencies)
{
  const refs = toRefs(props)
  const { disabled, openDirection, showOptions } = refs

  // ============ DEPENDENCIES ============

  const isOpen = dependencies.isOpen
  const isPointed = dependencies.isPointed
  const isSelected = dependencies.isSelected
  const isDisabled = dependencies.isDisabled
  const isActive = dependencies.isActive

  const classes = {
    container: 'multiselect',
    containerDisabled: 'is-disabled',
    containerOpen: 'is-open',
    containerOpenTop: 'is-open-top',
    containerActive: 'is-active',
    singleLabel: 'multiselect-single-label',
    multipleLabel: 'multiselect-multiple-label',
    search: 'multiselect-search',
    tags: 'multiselect-tags',
    tag: 'multiselect-tag',
    tagDisabled: 'is-disabled',
    tagRemove: 'multiselect-tag-remove',
    tagRemoveIcon: 'multiselect-tag-remove-icon',
    tagsSearch: 'multiselect-tags-search',
    placeholder: 'multiselect-placeholder',
    caret: 'multiselect-caret',
    caretOpen: 'is-open',
    clear: 'multiselect-clear',
    clearIcon: 'multiselect-clear-icon',
    spinner: 'multiselect-spinner',
    dropdown: 'multiselect-dropdown',
    dropdownTop: 'is-top',
    options: 'multiselect-options',
    optionsTop: 'is-top',
    option: 'multiselect-option',
    optionPointed: 'is-pointed',
    optionSelected: 'is-selected',
    optionDisabled: 'is-disabled',
    optionSelectedPointed: 'is-selected is-pointed',
    optionSelectedDisabled: 'is-selected is-disabled',
    noOptions: 'multiselect-no-options',
    noResults: 'multiselect-no-results',
    fakeInput: 'multiselect-fake-input',
    spacer: 'multiselect-spacer',
    ...refs.classes.value,
  }

  // ============== COMPUTED ==============

  const classList = computed(() => {
    return {
      container: [classes.container]
        .concat(disabled.value ? classes.containerDisabled : [])
        .concat(isOpen.value && openDirection.value === 'top' && showOptions.value ? classes.containerOpenTop : [])
        .concat(isOpen.value && openDirection.value !== 'top' && showOptions.value ? classes.containerOpen : [])
        .concat(isActive.value ? classes.containerActive : []),
      spacer: classes.spacer,
      singleLabel: classes.singleLabel,
      multipleLabel: classes.multipleLabel,
      search: classes.search,
      tags: classes.tags,
      tag: [classes.tag]
        .concat(disabled.value ? classes.tagDisabled : []),
      tagRemove: classes.tagRemove,
      tagRemoveIcon: classes.tagRemoveIcon,
      tagsSearch: classes.tagsSearch,
      placeholder: classes.placeholder,
      caret: [classes.caret]
        .concat(isOpen.value ? classes.caretOpen : []),
      clear: classes.clear,
      clearIcon: classes.clearIcon,
      spinner: classes.spinner,
      dropdown: [classes.dropdown]
        .concat(openDirection.value === 'top' ? classes.dropdownTop : []),
      options: [classes.options]
        .concat(openDirection.value === 'top' ? classes.optionsTop : []),
      option: (o) => {
        let option = [classes.option]

        if (isPointed(o)) {
          option.push(isSelected(o) ? classes.optionSelectedPointed : classes.optionPointed)
        } else if (isSelected(o)) {
          option.push(isDisabled(o) ? classes.optionSelectedDisabled : classes.optionSelected)
        } else if (isDisabled(o)) {
          option.push(classes.optionDisabled)
        }

        return option
      },
      noOptions: classes.noOptions,
      noResults: classes.noResults,
      fakeInput: classes.fakeInput,
    }
  })

  return {
    classList,
  }
}