import { createSelect, getValue } from 'unit-test-helpers'
import { nextTick } from 'composition-api'

describe('useKeyboard', () => {
  describe('handleBackspace', () => {
    it('should remove last selected option when multiple on backspace', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [0,1]
      })

      select.vm.handleBackspace()

      await nextTick()

      expect(getValue(select)).toStrictEqual([0])
    })

    it('should return when single', async () => {
      let select = createSelect({
        mode: 'single',
        options: [1,2,3],
        value: 1
      })

      select.vm.handleBackspace()

      await nextTick()

      expect(getValue(select)).toStrictEqual(1)
    })
  })

  describe('handleEsc', () => {
    it('should clearPointer, close and blur target on escape', () => {
      let blurMock = jest.fn()

      let select = createSelect({
        options: [1,2,3],
      })

      select.vm.open()
      select.vm.setPointer(select.vm.getOption(1))

      select.vm.handleEsc({target:{blur:blurMock}})

      expect(select.vm.isOpen).toBe(false)
      expect(select.vm.pointer).toBe(null)
      expect(blurMock).toHaveBeenCalled()
    })
  })

  describe('handleSearchBackspace', () => {
    it('should stop propagation if search is not empty', () => {
      let stopPropagationMock = jest.fn()

      let select = createSelect()

      select.vm.search = ''

      select.vm.handleSearchBackspace({
        stopPropagation: stopPropagationMock
      })

      expect(stopPropagationMock).not.toHaveBeenCalled()
    })

    it('should stop propagation if search is empty', () => {
      let stopPropagationMock = jest.fn()

      let select = createSelect()

      select.vm.search = 'value'

      select.vm.handleSearchBackspace({
        stopPropagation: stopPropagationMock
      })

      expect(stopPropagationMock).toHaveBeenCalled()
    })
  })

  describe('handleSearchInput', () => {
    it('should set search value on input', async () => {
      let select = createSelect({
        value: null,
        searchable: true,
        options: [1,2,3]
      })

      select.find('input').element.value = 'val'
      select.find('input').trigger('input')

      await nextTick()

      expect(select.vm.search).toBe('val')
    })

    it('should set search value on input mode="tags"', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [],
        searchable: true,
        options: [1,2,3]
      })

      select.find('input').element.value = 'val'
      select.find('input').trigger('input')

      await nextTick()

      expect(select.vm.search).toBe('val')
    })
  })
})