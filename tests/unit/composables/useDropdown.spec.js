import { createSelect, unmount, findAllComponents } from 'unit-test-helpers'
import { nextTick } from 'vue'

describe('useDropdown', () => {
  describe('isOpen', () => {
    it('should be false by default', () => {
      let select = createSelect()

      expect(select.vm.isOpen).toBe(false)
    })
  })

  describe('placement', () => {
    it('should be \'bottom\' if openDirection is empty', () => {
      let select = createSelect()

      expect(select.vm.placement).toBe('bottom')
    })

    it('should be \'top\' if openDirection is top', () => {
      let select = createSelect({
        openDirection: 'top'
      })

      expect(select.vm.placement).toBe('top')
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

    it('should update popper on open if appended', async () => {
      let select = createSelect({
        appendToBody: true
      })

      let setOptionsMock = jest.fn(() => {})
      let updateMock = jest.fn(() => {})

      select.vm.open()

      select.vm.popper.setOptions = setOptionsMock
      select.vm.popper.update = updateMock

      await nextTick()

      expect(setOptionsMock).toHaveBeenCalled()
      expect(updateMock).toHaveBeenCalled()
    })

    it('should set popper options on update', async () => {
      let select = createSelect({
        appendToBody: true
      })

      select.vm.open()

      await nextTick()

      expect(select.vm.popper.state.placement).toBe('bottom')
    })

    it('should set popper options on update with direction top', async () => {
      let select = createSelect({
        appendToBody: true,
        openDirection: 'top',
      })

      select.vm.open()

      await nextTick()

      expect(select.vm.popper.state.placement).toBe('top')
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

  describe('updatePopper', () => {
    it('should not update popper if it does not exist', async () => {
      let select = createSelect()

      let updateMock = jest.fn(() => {})

      select.vm.updatePopper()

      select.vm.popper = {
        update: updateMock,
      }

      expect(updateMock).not.toHaveBeenCalled()
    })
  })

  describe('onBeforeUnmount', () => {
    it('should destroy popper on unmount', async () => {
      let wrapper = createSelect({
        appendToBody: true
      }, {}, true)

      let select = findAllComponents(wrapper, { name: 'Multiselect' }).at(0)

      let destroyMock = jest.fn(() => {})
      select.vm.popper.destroy = destroyMock

      unmount(wrapper)

      expect(destroyMock).toHaveBeenCalled()
    })

    it('should not destroy popper on unmount if it does not exist', async () => {
      let wrapper = createSelect({}, {}, true)

      let select = findAllComponents(wrapper, { name: 'Multiselect' }).at(0)

      let destroyMock = jest.fn(() => {})
      select.vm.popper = {
        destroy: destroyMock,
      }

      unmount(wrapper)

      expect(destroyMock).not.toHaveBeenCalled()
    })
  })
})