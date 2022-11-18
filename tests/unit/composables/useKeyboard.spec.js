import { createSelect, getValue, keydown, keyup, destroy } from 'unit-test-helpers'
import { nextTick } from 'vue'

jest.useFakeTimers()

describe('useKeyboard', () => {

  describe('preparePointer', () => {
    it('should set pointer manually when showOptions are false and should add tag', async () => {
      let select = createSelect({
        value: null,
        options: [],
        mode: 'tags',
        searchable: true,
        createOption: true,
        showOptions: false,
      })

      select.vm.search = 'lorem'

      select.vm.preparePointer()

      select.vm.handleKeydown({ key: 'Enter', preventDefault: () => {}})
    })
  })

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
          key: 'Enter',
        })

        expect(preventMock).toHaveBeenCalled()
      })

      it('should remove last tag if focused on enter', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [1,2,3],
        }, {
          attach: true,
        })

        keydown(select, 'left')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([1,2])

        destroy(select)
      })

      it('should put focus to multiselect wrapper when last tag removed on enter', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [1],
        }, {
          attach: true,
        })

        keydown(select, 'left')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([])
        expect(document.activeElement).toEqual(select.vm.wrapper)

        destroy(select)
      })

      it('should put focus to input when last tag removed when searchable on enter', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [1],
          searchable: true,
        }, {
          attach: true,
        })

        keydown(select, 'left')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([])
        expect(document.activeElement).toEqual(select.vm.input)

        destroy(select)
      })

      it('should remove middle tag if focused on enter', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [1,2,3],
        }, {
          attach: true,
        })

        keydown(select, 'left')
        keydown(select, 'left')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([1,3])

        destroy(select)
      })

      it('should remove first tag if focused on enter', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [1,2,3],
        }, {
          attach: true,
        })

        keydown(select, 'left')
        keydown(select, 'left')
        keydown(select, 'left')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([2,3])

        destroy(select)
      })


      it('should select pointer if there are no tags', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [],
        }, {
          attach: true,
        })

        select.vm.setPointer(select.vm.getOption(1))

        keydown(select, 'left')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([1])

        destroy(select)
      })

      it('should select pointer if right is pressed', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [],
        }, {
          attach: true,
        })

        select.vm.setPointer(select.vm.getOption(1))

        keydown(select, 'left')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([1])

        destroy(select)
      })

      it('should remove middle tag if navigated with right on enter', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [1,2,3],
        }, {
          attach: true,
        })

        keydown(select, 'left')
        keydown(select, 'left')
        keydown(select, 'left')
        keydown(select, 'right')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([1,3])

        destroy(select)
      })

      it('should remove last tag if navigated with right on enter', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [1,2,3],
        }, {
          attach: true,
        })

        keydown(select, 'left')
        keydown(select, 'left')
        keydown(select, 'left')
        keydown(select, 'right')
        keydown(select, 'right')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([1,2])

        destroy(select)
      })

      it('should not remove anything and select pointer if navigated with right', async () => {
        let select = createSelect({
          mode: 'tags',
          options: [1,2,3],
          value: [],
        }, {
          attach: true,
        })

        select.vm.setPointer(select.vm.getOption(1))

        keydown(select, 'left')
        keydown(select, 'left')
        keydown(select, 'left')
        keydown(select, 'right')
        keydown(select, 'right')
        keydown(select, 'right')
        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toEqual([1])

        destroy(select)
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

      it('should not select pointer when mode=tags and createTag and addOptionTag does not contain enter', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [],
          options: [1,2,3],
          addTagOn: ['space'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toStrictEqual([])
      })

      it('should select pointer when mode=tags and createTag and addOptionTag does contain enter', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [],
          options: [1,2,3],
          addTagOn: ['space', 'enter'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toStrictEqual([2])
      })

      it('should not select pointer when mode=single and createOption and addOptionOn does not contain enter', async () => {
        let select = createSelect({
          mode: 'single',
          value: null,
          options: [1,2,3],
          addOptionOn: ['space'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toStrictEqual(null)
      })

      it('should select pointer when mode=single and createOption and addOptionOn does contain enter', async () => {
        let select = createSelect({
          mode: 'single',
          value: null,
          options: [1,2,3],
          addOptionOn: ['space', 'enter'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'enter')

        await nextTick()

        expect(getValue(select)).toStrictEqual(2)
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

        select.vm.mouseClicked = true
        select.vm.wrapper.focus()
        expect(select.vm.isOpen).toBe(true)

        await nextTick()

        keydown(select, 'esc')
        jest.advanceTimersByTime(1)
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

      it('should select pointer if not searchable and createTag and tags and addTagOn contains space', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: ['space'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1,2])
      })

      it('should select pointer if not searchable and createOption and single and addOptionOn contains space', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: ['space'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual(2)
      })

      it('should select pointer if searchable and createTag and tags and addTagOn contains space', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          searchable: true,
          addTagOn: ['space'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1, 2])
      })

      it('should select pointer if searchable and createOption and single and addOptionOn contains space', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          searchable: true,
          addOptionOn: ['space'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual(2)
      })

      it('should not select pointer if not searchable and createTag and tags and addTagOn does not contain space', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: ['enter'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not select pointer if not searchable and createOption and single and addOptionOn does not contain space', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: ['enter'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
      })

      it('should not select pointer if searchable and createTag and tags and addTagOn does not contain space', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          searchable: true,
          addTagOn: ['enter'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not select pointer if searchable and createOption and single and addOptionOn does not contain space', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          searchable: true,
          addOptionOn: ['enter'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, 'space')

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
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

      it('should should move to last pointer when openDirection=top', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
          openDirection: 'top',
        })

        select.vm.setPointer(select.vm.getOption(1))

        keydown(select, 'up')
        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(3))
      })

      it('should not should move to next pointer when showOptions=false', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
          showOptions: false,
        })

        select.vm.setPointer(select.vm.getOption(1))

        keydown(select, 'up')
        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))
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

      it('should should move to next pointer when openDirection=top', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
          openDirection: 'top',
        })

        select.vm.setPointer(select.vm.getOption(1))

        keydown(select, 'down')
        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))
      })

      it('should not should move to next pointer when showOptions=false', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
          showOptions: false,
        })

        select.vm.setPointer(select.vm.getOption(1))

        keydown(select, 'down')
        expect(select.vm.pointer).toStrictEqual(select.vm.getOption(1))
      })
    })

    describe('semicolon', () => {
      it('should not do anything when not tags', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: ';' })

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

        keydown(select, { key: ';' })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not do anything when if mode=single and addOptionOn contains ; but createOption is false', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: [';'],
          createOption: false,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: ';' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
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

        keydown(select, { key: ';' })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not do anything when if mode=tags and addOptionOn does not contain ;', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: [','],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: ';' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
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

        keydown(select, { key: ';' })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1,2])
      })

      it('should select pointer if mode=single and addOptionOn contains ;', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: [';'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: ';' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(2)
      })
    })

    describe('comma', () => {
      it('should not do anything when not tags', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: ',' })

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

        keydown(select, { key: ',' })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not do anything when if mode=single and addOptionOn contains , but createOption is false', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: [','],
          createOption: false,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: ',' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
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

        keydown(select, { key: ',' })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not do anything when if mode=single and addOptionOn does not contain ,', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: [';'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: ',' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
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

        keydown(select, { key: ',' })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1,2])
      })

      it('should select pointer if mode=single and addTagOn contains ,', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addTagOn: [','],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: ',' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(2)
      })
    })

    describe('tab', () => {
      it('should not do anything when not tags', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: 'Tab' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
      })

      it('should not do anything when if mode=tags and addTagOn contains tab but createTag is false', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: ['tab'],
          createTag: false,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: 'Tab' })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not do anything when if mode=single and addOptionOn contains tab but createOption is false', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: ['tab'],
          createOption: false,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: 'Tab' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
      })

      it('should not do anything when if mode=tags and addTagOn does not contain tab', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: ['enter'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: 'Tab' })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1])
      })

      it('should not do anything when if mode=single and addOptionOn does not contain tab', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: ['enter'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: 'Tab' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(1)
      })

      it('should select pointer if mode=tags and addTagOn contains tab', async () => {
        let select = createSelect({
          mode: 'tags',
          value: [1],
          options: [1,2,3],
          addTagOn: ['tab'],
          createTag: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: 'Tab' })

        await nextTick()

        expect(getValue(select)).toStrictEqual([1,2])
      })

      it('should select pointer if mode=single and addOptionOn contains tab', async () => {
        let select = createSelect({
          mode: 'single',
          value: 1,
          options: [1,2,3],
          addOptionOn: ['tab'],
          createOption: true,
        })

        select.vm.setPointer(select.vm.getOption(2))

        keydown(select, { key: 'Tab' })

        await nextTick()

        expect(getValue(select)).toStrictEqual(2)
      })
    })

    describe('general', () => {
      it('should emit keydown event', async () => {
        let select = createSelect({
          value: 1,
          options: [1,2,3],
        })

        keydown(select, 'backspace')

        await nextTick()

        expect(select.emitted('keydown').length).toBe(1)
      })
    })
  })

  describe('left', () => {
    it('should stay at the first item when first is selected and left is pressed', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [1],
      }, {
        attach: true,
      })

      keydown(select, 'left')
      keydown(select, 'left')

      await nextTick()

      expect(document.activeElement).toEqual(select.vm.$el.querySelector('[data-tags] > *:first-of-type'))

      destroy(select)
    })
  })

  describe('right', () => {
    it('should focus input when searchable and right is pressed on last element', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [1],
        searchable: true,
      }, {
        attach: true,
      })

      keydown(select, 'left')
      keydown(select, 'right')

      await nextTick()

      expect(document.activeElement).toEqual(select.vm.input)

      destroy(select)
    })

    it('should focus multiselect when right is pressed on last element', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [1],
      }, {
        attach: true,
      })

      keydown(select, 'left')
      keydown(select, 'right')

      await nextTick()

      expect(document.activeElement).toEqual(select.vm.wrapper)

      destroy(select)
    })

    it('should keep focus on multiselect when right is pressed', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [1],
      }, {
        attach: true,
      })

      select.vm.wrapper.focus()
      keydown(select, 'right')

      await nextTick()

      expect(document.activeElement).toEqual(select.vm.wrapper)

      destroy(select)
    })
  })

  describe('handleKeyup', () => {
    it('should emit keyup event', async () => {
      let select = createSelect({
        value: 1,
        options: [1,2,3],
      }, {
        attach: true
      })

      keyup(select, 'backspace')

      await nextTick()

      expect(select.emitted('keyup').length).toBe(1)
    })
  })
})