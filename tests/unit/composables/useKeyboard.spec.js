import { createSelect } from 'unit-test-helpers'
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

      expect(select.vm.value).toStrictEqual([0])
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
})