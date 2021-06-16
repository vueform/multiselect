import { createSelect, getValue, keydown, destroy } from 'unit-test-helpers'
import { nextTick } from 'composition-api'

describe('useKeyboard', () => {
  describe('handleKeydown', () => {
    describe('backspace', () => {
      it('should not do anything when single', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        keydown(select, 'backspace')

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
      })
      
      it('should not do anything if search is not empty and not single', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1,2],
          options: [1,2,3],
          searchable: true,
        })

        select.vm.search = 'a'

        keydown(select, 'backspace')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1,2])
      })
      
      it('should not do anything if value is empty and not single', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [],
          options: [1,2,3],
          searchable: true,
        })

        keydown(select, 'backspace')

        await nextTick()

        expect(getValue(select)).toStrictEqual([])
      })
      
      it('should remove last element if search is empty and not single', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1,2],
          options: [1,2,3],
          searchable: true,
        })

        keydown(select, 'backspace')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })
    })

    describe('enter', () => {
      it('should prevent on enter', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        let preventMock = jest.fn()

        select.vm.handleKeydown({
          preventDefault: preventMock,
          keyCode: 13,
        })

        expect(preventMock).toHaveBeenCalled()
      })

      it('should select pointer', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toStrictEqual(2)
      })

      it('should not select pointer when mode=tags and addTagOn does not contain enter', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [],
          options: [1,2,3],
          addTagOn: ['space']
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toStrictEqual([])
      })

      it('should select pointer when mode=tags and addTagOn does contain enter', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [],
          options: [1,2,3],
          addTagOn: ['space', 'enter']
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toStrictEqual([2])
      })
    })

    describe('esc', () => {
      it('should blur', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        }, {
          attach: true,
        })

        select.element.focus()
        expect(select.vm.isOpen).toBe(true)

        await nextTick()

        keydown(select, 'esc')
        expect(select.vm.isOpen).toBe(false)

        destroy(select)
      })
    })

    describe('space', () => {
      it('should select pointer if not searchable and single', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toBe(2)
      })

      it('should not select pointer if searchable and single', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
          searchable: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toBe(1)
      })

      it('should select pointer if not searchable and multiple', async () => {
        let select = createSelect({
          mode: 'multiple',
          value: [1],
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1,2])
      })

      it('should not select pointer if searchable and multiple', async () => {
        let select = createSelect({
          mode: 'multiple',
          value: [1],
          options: [1,2,3],
          searchable: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should select pointer if not searchable and tags and addTagOn contains space', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: ['space'],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1,2])
      })

      it('should select pointer if searchable and tags and addTagOn contains space', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          searchable: true,
          addTagOn: ['space'],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1, 2])
      })

      it('should not select pointer if not searchable and tags and addTagOn does not contain space', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: ['enter'],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not select pointer if searchable and tags and addTagOn does not contain space', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          searchable: true,
          addTagOn: ['enter'],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })
    })

    describe('up', () => {
      it('should should move to previous pointer when openDirection=bottom', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(3))

        keydown(select, 'up')
        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))
      })

      it('should should move to next pointer when openDirection=top', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
          openDirection: 'top',
        })

        select.vm.setPointer(select.vm.getOption(1))

        keydown(select, 'up')
        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))
      })
    })

    describe('down', () => {
      it('should should move to next pointer when openDirection=bottom', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(1))

        keydown(select, 'down')
        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))
      })

      it('should should move to previous pointer when openDirection=top', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
          openDirection: 'top',
        })

        select.vm.setPointer(select.vm.getOption(3))

        keydown(select, 'down')
        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))
      })
    })

    describe('semicolon', () => {
      it('should not do anything when not tags', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { keyCode: 186 })

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
      })

      it('should not do anything when if mode=tags and addTagOn contains ; but createTag is false', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: [';'],
          createTag: false,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { keyCode: 186 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not do anything when if mode=tags and addTagOn does not contain ;', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: [','],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { keyCode: 186 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should select pointer if mode=tags and addTagOn contains ;', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: [';'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { keyCode: 186 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1,2])
      })
    })

    describe('comma', () => {
      it('should not do anything when not tags', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { keyCode: 188 })

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
      })

      it('should not do anything when if mode=tags and addTagOn contains , but createTag is false', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: [','],
          createTag: false,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { keyCode: 188 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not do anything when if mode=tags and addTagOn does not contain ,', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: [';'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { keyCode: 188 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should select pointer if mode=tags and addTagOn contains ,', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: [','],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { keyCode: 188 })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1,2])
      })
    })
  })
})