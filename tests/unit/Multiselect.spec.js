import { createSelect, destroy, keyup, keydown, findAll, getValue } from 'unit-test-helpers'
import { toBeVisible } from '@testing-library/jest-dom/matchers'
import { nextTick } from 'vue'
import testSearch from './helpers/testSearch'

expect.extend({toBeVisible})

describe('Multiselect', () => {
  describe('General', () => {
    it('should render Multiselect', () => {
      expect(createSelect().exists()).toBe(true)
    })

    it('should render fake input if required mode=single', () => {
      let select = createSelect({
        value: 'value1',
        options: ['value1', 'value2', 'value3'],
        required: true,
      }, {
        attach: true,
      })
      
      expect(select.find('.multiselect-fake-input').element).toBeVisible()
      expect(select.find('.multiselect-fake-input').element.value).toBe('value1')
    })

    it('should not render native inputs if nativeInput=false', () => {
      let select = createSelect({
        mode: 'single',
        value: 'value1',
        options: ['value1', 'value2', 'value3'],
        nativeSupport: false
      })
      
      expect(select.find('input[type="hidden"]').exists()).toBe(false)
    })

    it('should not render native inputs if nativeInput=false,mode=single', async () => {
      let select = createSelect({
        mode: 'single',
        value: 'value1',
        options: ['value1', 'value2', 'value3'],
        nativeSupport: true,
        name: 'select',
      })
      
      expect(select.find('input[type="hidden"]').element.value).toBe('value1')
      expect(select.find('input[type="hidden"]').element.name).toBe('select')

      select.vm.clear()

      await nextTick()

      expect(select.find('input[type="hidden"]').element.value).toBe('')
    })

    it('should not render native inputs if nativeInput=false,mode=multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: ['value1', 'value2'],
        options: ['value1', 'value2', 'value3'],
        nativeSupport: true,
        name: 'select',
      })
      
      expect(findAll(select, 'input[type="hidden"]').at(0).element.value).toBe('value1')
      expect(findAll(select, 'input[type="hidden"]').at(0).element.name).toBe('select[]')
      expect(findAll(select, 'input[type="hidden"]').at(1).element.value).toBe('value2')
      expect(findAll(select, 'input[type="hidden"]').at(1).element.name).toBe('select[]')

      select.vm.clear()

      await nextTick()

      expect(select.find('input[type="hidden"]').exists()).toBe(false)
    })

    it('should render fake input if required mode=multiple', () => {
      let select = createSelect({
        mode: 'multiple',
        value: ['value1', 'value2'],
        options: ['value1', 'value2', 'value3'],
        required: true,
      }, {
        attach: true,
      })
      
      expect(select.find('.multiselect-fake-input').element).toBeVisible()
      expect(select.find('.multiselect-fake-input').element.value).toBe('value1,value2')
    })

    it('should not render fake input if not required', () => {
      let select = createSelect({
        value: 1,
        options: ['value1', 'value2', 'value3'],
        required: false,
      }, {
        attach: true,
      })
      
      expect(select.find('.multiselect-fake-input').exists()).toBe(false)
    })

    it('should not render dropdown if showOptions is false', async () => {
      let select = createSelect({
        options: ['value1', 'value2', 'value3'],
        valueProp: 'v',
        showOptions: false,
      }, {
        attach: true,
      })

      let dropdown = findAll(select, '.multiselect-dropdown').at(0)
      
      expect(dropdown.element.classList.contains('is-hidden')).toBe(true)
    })

    it('should render dropdown if open', async () => {
      let select = createSelect({
        options: ['value1', 'value2', 'value3'],
        valueProp: 'v',
      }, {
        attach: true,
      })

      let options = findAll(select, '.multiselect-option')

      expect(options.length).toBe(3)
      expect(options.at(0).html()).toContain('value1')
      expect(options.at(1).html()).toContain('value2')
      expect(options.at(2).html()).toContain('value3')
      expect(findAll(select, '.multiselect-dropdown').at(0).element.classList.contains('is-hidden')).toBe(true)
      
      select.vm.open()

      await nextTick()

      expect(findAll(select, '.multiselect-dropdown').at(0).element.classList.contains('is-hidden')).toBe(false)

      destroy(select)
    })

    it('should render filtered options', async () => {
        let select = createSelect({
          options: ['value1', 'value2', '3'],
          valueProp: 'v',
        })

        select.vm.search = 'value'

        await nextTick()

        let options = findAll(select, '.multiselect-option')

        expect(options.length).toBe(2)
        expect(options.at(0).html()).toContain('value1')
        expect(options.at(1).html()).toContain('value2')
    })

    it('should render filtered groups', async () => {
        let select = createSelect({
          options: [
            {
              label: 'First',
              options: ['value1', 'value2']
            },
            {
              label: 'Second',
              options: ['value3', '4']
            },
          ],
          groups: true,
        })

        select.vm.search = 'value'

        await nextTick()

        let groups = findAll(select, '.multiselect-group')
        let groupLabels = findAll(select, '.multiselect-group')
        let options = findAll(select, '.multiselect-option')

        expect(groups.length).toBe(2)
        expect(groupLabels.length).toBe(2)
        expect(groupLabels.at(0).html()).toContain('First')
        expect(groupLabels.at(1).html()).toContain('Second')

        expect(options.length).toBe(3)
        expect(options.at(0).html()).toContain('value1')
        expect(options.at(1).html()).toContain('value2')
        expect(options.at(2).html()).toContain('value3')
    })

    it('should set pointer to option on mouseenter', async () => {
        let select = createSelect({
          options: [1,2,3],
        })

        findAll(select, '.multiselect-option').at(1).trigger('mouseenter')

        await nextTick()

        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))
    })
  })

  describe('Single mode', () => {
    describe('placeholder', () => {
      it('should render placeholder', () => {
        let select = createSelect({
          options: [1,2,3],
          placeholder: 'Select option'
        }, {
          attach: true,
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()
        expect(select.find('.multiselect-placeholder').html()).toContain('Select option')

        destroy(select)
      })

      it('should render placeholder even if it has search', () => {
        let select = createSelect({
          options: [1,2,3],
          placeholder: 'Select option',
          searchable: true,
        }, {
          attach: true,
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()

        destroy(select)
      })

      it('should not render placeholder if search has value', async () => {
        let select = createSelect({
          options: [1,2,3],
          placeholder: 'Select option',
          searchable: true,
        })

        select.vm.search = 'value'

        await nextTick()

        expect(select.find('.multiselect-placeholder').exists()).toBe(false)
      })

      it('should not render placeholder if it has value', () => {
        let select = createSelect({
          placeholder: 'Select option',
          value: 1,
          options: [1,2,3],
        })

        expect(select.find('.multiselect-placeholder').exists()).toBe(false)
      })
    })

    describe('label', () => {
      it('should render label if has value', () => {
        let select = createSelect({
          value: 'value2',
          options: ['value1','value2','value3'],
        }, {
          attach: true,
        })

        expect(select.find('.multiselect-single-label').element).toBeVisible()
        expect(select.find('.multiselect-single-label').html()).toContain('value2')

        destroy(select)
      })

      it('should not render label if has value', () => {
        let select = createSelect({
          value: null,
          options: [1,2,3],
        })

        expect(select.find('.multiselect-single-label').exists()).toBe(false)
      })

      it('should not render if search has value ', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.search = 'value'

        await nextTick()

        expect(select.find('.multiselect-single-label').exists()).toBe(false)
      })
    })

    testSearch()
  })

  describe('Multiple mode', () => {
    describe('placeholder', () => {
      it('should render placeholder', () => {
        let select = createSelect({
          mode: 'multiple',
          placeholder: 'Select option'
        }, {
          attach: true,
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()
        expect(select.find('.multiselect-placeholder').html()).toContain('Select option')

        destroy(select)
      })

      it('should render placeholder even if it has search', () => {
        let select = createSelect({
          mode: 'multiple',
          placeholder: 'Select option',
          searchable: true,
        }, {
          attach: true,
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()

        destroy(select)
      })

      it('should not render placeholder if search has value', async () => {
        let select = createSelect({
          mode: 'multiple',
          placeholder: 'Select option',
          searchable: true,
        })

        select.vm.search = 'value'

        await nextTick()

        expect(select.find('.multiselect-placeholder').exists()).toBe(false)
      })

      it('should not render placeholder if it has value', () => {
        let select = createSelect({
          mode: 'multiple',
          placeholder: 'Select option',
          value: [1],
          options: [1,2,3],
        })

        expect(select.find('.multiselect-placeholder').exists()).toBe(false)

        destroy(select)
      })
    })

    describe('label', () => {
      it('should render label if has value', () => {
        let select = createSelect({
          mode: 'multiple',
          value: ['value2'],
          options: ['value1','value2','value3'],
        }, {
          attach: true,
        })

        expect(select.find('.multiselect-multiple-label').element).toBeVisible()
        expect(select.find('.multiselect-multiple-label').html()).toContain('1 option selected')
      })

      it('should not render label if has no value', () => {
        let select = createSelect({
          mode: 'multiple',
          value: null,
          options: [1,2,3],
        })

        expect(select.find('.multiselect-multiple-label').exists()).toBe(false)
      })

      it('should not render if search has value ', async () => {
        let select = createSelect({
          mode: 'multiple',
          value: [1],
          options: [1,2,3],
        })

        select.vm.search = 'value'

        await nextTick()

        expect(select.find('.multiselect-multiple-label').exists()).toBe(false)
      })
    })

    describe('clear', () => {
      it('should not render clear if no options selected', () => {
        let select = createSelect({
          mode: 'multiple',
          value: [],
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(false)
      })

      it('should not render clear if disabled', () => {
        let select = createSelect({
          mode: 'multiple',
          value: ['value1'],
          disabled: true,
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(false)
      })

      it('should not render clear if canClear is false', () => {
        let select = createSelect({
          mode: 'single',
          value: ['value1'],
          options: ['value1','value2','value3'],
          canClear: false,
        })

        expect(select.find('.multiselect-clear').exists()).toBe(false)
      })

      it('should render clear has options', () => {
        let select = createSelect({
          mode: 'multiple',
          value: ['value2'],
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(true)
      })

      it('should clear value on clicking clear', async () => {
        let select = createSelect({
          mode: 'multiple',
          value: ['value1','value2','value3'],
          options: ['value1','value2','value3'],
        })

        select.find('.multiselect-clear').trigger('click')

        await nextTick()

        expect(getValue(select)).toStrictEqual([])
      })
    })
    
    testSearch('multiple')
  })

  describe('Tags mode', () => {
    describe('placeholder', () => {
      it('should render placeholder', () => {
        let select = createSelect({
          mode: 'tags',
          placeholder: 'Select option'
        }, {
          attach: true,
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()
        expect(select.find('.multiselect-placeholder').html()).toContain('Select option')

        destroy(select)
      })

      it('should render placeholder even if it has search', () => {
        let select = createSelect({
          mode: 'tags',
          placeholder: 'Select option',
          searchable: true,
        }, {
          attach: true,
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()

        destroy(select)
      })

      it('should not render placeholder if search has value', async () => {
        let select = createSelect({
          mode: 'tags',
          placeholder: 'Select option',
          searchable: true,
        })

        select.vm.search = 'value'

        await nextTick()

        expect(select.find('.multiselect-placeholder').exists()).toBe(false)
      })

      it('should not render placeholder if it has value', () => {
        let select = createSelect({
          mode: 'tags',
          placeholder: 'Select option',
          value: [1],
          options: [1,2,3],
        })

        expect(select.find('.multiselect-placeholder').exists()).toBe(false)
      })
    })

    describe('tags', () => {
      it('should now show any tags if has no value', () => {
        let select = createSelect({
          mode: 'tags',
          value: null,
          options: [1,2,3],
        })

        expect(select.findAll('.multiselect-tag').length).toBe(0)
      })

      it('should show tags if has value', () => {
        let select = createSelect({
          mode: 'tags',
          value: ['value1', 'value2'],
          options: ['value1', 'value2', 'value3'],
        })

        let tags = findAll(select, '.multiselect-tag')

        expect(tags.length).toBe(2)
        expect(tags.at(0).html()).toContain('value1')
        expect(tags.at(1).html()).toContain('value2')
      })

      it('should show remove icon for tags if not disabled', () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
        })

        expect(findAll(select, '.multiselect-tag').at(0).find('.multiselect-tag-remove').exists()).toBe(true)
      })

      it('should not show remove icon for tags if disabled', () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          disabled: true,
        })

        expect(findAll(select, '.multiselect-tag').at(0).find('i').exists()).toBe(false)
      })

      // vue-test-utils does not have an options to replicate left/right click

      it('should deselect value on tag remove if left button is clicked', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
        })

        findAll(select, '.multiselect-tag').at(0).find('.multiselect-tag-remove').trigger('click', { button: 0 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([])
      })

      it('should not deselect value on tag remove if not left button is clicked', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
        })

        findAll(select, '.multiselect-tag').at(0).find('.multiselect-tag-remove').trigger('click', { button: 2 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })
    })

    describe('clear', () => {
      it('should not render clear if no options selected', () => {
        let select = createSelect({
          mode: 'tags',
          value: [],
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(false)
      })

      it('should not render clear if disabled', () => {
        let select = createSelect({
          mode: 'tags',
          value: ['value2'],
          disabled: true,
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(false)
      })

      it('should render clear has options', () => {
        let select = createSelect({
          mode: 'tags',
          value: ['value2'],
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(true)
      })

      it('should not render clear if disabled', () => {
        let select = createSelect({
          mode: 'tags',
          value: ['value2'],
          disabled: true,
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(false)
      })

      it('should clear value on clicking clear', async () => {
        let select = createSelect({
          mode: 'tags',
          value: ['value1','value2','value3'],
          options: ['value1','value2','value3'],
        })

        select.find('.multiselect-clear').trigger('click')

        await nextTick()

        expect(getValue(select)).toStrictEqual([])
      })
    })

    testSearch('tags')

    describe('search', () => {
      it('should remove last element on backspace if search is empty', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [1,2],
          searchable: true,
        })

        select.vm.search = ''

        keydown(select.find('input'), 'backspace')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not remove last element on backspace if search is not empty', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [0,1],
          searchable: true,
        })

        select.vm.search = 'a'

        keydown(select.find('input'), 'backspace')

        await nextTick()

        expect(getValue(select)).toStrictEqual([0,1])
      })
    })
  })
})