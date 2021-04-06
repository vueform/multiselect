import { createSelect, destroy, keyup, keydown, getValue } from 'unit-test-helpers'
import { nextTick } from 'vue'

export default function (mode = 'single') {
  describe('search', () => {
    it('should render search if searchable', () => {
      let select = createSelect({
        mode: mode,
        searchable: true,
      })

      expect(select.find('input').element).toBeVisible()
    })

    it('should not render search if not searchable', () => {
      let select = createSelect({
        mode: mode,
        searchable: false,
      })

      expect(select.find('input').exists()).toBe(false)
    })

    it('should render search even if it has value', () => {
      let select = createSelect({
        mode: mode,
        value: mode == 'single' ? 1 : [1],
        options: [1,2,3],
        searchable: true,
      })

      expect(select.find('input').element).toBeVisible()
    })

    it('should open on focus search', () => {
      let select = createSelect({
        mode: mode,
        searchable: true,
      })

      select.find('input').trigger('focus')

      expect(select.vm.isOpen).toBe(true)
    })
    
    it('should close on blur search', () => {
      let select = createSelect({
        mode: mode,
        searchable: true,
      })

      select.find('input').trigger('focus')
      select.find('input').trigger('blur')

      expect(select.vm.isOpen).toBe(false)
    })

    it('should close, clear pointer and blur on escape on search', async () => {
      let blurMock = jest.fn()

      let select = createSelect({
        mode: mode,
        searchable: true,
        options: [1,2,3],
        value: mode == 'single' ? 1 : [1],
      })

      select.vm.pointer = select.vm.getOption(1)
      select.vm.open()
      select.find('input').element.blur = blurMock

      keyup(select.find('input'), 'escape')

      await nextTick()

      expect(select.vm.pointer).toBe(null)
      expect(select.vm.isOpen).toBe(false)
      expect(blurMock).toHaveBeenCalled()
    })

    it('should set pointer on up&down and select with enter on search', async () => {
      let select = createSelect({
        mode: mode,
        searchable: true,
        options: [1,2,3],
        value: null,
      }, {
        attach: true,
      })

      select.vm.open()
      keydown(select.find('input'), 'down')
      keydown(select.find('input'), 'down')
      keydown(select.find('input'), 'down')
      keydown(select.find('input'), 'up')
      keyup(select.find('input'), 'enter')

      await nextTick()

      expect(getValue(select)).toStrictEqual(mode == 'single' ? 2 : [2])

      destroy(select)
    })

    if (mode !== 'single') {
      it('should not remove last element on backspace', async () => {
        let select = createSelect({
          mode: mode,
          options: [1,2,3],
          value: [0,1],
          searchable: true,
        })

        select.vm.search = 'value'

        keydown(select.find('input'), 'backspace')

        await nextTick()

        expect(getValue(select)).toStrictEqual([0,1])
      })
    }
  })
}