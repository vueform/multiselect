import { createSelect } from 'unit-test-helpers'

describe('usePointer', () => {
  describe('pointer', () => {
    it('should be null by default', () => {
      let select = createSelect()

      expect(select.vm.pointer).toBe(null)
    })
  })

  describe('setPointer', () => {
    it('should set pointer', () => {
      let select = createSelect({
        options: [1,2,3]
      })

      select.vm.setPointer(select.vm.getOption(2))

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))
    })

    it('should not set pointer if option is undefined', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        showOptions: false,
      })

      select.vm.setPointer(select.vm.getOption(4))

      expect(select.vm.pointer).toStrictEqual(null)
    })
  })

  describe('clearPointer', () => {
    it('should set pointer to null', () => {
      let select = createSelect({
        options: [1,2,3],
      })

      select.vm.pointer = select.vm.getOption(1)
      select.vm.clearPointer()

      expect(select.vm.pointer).toBe(null)
    })
  })
})