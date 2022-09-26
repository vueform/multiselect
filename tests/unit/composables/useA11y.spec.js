import { createSelect, destroy } from 'unit-test-helpers'
import { nextTick } from 'vue'

jest.useFakeTimers()

describe('useA11y', () => {
  describe('ariaOwns', () => {
    it('should contain id when defined', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
        id: 'id'
      })

      expect(select.vm.ariaOwns).toBe('id-multiselect-options')
    })

    it('should not contain id when not defined', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
      })

      expect(select.vm.ariaOwns).toBe('multiselect-options')
    })
  })

  describe('ariaActiveDescendant', () => {
    it('should contain pointed', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
      })

      select.vm.setPointer({ value: 1, label: 1 })

      expect(select.vm.ariaActiveDescendant).toBe('multiselect-option-1')
    })
    
    it('should contain pointed with id', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
        id: 'id'
      })

      select.vm.setPointer({ value: 1, label: 1 })

      expect(select.vm.ariaActiveDescendant).toBe('id-multiselect-option-1')
    })
    
    it('should be undefined if not pointed', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
        id: 'id'
      })

      expect(select.vm.ariaActiveDescendant).toBe(undefined)
    })
  })

  describe('ariaPlaceholder', () => {
    it('should contain placeholder', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
        placeholder: 'Placeholder'
      })

      expect(select.vm.ariaPlaceholder).toBe('Placeholder')
    })
  })

  describe('ariaOptionId', () => {
    it('should return value', () => {
      const select = createSelect({
        value: [1],
        options: [1,2,3],
      })

      expect(select.vm.ariaOptionId({
        value: 1, label: 1
      })).toBe('multiselect-option-1')
    })
    
    it('should return value with id', () => {
      const select = createSelect({
        value: [1],
        options: [1,2,3],
        id: 'id'
      })

      expect(select.vm.ariaOptionId({
        value: 1, label: 1
      })).toBe('id-multiselect-option-1')
    })
  })

  describe('ariaGroupId', () => {
    it('should return value', () => {
      const select = createSelect({
        mode: 'multiple',
        value: [1],
        groups: true,
        options: [
          {
            label: 'First',
            options: [1,2,3]
          },
          {
            label: 'Second',
            options: [4,5,6]
          },
        ],
      })

      expect(select.vm.ariaGroupId(select.vm.fg[1])).toBe('multiselect-group-1')
    })
    
    it('should return value with id', () => {
      const select = createSelect({
        mode: 'multiple',
        value: [1],
        groups: true,
        options: [
          {
            label: 'First',
            options: [1,2,3]
          },
          {
            label: 'Second',
            options: [4,5,6]
          },
        ],
        id: 'id'
      })

      expect(select.vm.ariaGroupId(select.vm.fg[1])).toBe('id-multiselect-group-1')
    })
  })

  describe('ariaOptionLabel', () => {
    it('should return option label', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
      })

      expect(select.vm.ariaOptionLabel({
        value: 1, label: 1
      })).toBe('1')
    })
  })

  describe('ariaGroupLabel', () => {
    it('should return group label', () => {
      const select = createSelect({
        value: null,
        groups: true,
        options: [
          {
            label: 'a',
            options: [1,2,3]
          },
          {
            label: 'b',
            options: [4,5,6]
          },
        ],
      })

      expect(select.vm.ariaGroupLabel({
        label: 'a',
        options: [1,2,3]
      })).toBe('a')
    })
  })
})