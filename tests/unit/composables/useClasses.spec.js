import { createSelect } from 'unit-test-helpers'
import { nextTick } from 'composition-api'

describe('useClasses', () => {
  describe('classList', () => {
    it('should contain default classes', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
      })

      expect(select.vm.classList.container).toStrictEqual(['multiselect'])
    })

    it('should override default classes', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
        classes: {
          container: 'not-multiselect'
        }
      })

      expect(select.vm.classList.container).toStrictEqual(['not-multiselect'])
    })

    it('should add containerOpenTop to container when open and direction is top', async () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
        openDirection: 'top'
      })

      select.vm.open()

      await nextTick()

      expect(select.vm.classList.container).toStrictEqual(['multiselect', 'is-open-top'])
    })

    it('should add optionSelectedDisabled to option when option is selected and disabled', async () => {
      const select = createSelect({
        value: 1,
        options: [
          {
            value: 1,
            label: 'label',
            disabled: true,
          }
        ],
      })

      expect(select.vm.classList.option(select.vm.getOption(1))).toStrictEqual(['multiselect-option', 'is-selected is-disabled'])
    })

    it('should add groupLabelSelectedDisabled to groupLabel when option is selected and disabled', async () => {
      const select = createSelect({
        mode: 'multiple',
        value: [1,2,3],
        groups: true,
        options: [
          {
            label: 'First',
            disabled: true,
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
      })

      expect(select.vm.classList.groupLabel(select.vm.fg[0])).toStrictEqual(['multiselect-group-label', 'is-selected is-disabled', 'is-pointable'])
    })
  })
})
