import { createSelect, destroy, getValue } from 'unit-test-helpers'
import { nextTick } from 'composition-api'

describe('usePointer', () => {
  describe('pointer', () => {
    it('should be null by default', () => {
      let select = createSelect()

      expect(select.vm.pointer).toBe(null)
    })
  })

  describe('isPointed', () => {
    it('should be true if option is pointer', () => {
      let select = createSelect({
        options: [1,2,3]
      })

      expect(select.vm.isPointed(select.vm.getOption(1))).toBe(false)

      select.vm.pointer = select.vm.getOption(1)

      expect(select.vm.isPointed(select.vm.getOption(0))).toBe(false)
      expect(select.vm.isPointed(select.vm.getOption(1))).toBe(true)
    })
  })

  describe('setPointer', () => {
    it('should set pointer', () => {
      let select = createSelect({
        options: [1,2,3]
      })

      select.vm.setPointer(select.vm.getOption(1))

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))
    })
  })

  describe('setPointerFirst', () => {
    it('should set first option as pointer', () => {
      let select = createSelect({
        options: [1,2,3],
      })

      select.vm.setPointerFirst()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(0))
    })

    it('should set null as pointer if has no options', () => {
      let select = createSelect()

      select.vm.setPointerFirst()

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

  describe('selectPointer', () => {
    it('should trigger select with current pointer value if not null and clear after that', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null,
      }, {
        attach: true,
      })

      select.vm.selectPointer()

      await nextTick()

      expect(getValue(select)).toStrictEqual(null)

      select.vm.pointer = select.vm.getOption(1)
      select.vm.selectPointer()

      await nextTick()

      expect(getValue(select)).toStrictEqual(1)
      expect(select.vm.pointer).toStrictEqual(null)

      destroy(select)
    })
  })

  describe('forwardPointer', () => {
    it('should set first option if pointer is null', async () => {
      let select = createSelect({
        options: [1,2,3]
      }, {
        attach: true,
      })

      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(0))

      destroy(select)
    })

    it('should set next option if current is not last', async () => {
      let select = createSelect({
        options: [1,2,3]
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(1)
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))

      destroy(select)
    })

    it('should set first option if current is last', async () => {
      let select = createSelect({
        options: [1,2,3]
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(2)
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(0))

      destroy(select)
    })
  })

  describe('backwardPointer', () => {
    it('should set last option if pointer is null', async () => {
      let select = createSelect({
        options: [1,2,3]
      }, {
        attach: true
      })

      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))

      destroy(select)
    })

    it('should set previous option if current is not first', async () => {
      let select = createSelect({
        options: [1,2,3]
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(1)
      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(0))

      destroy(select)
    })

    it('should set last option if current is first', async () => {
      let select = createSelect({
        options: [1,2,3]
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(0)
      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))

      destroy(select)
    })
  })

  describe('watch', () => {
    it('should set first option as pointer when search changes', async () => {
      let select = createSelect({
        options: ['v1','v2','v3']
      })

      select.vm.search = 'v'

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(0))
    })
  })
})