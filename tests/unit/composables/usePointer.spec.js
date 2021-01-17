import { createSelect } from 'unit-test-helpers'

describe('usePointer', () => {
  describe('pointer', () => {
    it('should be null by default', () => {
      let select = createSelect()

      expect(select.vm.pointer).toBe(null)
    })
  })
})