import { createSelect, destroy, keyup, keydown, getValue } from 'unit-test-helpers'
import { nextTick } from 'vue'

export default function (mode = 'single') {
  describe('search', () => {
    it('should render search if searchable', () => {
      let select = createSelect({
        mode: mode,
        searchable: true,
      }, {
        attach: true,
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
      }, {
        attach: true,
      })

      expect(select.find('input').element).toBeVisible()

      destroy(select)
    })
  })
}