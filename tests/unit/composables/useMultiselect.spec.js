import { createSelect } from 'unit-test-helpers'

describe('useMultiselect', () => {
  describe('multiselect', () => {
    it('should be the ref of container DOM', () => {
      let select = createSelect()

      expect(select.vm.multiselect).toStrictEqual(select.vm.$el)
    })
  })

  describe('tabindex', () => {
    it('should be 0 when not searchable', () => {
      let select = createSelect({
        searchable: false,
      })

      expect(select.vm.tabindex).toBe(0)
    })

    it('should be -1 when not searchable', () => {
      let select = createSelect({
        searchable: true,
      })

      expect(select.vm.tabindex).toBe(-1)
    })
  })

  describe('blurInput', () => {
    it('should blur .multiselect-input DOM', () => {
      let blurMock = jest.fn()

      let select = createSelect({}, {
        attach: true
      })

      let multiselectInput = select.vm.multiselect.querySelector('.multiselect-input')

      multiselectInput.blur = blurMock

      select.vm.blurInput()

      expect(blurMock).toHaveBeenCalled()
    })
  })
})