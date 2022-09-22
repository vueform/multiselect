import { createSelect, destroy } from 'unit-test-helpers'

jest.useFakeTimers()

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

  describe('blur', () => {
    it('should blur input if searchable', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
      }, {
        attach: true
      })

      select.vm.mouseClicked = true
      select.element.focus()
      expect(select.vm.isOpen).toBe(true)

      select.vm.blur()
      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(false)

      destroy(select)
    })

    it('should blur multiselect if not searchable', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
      }, {
        attach: true
      })

      select.vm.mouseClicked = true
      select.element.focus()
      expect(select.vm.isOpen).toBe(true)

      select.vm.blur()
      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(false)

      destroy(select)
    })
  })

  // describe('handleFocus', () => {
  //   it('should focus input if searchable', () => {
  //     let select = createSelect({
  //       value: null,
  //       options: [1,2,3],
  //       searchable: true,
  //     }, {
  //       attach: true
  //     })

  //     expect(select.vm.isOpen).toBe(false)

  //     select.vm.handleFocus()
  //     expect(select.vm.isOpen).toBe(true)

  //     destroy(select)
  //   })

  //   it('should not focus input if not searchable', () => {
  //     let select = createSelect({
  //       value: null,
  //       options: [1,2,3],
  //       searchable: false,
  //     }, {
  //       attach: true
  //     })

  //     expect(select.vm.isOpen).toBe(false)

  //     select.vm.handleFocusIn()
  //     expect(select.vm.isOpen).toBe(false)

  //     destroy(select)
  //   })
  // })

  describe('activate', () => {
    it('should set isActive to true and open', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
      })

      select.vm.activate()

      expect(select.vm.isOpen).toBe(true)
      expect(select.vm.isActive).toBe(true)
    })

    it('should not set isActive to true and open when disabled', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        disabled: true,
      })

      select.vm.activate()

      expect(select.vm.isOpen).toBe(false)
      expect(select.vm.isActive).toBe(false)
    })
  })

  describe('deactivate', () => {
    it('should set isActive to false and close', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
      })

      select.vm.activate()
      select.vm.deactivate()

      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(false)
      expect(select.vm.isActive).toBe(false)
    })

    it('should not close and clearSearch if isActivate is true in 1 tick', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
      })

      select.vm.activate()
      select.vm.deactivate()

      select.vm.activate()

      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(true)
      expect(select.vm.isActive).toBe(true)
    })
  })

  describe('handleCaretClick', () => {
    it('should deactivate and blur when isActive', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
      })

      select.vm.activate()

      select.vm.handleCaretClick()

      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(false)
      expect(select.vm.isActive).toBe(false)
    })

    it('should not deactivate and blur when not isActive', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
      })

      select.vm.handleCaretClick()

      expect(select.vm.isOpen).toBe(false)
      expect(select.vm.isActive).toBe(false)
    })
  })
})