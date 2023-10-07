import { createSelect, destroy, getValue } from 'unit-test-helpers'
import { nextTick } from 'vue'

describe('usePointer Action', () => {
  describe('isPointed', () => {
    it('should be true if option is pointed', () => {
      let select = createSelect({
        options: [1,2,3],
        valueProp: 'v',
      })

      expect(select.vm.isPointed(select.vm.getOption(2))).toBe(undefined)

      select.vm.pointer = select.vm.getOption(2)

      expect(select.vm.isPointed(select.vm.getOption(1))).toBe(undefined)
      expect(select.vm.isPointed(select.vm.getOption(2))).toBe(true)
    })
  })

  describe('setPointerFirst', () => {
    it('should set first option as pointer', () => {
      let select = createSelect({
        options: [1,2,3],
      })

      select.vm.setPointerFirst()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))
    })

    it('should set null as pointer if has no options', () => {
      let select = createSelect()

      select.vm.setPointerFirst()

      expect(select.vm.pointer).toStrictEqual(null)
    })
  })

  describe('selectPointer', () => {
    it('should trigger select with current pointer value if not null when not disabled', async () => {
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

      destroy(select)
    })

    it('should trigger select with current pointer value if not null when not disabled and pointer is group', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        value: [],
      })

      select.vm.pointer = select.vm.fg[1]
      select.vm.selectPointer()

      await nextTick()

      expect(getValue(select)).toStrictEqual([4,5,6])
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

      destroy(select)
    })
  })

  describe('forwardPointer', () => {
    it('should set first enabled option if pointer is null and groups=false', async () => {
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

    it('should set first enabled group if pointer is null and groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: null,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true
      })

      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        ...select.vm.fg[0],
        index: 0,
      })
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

    it('should set first enabled option of the group if pointer is group and has enabled option groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: true },
              { value: 2, label: 2, disabled: false },
              { value: 3, label: 3, disabled: false },
            ],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true
      })

      select.vm.pointer = select.vm.fg[0]
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))
    })

    it('should set next enabled group label if pointer is group and has not enabled options groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: true }
            ],
          },
          {
            label: 'Second',
            disabled: true,
            options: [4,5,6],
          },
          {
            label: 'Third',
            options: [7,8,9],
          },
        ],
        groups: true
      })

      select.vm.pointer = select.vm.fg[0]
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        ...select.vm.fg[2],
        index: 2,
      })
    })

    it('should set first enabled group label if pointer is group and has not enabled options and has no enabled next group groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: true }
            ],
          },
          {
            label: 'Second',
            options: [
              { value: 4, label: 4, disabled: true },
              { value: 5, label: 5, disabled: true },
              { value: 6, label: 6, disabled: true },
            ],
          },
          {
            label: 'Third',
            disabled: true,
            options: [7,8,9],
          },
        ],
        groups: true
      })

      select.vm.pointer = select.vm.fg[1]
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        ...select.vm.fg[0],
        index: 0,
      })
    })

    it('should set next enabled option in group groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: false },
              { value: 2, label: 2, disabled: true },
              { value: 3, label: 3, disabled: false },
            ],
          },
          {
            label: 'Second',
            options: [
              { value: 4, label: 4, },
              { value: 5, label: 5, },
              { value: 6, label: 6, },
            ],
          },
        ],
        groups: true
      })

      select.vm.pointer = select.vm.getOption(1)
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(3))
    })

    it('should set next enabled group if has no enabled next option groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: false },
              { value: 2, label: 2, disabled: true },
              { value: 3, label: 3, disabled: true },
            ],
          },
          {
            label: 'Second',
            disabled: true,
            options: [
              { value: 4, label: 4, },
              { value: 5, label: 5, },
              { value: 6, label: 6, },
            ],
          },
          {
            label: 'Third',
            options: [
              { value: 7, label: 7, },
              { value: 8, label: 8, },
              { value: 9, label: 9, },
            ],
          },
        ],
        groups: true
      })

      select.vm.pointer = select.vm.getOption(1)
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        ...select.vm.fg[2],
        index: 2,
      })
    })

    it('should set first enabled group if has no enabled next option nor next group groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: false },
              { value: 2, label: 2, disabled: true },
              { value: 3, label: 3, disabled: true },
            ],
          },
          {
            label: 'Second',
            disabled: true,
            options: [
              { value: 4, label: 4, },
              { value: 5, label: 5, },
              { value: 6, label: 6, },
            ],
          },
          {
            label: 'Third',
            disabled: true,
            options: [
              { value: 7, label: 7, disabled: true, },
              { value: 8, label: 8, disabled: true, },
              { value: 9, label: 9, disabled: true, },
            ],
          },
        ],
        groups: true
      })

      select.vm.pointer = select.vm.getOption(1)
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        ...select.vm.fg[0],
        index: 0,
      })
    })

    it('should point at created option when using groups', async () => {
      let select = createSelect({
        mode: 'multiple',
        searchable: true,
        createOption: true,
        value: [],
        options: [
          {
            label: 'First',
            options: [123,234,345],
          },
          {
            label: 'Second',
            options: [456,567,678],
          },
        ],
        groups: true
      })

      select.vm.search = '11'
      select.vm.forwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        label: '11',
        value: '11',
        __CREATE__: true
      })
    })

    it('should point at last option when create option is pointed and moves backward', async () => {
      let select = createSelect({
        mode: 'multiple',
        searchable: true,
        createOption: true,
        value: [],
        options: [
          {
            label: 'First',
            options: [123,234,345],
          },
          {
            label: 'Second',
            options: [11456,11567,11678],
          },
        ],
        groups: true
      })

      select.vm.search = '11'
      select.vm.forwardPointer()

      await nextTick()

      select.vm.backwardPointer()

      expect(select.vm.pointer).toStrictEqual({
        label: 11678,
        value: 11678,
      })
    })

    it('should point at last group when create option is pointed and moves backward and last group is empty', async () => {
      let select = createSelect({
        mode: 'multiple',
        searchable: true,
        createOption: true,
        value: [],
        options: [
          {
            label: 'First',
            options: [123,234,345],
          },
          {
            label: 'Second',
            options: [
              {
                label: '11456',
                value: '11456',
                disabled: true,
              }
            ],
          },
        ],
        groups: true
      })

      select.vm.search = '11'
      select.vm.forwardPointer()

      await nextTick()

      select.vm.backwardPointer()

      expect(select.vm.pointer).toStrictEqual(select.vm.fg[1])
      expect(select.vm.pointer.label).toBe('Second')
    })

    it('should point at created tag if at last item', async () => {
      let select = createSelect({
        mode: 'multiple',
        searchable: true,
        createOption: true,
        value: [],
        options: [
          {
            label: 'First',
            options: [123,234,345],
          },
          {
            label: 'Second',
            options: [11456,11567,11678],
          },
        ],
        groups: true
      })

      select.vm.search = '11'

      await nextTick()

      select.vm.pointer = select.vm.getOption(11678)
      select.vm.forwardPointer()

      expect(select.vm.pointer.label).toBe('11')
    })

    it('should point at created tag if at last group', async () => {
      let select = createSelect({
        mode: 'multiple',
        searchable: true,
        createOption: true,
        value: [],
        options: [
          {
            label: 'First',
            options: [123,234,345],
          },
          {
            label: 'Second',
            options: [
              {
                label: '11456',
                value: '11456',
                disabled: true,
              }
            ],
          },
        ],
        groups: true
      })

      select.vm.search = '11'

      await nextTick()

      select.vm.pointer = select.vm.fg[1]
      select.vm.forwardPointer()

      expect(select.vm.pointer.label).toBe('11')
    })

    it('should point at next group after full group is selected when hideSelected=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        hideSelected: true,
        closeOnSelect: false,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true
      })

      select.vm.pointer = select.vm.fg[0]
      select.vm.selectPointer()

      await nextTick()

      select.vm.forwardPointer()

      expect(select.vm.pointer.label).toBe('Second')
    })
  })

  describe('backwardPointer', () => {
    it('should set last enabled option if pointer is null groups=false', async () => {
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

    it('should set last enabled option if pointer is null groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: false },
              { value: 2, label: 2, disabled: false },
              { value: 3, label: 3, disabled: false },
            ],
          },
          {
            label: 'Second',
            options: [
              { value: 4, label: 4, },
              { value: 5, label: 5, },
              { value: 6, label: 6, disabled: true },
            ],
          },
        ],
        groups: true,
      })

      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(5))
    })

    it('should set last enabled group label if pointer is null and has no enabled last option groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: false },
              { value: 2, label: 2, disabled: false },
              { value: 3, label: 3, disabled: false },
            ],
          },
          {
            label: 'Second',
            options: [
              { value: 4, label: 4, disabled: true },
              { value: 5, label: 5, disabled: true },
              { value: 6, label: 6, disabled: true },
            ],
          },
        ],
        groups: true,
      })

      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        ...select.vm.fg[1],
        index: 1,
      })
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

    it('should set previous group label if has no prev enabled option and pointer is group groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: true },
              { value: 2, label: 2, disabled: true },
              { value: 3, label: 3, disabled: true },
            ],
          },
          {
            label: 'Second',
            options: [
              { value: 4, label: 4, disabled: true },
              { value: 5, label: 5, disabled: true },
              { value: 6, label: 6, disabled: true },
            ],
          },
        ],
        groups: true,
      })

      select.vm.pointer = select.vm.fg[1]
      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        ...select.vm.fg[0],
        index: 0,
      })
    })

    it('should set last group last enabled option if has no prev option nor group and pointer is group groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            disabled: true,
            options: [
              { value: 1, label: 1, disabled: true },
              { value: 2, label: 2, disabled: true },
              { value: 3, label: 3, disabled: true },
            ],
          },
          {
            label: 'Second',
            options: [
              { value: 4, label: 4, disabled: true },
              { value: 5, label: 5, disabled: false },
              { value: 6, label: 6, disabled: true },
            ],
          },
        ],
        groups: true,
      })

      select.vm.pointer = select.vm.fg[1]
      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(5))
    })

    it('should set last group header if has no prev option nor group nor last option in last group and pointer is group groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: true },
              { value: 2, label: 2, disabled: true },
              { value: 3, label: 3, disabled: true },
            ],
          },
          {
            label: 'Second',
            options: [
              { value: 4, label: 4, disabled: true },
              { value: 5, label: 5, disabled: true },
              { value: 6, label: 6, disabled: true },
            ],
          },
          {
            label: 'Third',
            disabled: true,
            options: [
              { value: 4, label: 4, disabled: true },
              { value: 5, label: 5, disabled: true },
              { value: 6, label: 6, disabled: true },
            ],
          },
        ],
        groups: true,
      })

      select.vm.pointer = select.vm.fg[0]
      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        ...select.vm.fg[1],
        index: 1,
      })
    })

    it('should set prev enabled option if pointer is not group groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: false },
              { value: 2, label: 2, disabled: true },
              { value: 3, label: 3, disabled: false },
            ],
          },
          {
            label: 'Second',
            options: [
              { value: 4, label: 4, disabled: true },
              { value: 5, label: 5, disabled: true },
              { value: 6, label: 6, disabled: true },
            ],
          },
        ],
        groups: true,
      })

      select.vm.pointer = select.vm.getOption(3)
      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))
    })

    it('should set group label if has no enabled prev option if pointer is not group groups=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [
          {
            label: 'First',
            options: [
              { value: 1, label: 1, disabled: true },
              { value: 2, label: 2, disabled: true },
              { value: 3, label: 3, disabled: false },
            ],
          },
          {
            label: 'Second',
            options: [
              { value: 4, label: 4, disabled: true },
              { value: 5, label: 5, disabled: true },
              { value: 6, label: 6, disabled: true },
            ],
          },
        ],
        groups: true,
      })

      select.vm.pointer = select.vm.getOption(3)
      select.vm.backwardPointer()

      await nextTick()

      expect(select.vm.pointer).toStrictEqual({
        ...select.vm.fg[0],
        index: 0,
      })
    })
  })

  describe('watch', () => {
    it('should set first option as pointer when search changes and searchable and has search value', async () => {
      let select = createSelect({
        value: null,
        options: ['v1','v2','v3'],
        searchable: true,
      })

      select.vm.search = 'v'

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption('v1'))
    })

    it('should not set first option as pointer when search changes and not searchable', async () => {
      let select = createSelect({
        value: null,
        options: ['v1','v2','v3'],
        searchable: false,
      })

      select.vm.search = 'v'

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(null)
    })

    it('should not set first option as pointer when search changes, searchable=true, showOptions=false', async () => {
      let select = createSelect({
        value: null,
        options: ['v1','v2','v3'],
        searchable: true,
        showOptions: false,
      })

      select.vm.search = 'v'

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(null)
    })

    it('should clear pointer when search changes and searchable and does not have search value', async () => {
      let select = createSelect({
        value: null,
        options: ['v1','v2','v3'],
        searchable: true,
      })

      select.vm.setPointer(select.vm.getOption('v2'))
      select.vm.search = ''

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(null)
    })
  })
})