import { createSelect, destroy, keyup, keydown, findAll, getValue } from 'unit-test-helpers'
import { toBeVisible } from '@testing-library/jest-dom/matchers'
import { nextTick, ref } from 'vue'
import testSearch from './helpers/testSearch'

expect.extend({toBeVisible})

describe('I18n', () => {
  it('should render option labels, group labels and single label when options are not localized', () => {
    let select = createSelect({
      value: 'value-en',
      groups: true,
      options: [
        {
          label: 'group-en',
          options: ['value-en']
        }
      ],
      locale: 'en'
    })

    let groups = findAll(select, '.multiselect-group')
    let options = findAll(select, '.multiselect-option')
    let singleLabel = findAll(select, '.multiselect-single-label').at(0)

    expect(groups.at(0).html()).toContain('group-en')
    expect(options.at(0).html()).toContain('value-en')
    expect(singleLabel.html()).toContain('value-en')
  })

  it('should render options when options are localized with uppercase locales', async () => {
    let locale = ref('en')

    let select = createSelect({
      value: ['value'],
      groups: true,
      options: [{
        label: {
          EN: 'group-en',
          HU: 'group-hu',
        },
        options: [{
          label: {
            EN: 'label-en',
            HU: 'label-hu',
          },
          value: 'value'
        }]
      }],
      locale: locale
    })

    let groups = findAll(select, '.multiselect-group')
    let options = findAll(select, '.multiselect-option')
    let singleLabel = findAll(select, '.multiselect-single-label').at(0)

    expect(groups.at(0).html()).toContain('group-en')
    expect(options.at(0).html()).toContain('label-en')
    expect(singleLabel.html()).toContain('label-en')

    locale.value = 'hu'
    await nextTick()

    expect(groups.at(0).html()).toContain('group-hu')
    expect(options.at(0).html()).toContain('label-hu')
    expect(singleLabel.html()).toContain('label-hu')
  })

  it('should render options with fallback locale', async () => {
    let select = createSelect({
      value: ['value'],
      groups: true,
      options: [{
        label: {
          en: 'group-en',
          hu: 'group-hu',
        },
        options: [{
          label: {
            en: 'label-en',
            HU: 'label-hu',
          },
          value: 'value'
        }]
      }],
      fallbackLocale: 'hu'
    })

    let groups = findAll(select, '.multiselect-group')
    let options = findAll(select, '.multiselect-option')
    let singleLabel = findAll(select, '.multiselect-single-label').at(0)

    expect(groups.at(0).html()).toContain('group-hu')
    expect(options.at(0).html()).toContain('label-hu')
    expect(singleLabel.html()).toContain('label-hu')
  })

  it('should render empty string as option if it is an empty object', async () => {
    let select = createSelect({
      value: ['value'],
      groups: true,
      options: [{
        label: {
          en: 'group-en',
          hu: 'group-hu',
        },
        options: [{
          label: {},
          value: 'value'
        }]
      }],
      fallbackLocale: 'hu'
    })

    let options = findAll(select, '.multiselect-option')
    let singleLabel = findAll(select, '.multiselect-single-label').at(0)

    expect(options.at(0).html()).not.toContain('label-hu')
    expect(singleLabel.html()).not.toContain('label-hu')
  })

  it('should render options with en translation if locale is not preset', async () => {
    let select = createSelect({
      value: ['value'],
      groups: true,
      options: [{
        label: {
          en: 'group-en',
          hu: 'group-hu',
        },
        options: [{
          label: {
            en: 'label-en',
            hu: 'label-hu',
          },
          value: 'value'
        }]
      }],
    })

    let groups = findAll(select, '.multiselect-group')
    let options = findAll(select, '.multiselect-option')
    let singleLabel = findAll(select, '.multiselect-single-label').at(0)

    expect(groups.at(0).html()).toContain('group-en')
    expect(options.at(0).html()).toContain('label-en')
    expect(singleLabel.html()).toContain('label-en')
  })

  it('should render options with first translation if locale and en is not preset', async () => {
    let select = createSelect({
      value: ['value'],
      groups: true,
      options: [{
        label: {
          es: 'group-es',
          hu: 'group-hu',
        },
        options: [{
          label: {
            es: 'label-es',
            hu: 'label-hu',
          },
          value: 'value'
        }]
      }],
    })

    let groups = findAll(select, '.multiselect-group')
    let options = findAll(select, '.multiselect-option')
    let singleLabel = findAll(select, '.multiselect-single-label').at(0)

    expect(groups.at(0).html()).toContain('group-es')
    expect(options.at(0).html()).toContain('label-es')
    expect(singleLabel.html()).toContain('label-es')
  })

  it('should search in current locale when options are localized', async () => {
    let select = createSelect({
      value: ['value'],
      searchable: true,
      options: [{
        label: {
          en: 'value-en',
          hu: 'value-hu',
        },
        value: 'value'
      }],
      locale: 'hu'
    })

    select.vm.search = 'en'
    expect(select.vm.fo).toStrictEqual([])

    select.vm.search = 'hu'
    expect(select.vm.fo).toStrictEqual([{
      label: {
        en: 'value-en',
        hu: 'value-hu',
      },
      value: 'value'
    }])
  })

  it('should search in current locale when options are not localized', async () => {
    let select = createSelect({
      value: ['value'],
      searchable: true,
      options: [{
        label: 'value-hu',
        value: 'value'
      }],
      locale: 'hu'
    })

    select.vm.search = 'en'
    expect(select.vm.fo).toStrictEqual([])

    select.vm.search = 'hu'
    expect(select.vm.fo).toStrictEqual([{
      label: 'value-hu',
      value: 'value'
    }])
  })

  it('should add item when using locale', async () => {
    let select = createSelect({
      value: null,
      searchable: true,
      createOption: true,
      options: [
        {
          label: {
            en: 'en',
            hu: 'hu',
          }
        }
      ],
      locale: 'hu'
    })

    select.vm.search = 'en'

    await nextTick()

    expect(select.vm.pointer).toStrictEqual({
      label: 'en',
      value: 'en',
      __CREATE__: true,
    })

    expect(select.vm.fo[0]).toStrictEqual({
      label: 'en',
      value: 'en',
      __CREATE__: true,
    })

    select.vm.selectPointer()

    await nextTick()

    expect(getValue(select)).toBe('en')
  })

  it('should render localized multiple label', async () => {
    let locale = ref('en')

    let select = createSelect({
      value: [1,2],
      mode: 'multiple',
      options: [1,2,3],
      multipleLabel(value, select$) {
        return select$.locale === 'en' ? '2 selected' : 'xx'
      },
      locale: locale
    })

    let multipleLabel = findAll(select, '.multiselect-multiple-label').at(0)

    expect(multipleLabel.html()).toContain('2 selected')

    locale.value = 'hu'
    await nextTick()

    expect(multipleLabel.html()).toContain('xx')
  })

  it('should localize noOptions', async () => {
    let locale = ref('en')

    let select = createSelect({
      value: null,
      options: [],
      noOptionsText: {
        en: 'No options',
        de: 'Keine Optionen',
      },
      locale: locale
    })

    select.vm.open()

    let div = findAll(select, '.multiselect-no-options').at(0)

    expect(div.html()).toContain('No options')

    locale.value = 'de'
    await nextTick()

    expect(div.html()).toContain('Keine Optionen')
  })

  it('should localize noResults', async () => {
    let locale = ref('en')

    let select = createSelect({
      value: null,
      options: [1,2,3],
      searchable: true,
      noResultsText: {
        en: 'No options',
        de: 'Keine Optionen',
      },
      locale: locale
    })

    select.vm.open()

    select.vm.search = 'en'

    await nextTick()
    
    let div = findAll(select, '.multiselect-no-results').at(0)

    expect(div.html()).toContain('No options')

    locale.value = 'de'
    await nextTick()

    expect(div.html()).toContain('Keine Optionen')
  })
})