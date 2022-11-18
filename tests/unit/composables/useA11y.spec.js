import { createSelect, destroy } from 'unit-test-helpers'
import { nextTick } from 'vue'

jest.useFakeTimers()

describe('useA11y', () => {
  describe('ariaAssist', () => {
    it('should contain id when defined', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
        id: 'id'
      })

      expect(select.vm.ariaAssist).toBe('id-assist')
    })
  })

  describe('ariaControls', () => {
    it('should contain id when defined', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
        id: 'id'
      })

      expect(select.vm.ariaControls).toBe('id-multiselect-options')
    })

    it('should not contain id when not defined', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
      })

      expect(select.vm.ariaControls).toBe('multiselect-options')
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

  describe('ariaLabel', () => {
    it('should be empty if not selected', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
      })

      expect(select.vm.ariaLabel).toBe('')
    })
  })

  describe('arias', () => {
    it('should add aria-labelledby', () => {
      const select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
        id: 'id',
        aria: {
          'aria-labelledby': 'a'
        }
      })

      expect(select.vm.arias['aria-labelledby']).toBe('id-assist a')
    })

    it('should add aria-label', () => {
      const select = createSelect({
        value: 1,
        options: [1,2,3],
        searchable: true,
        id: 'id',
        aria: {
          'aria-label': 'a'
        }
      })

      expect(select.vm.arias['aria-label']).toBe('1, a')
    })
  })
})