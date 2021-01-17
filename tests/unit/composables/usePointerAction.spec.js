import { createSelect, destroy, getValue } from 'unit-test-helpers'
import { nextTick } from 'composition-api'

describe('usePointer Action', () => {
  describe('isPointed', () => {
    it('should be true if option is pointer', () => {
      let select = createSelect({
        options: [1,2,3],
        valueProp: 'v',
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
    it('should trigger select with current pointer value if not null and clear after that when not disabled', async () => {
      let select = createSelect({
        options: [
          { value: 0, label: 0, disabled: false },
          { value: 1, label: 1, disabled: false },
          { value: 2, label: 2, disabled: true },
        ],
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

    it('should not select option when not disabled', async () => {
      let select = createSelect({
        options: [
          { value: 0, label: 0, disabled: false },
          { value: 1, label: 1, disabled: false },
          { value: 2, label: 2, disabled: true },
        ],
        value: null,
      }, {
        attach: true,
      })

      select.vm.selectPointer()

      await nextTick()

      expect(getValue(select)).toStrictEqual(null)

      select.vm.pointer = select.vm.getOption(2)
      select.vm.selectPointer()

      await nextTick()

      expect(getValue(select)).toStrictEqual(null)
      expect(select.vm.pointer).toStrictEqual(null)

      destroy(select)
    })
  })

  describe('forwardPointer', () => {
    it('should set first enabled option if pointer is null', async () => {
      let select = createSelect({
        options: [
          { value: 0, label: 0, disabled: true },
          { value: 1, label: 1, disabled: false },
          { value: 2, label: 2, disabled: false },
        ]
      }, {
        attach: true,
      })

      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))

      destroy(select)
    })

    it('should not do anything if has no enabled options and pointer is null', async () => {
      let select = createSelect({
        options: [
          { value: 0, label: 0, disabled: true },
          { value: 1, label: 1, disabled: true },
          { value: 2, label: 2, disabled: true },
        ]
      }, {
        attach: true,
      })

      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(null)

      destroy(select)
    })

    it('should clear pointer if has no enabled options and pointer is not null', async () => {
      let select = createSelect({
        options: [
          { value: 0, label: 0, disabled: true },
          { value: 1, label: 1, disabled: true },
          { value: 2, label: 2, disabled: true },
        ]
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(0)

      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(null)

      destroy(select)
    })

    it('should set next enabled option if current is not last', async () => {
      let select = createSelect({
        options: [
          { v: 0, label: 0, disabled: false },
          { v: 1, label: 1, disabled: false },
          { v: 2, label: 2, disabled: true },
          { v: 3, label: 3, disabled: false },
        ],
        valueProp: 'v',
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(1)
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(3))

      destroy(select)
    })

    it('should set first enabled option if current is last', async () => {
      let select = createSelect({
        options: [
          { v: 0, label: 0, disabled: true },
          { v: 1, label: 1, disabled: false },
          { v: 2, label: 2, disabled: false },
        ],
        valueProp: 'v',
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(2)
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))

      destroy(select)
    })
  })

  describe('backwardPointer', () => {
    it('should set last enabled option if pointer is null', async () => {
      let select = createSelect({
        options: [
          { value: 0, label: 0, disabled: false },
          { value: 1, label: 1, disabled: false },
          { value: 2, label: 2, disabled: true },
        ]
      }, {
        attach: true,
      })

      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))

      destroy(select)
    })

    it('should not do anything if has no enabled options and pointer is null', async () => {
      let select = createSelect({
        options: [
          { value: 0, label: 0, disabled: true },
          { value: 1, label: 1, disabled: true },
          { value: 2, label: 2, disabled: true },
        ]
      }, {
        attach: true,
      })

      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(null)

      destroy(select)
    })

    it('should clear pointer if has no enabled options and pointer is not null', async () => {
      let select = createSelect({
        options: [
          { value: 0, label: 0, disabled: true },
          { value: 1, label: 1, disabled: true },
          { value: 2, label: 2, disabled: true },
        ]
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(0)

      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(null)

      destroy(select)
    })

    it('should set previous enabled option if current is not first', async () => {
      let select = createSelect({
        options: [
          { v: 0, label: 0, disabled: false },
          { v: 1, label: 1, disabled: true },
          { v: 2, label: 2, disabled: false },
          { v: 3, label: 3, disabled: false },
        ],
        valueProp: 'v',
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(2)
      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(0))

      destroy(select)
    })

    it('should set last enabled option if current is first', async () => {
      let select = createSelect({
        options: [
          { v: 0, label: 0, disabled: false },
          { v: 1, label: 1, disabled: false },
          { v: 2, label: 2, disabled: true },
        ],
        valueProp: 'v',
      }, {
        attach: true,
      })

      select.vm.pointer = select.vm.getOption(0)
      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))

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