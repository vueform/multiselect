import { createSelect } from 'unit-test-helpers'

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

  describe('toggle', () => {
    it('should ', () => {
      let select = createSelect()
    })
  })
})