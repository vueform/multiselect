import { createSelect } from 'unit-test-helpers'
import { nextTick } from 'composition-api'

describe('useSearch', () => {
  describe('search', () => {
    it('should be null by default', () => {
      let select = createSelect()

      expect(select.vm.search).toBe(null)
    })
  })
  
  describe('input', () => {
    it('should equal to search input', () => {
      let select = createSelect({
        searchable: true,
      })

      expect(select.vm.input.type).toBe('text')
    })
  })

  describe('tagsSearchWidth', () => {
    it('should be 100% if search and value are empty', () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [],
      })

      expect(select.vm.tagsSearchWidth).toBe('100%')
    })

    it('should be 1ch if search is but value isn\'t empty', () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [1],
      })

      expect(select.vm.tagsSearchWidth).toBe('1ch')
    })
  })

  describe('clearSearch', () => {
    it('should clear search', () => {
      let select = createSelect()

      select.vm.search = 'value'

      select.vm.clearSearch()

      expect(select.vm.search).toBe('')
    })
  })

  describe('handleSearchInput', () => {
    it('should set search value on input', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
      })

      select.vm.input.value = 'aaa'
      select.vm.input.dispatchEvent(new Event('input'))

      await nextTick()

      expect(select.vm.search).toBe('aaa')
    })
  })

  describe('watch', () => {
    it('should emit search-change when search changes', async () => {
      let select = createSelect()

      select.vm.search = 'value'

      await nextTick()

      expect(select.emitted('search-change')[0][0]).toBe('value')
    })
  })
})