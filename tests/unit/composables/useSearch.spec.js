import { createSelect } from 'unit-test-helpers'
import { nextTick } from 'vue'

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
        inputType: 'search',
      })

      expect(select.vm.input.type).toBe(select.vm.inputType)
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

  describe('handleKeypress', () => {
    it('should prevent if char does not match regex', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
        regex: /\d/
      })

      let preventMock = jest.fn()

      select.vm.handleKeypress({
        key: 'a',
        preventDefault: preventMock
      })

      expect(preventMock).toHaveBeenCalled()
    })

    it('should prevent if char does not match regex string', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
        regex: '\\d'
      })

      let preventMock = jest.fn()

      select.vm.handleKeypress({
        key: 'a',
        preventDefault: preventMock
      })

      expect(preventMock).toHaveBeenCalled()
    })

    it('should not prevent if char does match regex', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
        regex: /\d/
      })

      let preventMock = jest.fn()

      select.vm.handleKeypress({
        key: '1',
        preventDefault: preventMock
      })

      expect(preventMock).not.toHaveBeenCalled()
    })

    it('should not prevent if no regex', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
      })

      let preventMock = jest.fn()

      select.vm.handleKeypress({
        key: '1',
        preventDefault: preventMock
      })

      expect(preventMock).not.toHaveBeenCalled()
    })
  })

  describe('handlePaste', () => {
    it('should emit paste event on @paste', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
      })

      const e = new Event('paste')

      select.vm.input.dispatchEvent(e)

      await nextTick()

      expect(select.emitted('paste')[0][0]).toBe(e)
    })

    it('should prevent if paste data does not match regex', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
        regex: /\d/
      })

      let preventMock = jest.fn()

      select.vm.handlePaste({
        clipboardData: {
          getData: () => 'value'
        },
        preventDefault: preventMock
      })

      expect(preventMock).toHaveBeenCalled()
    })

    it('should prevent if paste data does not match regex string', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
        regex: '\\d'
      })

      let preventMock = jest.fn()

      select.vm.handlePaste({
        clipboardData: {
          getData: () => 'value'
        },
        preventDefault: preventMock
      })

      expect(preventMock).toHaveBeenCalled()
    })

    it('should not prevent if paste data does match regex', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
        regex: /\d/
      })

      let preventMock = jest.fn()

      select.vm.handlePaste({
        clipboardData: {
          getData: () => '123'
        },
        preventDefault: preventMock
      })

      expect(preventMock).not.toHaveBeenCalled()
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