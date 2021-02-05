import { createSelect, destroy, getValue, findAll } from 'unit-test-helpers'
import { nextTick } from 'composition-api'

describe('useDropdown', () => {
  describe('isOpen', () => {
    it('should be false by default', () => {
      let select = createSelect()

      expect(select.vm.isOpen).toBe(false)
    })
  })

  describe('contentMaxHeight', () => {
    it('should maxHeight with px', () => {
      let select = createSelect({
        maxHeight: 220
      })

      expect(select.vm.contentMaxHeight).toBe('220px')
    })
  })

  describe('openDropdown', () => {
    it('should set isOpen to true', () => {
      let select = createSelect()

      select.vm.openDropdown()

      expect(select.vm.isOpen).toBe(true)
    })

    it('should emit open', () => {
      let select = createSelect()

      select.vm.openDropdown()

      expect(select.emitted('open')).toBeTruthy()
    })

    it('should not open when disabled', () => {
      let select = createSelect({
        disabled: true,
      })

      select.vm.openDropdown()

      expect(select.vm.isOpen).toBe(false)
    })
  })

  describe('closeDropdown', () => {
    it('should set isOpen to false', () => {
      let select = createSelect()

      select.vm.openDropdown()
      select.vm.closeDropdown()

      expect(select.vm.isOpen).toBe(false)
    })

    it('should emit open', () => {
      let select = createSelect()

      select.vm.openDropdown()
      select.vm.closeDropdown()

      expect(select.emitted('close')).toBeTruthy()
    })
  })

  describe('open', () => {
    it('should open and focus input when searchable=false,mode=single', () => {
      let select = createSelect({
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.open()

      expect(select.vm.isOpen).toBe(true)

      expect(document.activeElement).toStrictEqual(select.vm.multiselect.querySelector('.multiselect-input'))

      destroy(select)
    })

    it('should open and focus input when searchable=true,mode=single', () => {
      let select = createSelect({
        searchable: true,
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.open()

      expect(select.vm.isOpen).toBe(true)

      expect(document.activeElement).toStrictEqual(select.vm.input)

      destroy(select)
    })

    it('should open and focus input when searchable=false,mode=multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.open()

      expect(select.vm.isOpen).toBe(true)

      expect(document.activeElement).toStrictEqual(select.vm.multiselect.querySelector('.multiselect-input'))

      destroy(select)
    })

    it('should open and focus input when searchable=true,mode=multiple', () => {
      let select = createSelect({
        mode: 'multiple',
        searchable: true,
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.open()

      expect(select.vm.isOpen).toBe(true)

      expect(document.activeElement).toStrictEqual(select.vm.input)

      destroy(select)
    })

    it('should open and focus input when searchable=false,mode=tags', () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.open()

      expect(select.vm.isOpen).toBe(true)

      expect(document.activeElement).toStrictEqual(select.vm.multiselect.querySelector('.multiselect-input'))

      destroy(select)
    })

    it('should open and focus input when searchable=true,mode=tags', () => {
      let select = createSelect({
        mode: 'tags',
        searchable: true,
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.open()

      expect(select.vm.isOpen).toBe(true)

      expect(document.activeElement).toStrictEqual(select.vm.input)

      destroy(select)
    })
  })

  describe('close', () => {
    it('should close and blur when searchable=false,mode=single', () => {
      let select = createSelect({
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.open()
      select.vm.close()

      let input = select.vm.multiselect.querySelector('.multiselect-input')

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement).not.toStrictEqual(input)

      input.focus()

      expect(select.vm.isOpen).toBe(true)
      expect(document.activeElement).toStrictEqual(input)

      destroy(select)
    })

    it('should close and blur when searchable=true,mode=single', () => {
      let select = createSelect({
        options: [1,2,3],
        searchable: true
      }, {
        attach: true
      })

      select.vm.open()
      select.vm.close()

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement).not.toStrictEqual(select.vm.input)

      select.vm.input.focus()

      expect(select.vm.isOpen).toBe(true)
      expect(document.activeElement).toStrictEqual(select.vm.input)

      destroy(select)
    })

    it('should close and blur when searchable=false,mode=multiple', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.open()
      select.vm.close()

      let input = select.vm.multiselect.querySelector('.multiselect-input')

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement).not.toStrictEqual(input)

      input.focus()

      expect(select.vm.isOpen).toBe(true)
      expect(document.activeElement).toStrictEqual(input)

      destroy(select)
    })

    it('should close and blur when searchable=true,mode=multiple', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        searchable: true
      }, {
        attach: true
      })

      select.vm.open()
      select.vm.close()

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement).not.toStrictEqual(select.vm.input)

      select.vm.input.focus()

      expect(select.vm.isOpen).toBe(true)
      expect(document.activeElement).toStrictEqual(select.vm.input)

      destroy(select)
    })

    it('should close and blur when searchable=false,mode=tags', () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.open()
      select.vm.close()

      let input = select.vm.multiselect.querySelector('.multiselect-input')

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement).not.toStrictEqual(input)

      input.focus()

      expect(select.vm.isOpen).toBe(true)
      expect(document.activeElement).toStrictEqual(input)

      destroy(select)
    })

    it('should close and blur when searchable=true,mode=tags', () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        searchable: true
      }, {
        attach: true
      })

      select.vm.open()
      select.vm.close()

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement).not.toStrictEqual(select.vm.input)

      select.vm.input.focus()

      expect(select.vm.isOpen).toBe(true)
      expect(document.activeElement).toStrictEqual(select.vm.input)

      destroy(select)
    })
  })

  describe('handleInputMousedown', () => {
    it('should open if closed mode=single searchable=false', async () => {
      let select = createSelect({
        options: [1,2,3],
      }, {
        attach: true,
      })

      let inputDiv = select.vm.multiselect.querySelector('.multiselect-input')

      inputDiv.dispatchEvent(new Event('mousedown'))
      inputDiv.dispatchEvent(new Event('focus'))

      await nextTick()

      expect(select.vm.isOpen).toBe(true)

      destroy(select)
    })

    it('should close if open mode=single searchable=false', async () => {
      let select = createSelect({
        options: [1,2,3],
      }, {
        attach: true,
      })

      let inputDiv = select.vm.multiselect.querySelector('.multiselect-input')

      inputDiv.dispatchEvent(new Event('mousedown'))
      inputDiv.dispatchEvent(new Event('focus'))

      await nextTick()

      inputDiv.dispatchEvent(new Event('mousedown'))

      await nextTick()

      expect(select.vm.isOpen).toBe(false)

      destroy(select)
    })
    
    it('should open if closed mode=single searchable=true', async () => {
      let select = createSelect({
        options: [1,2,3],
        searchable: true,
      }, {
        attach: true,
      })

      let inputDiv = select.vm.multiselect.querySelector('.multiselect-input')

      inputDiv.dispatchEvent(new Event('mousedown'))
      inputDiv.dispatchEvent(new Event('focus'))

      await nextTick()

      expect(select.vm.isOpen).toBe(true)

      destroy(select)
    })
    
    it('should not close if opened mode=single searchable=true', async () => {
      let select = createSelect({
        options: [1,2,3],
        searchable: true,
      }, {
        attach: true,
      })

      let inputDiv = select.vm.multiselect.querySelector('.multiselect-input')

      inputDiv.dispatchEvent(new Event('mousedown'))
      inputDiv.dispatchEvent(new Event('focus'))

      await nextTick()

      inputDiv.dispatchEvent(new Event('mousedown'))

      await nextTick()

      expect(select.vm.isOpen).toBe(true)

      destroy(select)
    })

    it('should not close on tag remove search=false', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [1],
      }, {
        attach: true,
      })

      let inputDiv = select.vm.multiselect.querySelector('.multiselect-input')
      let tagRemove = findAll(select, '.multiselect-tag').at(0).find('i')

      inputDiv.dispatchEvent(new Event('mousedown'))
      inputDiv.dispatchEvent(new Event('focus'))

      await nextTick()

      tagRemove.trigger('mousedown', { button: 0 })

      await nextTick()

      expect(select.vm.isOpen).toBe(true)
      expect(getValue(select)).toStrictEqual([])

      destroy(select)
    })
  })
})