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

    it('should not render options if showOptions is false', async () => {
      let select = createSelect({
        options: ['value1', 'value2', 'value3'],
        valueProp: 'v',
        showOptions: false,
      }, {
        attach: true,
      })

      let options = findAll(select, '.multiselect-options').at(0)
      
      expect(options.element).not.toBeVisible()
    })

    it('should render options if open', async () => {
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
      expect(select.find('.multiselect-options').element).not.toBeVisible()
      
      select.vm.open()

      await nextTick()

      expect(select.find('.multiselect-options').element).toBeVisible()

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

    it('should options have max height defined as maxHeight', () => {
        let select = createSelect({
          options: [1,2,3],
          maxHeight: 300,
        })

        expect(select.find('.multiselect-options').element.style.maxHeight).toBe('300px')
    })

    it('should set pointer to option on mouseenter', async () => {
        let select = createSelect({
          options: [1,2,3],
        })

        findAll(select, '.multiselect-option').at(1).trigger('mouseenter')

        await nextTick()

        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))
    })

    it('should select option on click and blur', async () => {
        let blurMock = jest.fn()
        
        let select = createSelect({
          value: null,
          options: [1,2,3],
          valueProp: 'v',
        }, {
          attach: true,
        })

        select.find('.multiselect-input').element.blur = blurMock

        findAll(select, '.multiselect-option').at(1).trigger('click')

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
        expect(blurMock).toHaveBeenCalled()

        destroy(select)
    })

    it('should open on focus', () => {
      let select = createSelect()

      select.find('.multiselect-input').trigger('focus')

      expect(select.vm.isOpen).toBe(true)
    })
    
    it('should close on blur', () => {
      let select = createSelect()

      select.find('.multiselect-input').trigger('focus')
      select.find('.multiselect-input').trigger('blur')

      expect(select.vm.isOpen).toBe(false)
    })

    it('should close, clear pointer and blur on escape', async () => {
      let blurMock = jest.fn()

      let select = createSelect({
        options: [1,2,3],
        value: 1,
      })

      select.vm.pointer = select.vm.getOption(1)
      select.vm.open()
      select.find('.multiselect-input').element.blur = blurMock

      keyup(select.find('.multiselect-input'), 'escape')

      await nextTick()

      expect(select.vm.pointer).toBe(null)
      expect(select.vm.isOpen).toBe(false)
      expect(blurMock).toHaveBeenCalled()
    })

    it('should remove last element on backspace', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [0,1],
      })

      keydown(select.find('.multiselect-input'), 'backspace')

      await nextTick()

      expect(getValue(select)).toStrictEqual([0])
    })

    it('should set pointer on up&down and select with enter', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null,
      }, {
        attach: true,
      })

      select.vm.open()
      keydown(select.find('.multiselect-input'), 'down')
      keydown(select.find('.multiselect-input'), 'down')
      keydown(select.find('.multiselect-input'), 'down')
      keydown(select.find('.multiselect-input'), 'up')
      keyup(select.find('.multiselect-input'), 'enter')

      await nextTick()

      expect(getValue(select)).toStrictEqual(1)

      destroy(select)
    })

    it('should not select pointer with enter if not in addTagOn', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null,
        addTagOn: ['space'],
      }, {
        attach: true,
      })

      select.vm.open()
      keydown(select.find('.multiselect-input'), 'down')
      keyup(select.find('.multiselect-input'), 'enter')

      await nextTick()

      expect(getValue(select)).toStrictEqual(null)

      destroy(select)
    })

    it('should select pointer with space if in addTagOn', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null,
        addTagOn: ['space'],
      }, {
        attach: true,
      })

      select.vm.open()
      
      keydown(select.find('.multiselect-input'), 'down')
      keyup(select.find('.multiselect-input'), 'space')

      await nextTick()

      expect(getValue(select)).toStrictEqual(0)

      destroy(select)
    })

    it('should select pointer with space if search is focused', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null,
        searchable: true,
        addTagOn: ['space'],
      }, {
        attach: true,
      })

      select.find('.multiselect-search').element.focus()
      
      keydown(select.find('.multiselect-input'), 'down')
      keyup(select.find('.multiselect-input'), 'space')

      await nextTick()

      expect(getValue(select)).toStrictEqual(0)

      destroy(select)
    })

    it('should select pointer with space if tags search is focused', async () => {
      let select = createSelect({
        options: [1,2,3],
        mode: 'tags',
        value: null,
        searchable: true,
        addTagOn: ['space'],
      }, {
        attach: true,
      })

      select.find('.multiselect-search').element.focus()
      
      keydown(select.find('.multiselect-input'), 'down')
      keyup(select.find('.multiselect-input'), 'space')

      await nextTick()

      expect(getValue(select)).toStrictEqual([0])

      destroy(select)
    })
  })

  describe('Single mode', () => {
    describe('placeholder', () => {
      it('should render placeholder', () => {
        let select = createSelect({
          options: [1,2,3],
          placeholder: 'Select option'
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()
        expect(select.find('.multiselect-placeholder').html()).toContain('Select option')
      })

      it('should render placeholder even if it has search', () => {
        let select = createSelect({
          options: [1,2,3],
          placeholder: 'Select option',
          searchable: true,
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()
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
          value: 1,
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-single-label').element).toBeVisible()
        expect(select.find('.multiselect-single-label').html()).toContain('value2')
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
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()
        expect(select.find('.multiselect-placeholder').html()).toContain('Select option')
      })

      it('should render placeholder even if it has search', () => {
        let select = createSelect({
          mode: 'multiple',
          placeholder: 'Select option',
          searchable: true,
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()
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
      })
    })

    describe('label', () => {
      it('should render label if has value', () => {
        let select = createSelect({
          mode: 'multiple',
          value: [1],
          options: ['value1','value2','value3'],
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
          value: [1],
          disabled: true,
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(false)
      })

      it('should render clear has options', () => {
        let select = createSelect({
          mode: 'multiple',
          value: [1],
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(true)
      })

      it('should clear value on clicking clear', async () => {
        let select = createSelect({
          mode: 'multiple',
          value: [0,1,2],
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
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()
        expect(select.find('.multiselect-placeholder').html()).toContain('Select option')
      })

      it('should render placeholder even if it has search', () => {
        let select = createSelect({
          mode: 'tags',
          placeholder: 'Select option',
          searchable: true,
        })

        expect(select.find('.multiselect-placeholder').element).toBeVisible()
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
          value: [0,1],
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
          value: [0],
          options: [1,2,3],
        })

        expect(findAll(select, '.multiselect-tag').at(0).find('i').exists()).toBe(true)
      })

      it('should not show remove icon for tags if disabled', () => {
        let select = createSelect({
          mode: 'tags',
          value: [0],
          options: [1,2,3],
          disabled: true,
        })

        expect(findAll(select, '.multiselect-tag').at(0).find('i').exists()).toBe(false)
      })

      // vue-test-utils does not have an options to replicate left/right click

      it('should deselect value on tag remove if left button is clicked', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [0],
          options: [1,2,3],
        })

        findAll(select, '.multiselect-tag').at(0).find('i').trigger('mousedown', { button: 0 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([])
      })

      it('should not deselect value on tag remove if not left button is clicked', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [0],
          options: [1,2,3],
        })

        findAll(select, '.multiselect-tag').at(0).find('i').trigger('mousedown', { button: 2 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([0])
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
          value: [1],
          disabled: true,
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(false)
      })

      it('should render clear has options', () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(true)
      })

      it('should not render clear if disabled', () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          disabled: true,
          options: ['value1','value2','value3'],
        })

        expect(select.find('.multiselect-clear').exists()).toBe(false)
      })

      it('should clear value on clicking clear', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [0,1,2],
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
          value: [0,1],
          searchable: true,
        })

        select.vm.search = ''

        keydown(select.find('input'), 'backspace')

        await nextTick()

        expect(getValue(select)).toStrictEqual([0])
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

      it('should have search width according to search length', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [0,1],
          searchable: true,
        })

        select.vm.search = 'value'

        await nextTick()

        expect(select.find('.multiselect-tags .multiselect-search').element.style.width).toBe('5ch')
        expect(select.find('input').element.style.width).toBe('5ch')
      })
    })
  })
})