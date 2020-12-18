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
    it('should be equal to length of search with ch suffix', () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
      })

      select.vm.search = 'value'

      expect(select.vm.tagsSearchWidth).toBe('5ch')
    })

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

  describe('blurSearch', () => {
    it('should blur search input if searchable', () => {
      let blurMock = jest.fn()

      let select = createSelect({
        searchable: true,
      })

      select.vm.input.blur = blurMock

      select.vm.blurSearch()

      expect(blurMock).toHaveBeenCalled()
    })

    it('should not blur search input if not searchable', async () => {
      let blurMock = jest.fn()

      let select = createSelect({
        searchable: true,
      })

      select.vm.input.blur = blurMock

      select.vm.$parent.props.searchable = false

      await nextTick()

      select.vm.blurSearch()

      expect(blurMock).not.toHaveBeenCalled()
    })
  })

  describe('handleSearchBackspace', () => {
    it('should stop propagation if search is not empty', () => {
      let stopPropagationMock = jest.fn()

      let select = createSelect()

      select.vm.search = ''

      select.vm.handleSearchBackspace({
        stopPropagation: stopPropagationMock
      })

      expect(stopPropagationMock).not.toHaveBeenCalled()
    })

    it('should stop propagation if search is empty', () => {
      let stopPropagationMock = jest.fn()

      let select = createSelect()

      select.vm.search = 'value'

      select.vm.handleSearchBackspace({
        stopPropagation: stopPropagationMock
      })

      expect(stopPropagationMock).toHaveBeenCalled()
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