import { createSelect, destroy, getValue } from 'unit-test-helpers'
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

  describe('open', () => {
    it('should set isOpen to true', () => {
      let select = createSelect()

      select.vm.open()

      expect(select.vm.isOpen).toBe(true)
    })

    it('should emit open', () => {
      let select = createSelect()

      select.vm.open()

      expect(select.emitted('open')).toBeTruthy()
    })

    it('should not open when disabled', () => {
      let select = createSelect({
        disabled: true,
      })

      select.vm.open()

      expect(select.vm.isOpen).toBe(false)
    })
  })

  describe('close', () => {
    it('should set isOpen to false', () => {
      let select = createSelect()

      select.vm.open()
      select.vm.close()

      expect(select.vm.isOpen).toBe(false)
    })

    it('should emit open', () => {
      let select = createSelect()

      select.vm.open()
      select.vm.close()

      expect(select.emitted('close')).toBeTruthy()
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
      let tagRemove = select.vm.multiselect.querySelector('.multiselect-tag i')

      inputDiv.dispatchEvent(new Event('mousedown'))
      inputDiv.dispatchEvent(new Event('focus'))

      await nextTick()

      tagRemove.dispatchEvent(new Event('mousedown'))

      await nextTick()

      expect(select.vm.isOpen).toBe(true)
      expect(getValue(select)).toStrictEqual([])

      destroy(select)
    })
  })
})