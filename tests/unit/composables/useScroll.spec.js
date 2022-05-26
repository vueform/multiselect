import { nextTick } from 'vue'
import { createSelect } from 'unit-test-helpers'
import flushPromises from 'flush-promises'

jest.useFakeTimers()

describe('useScroll', () => {
  const observe = jest.fn()
  const disconnect = jest.fn()

  beforeEach(() => {
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      disconnect,
    }))
  })

  afterEach(() => {
    observe.mockRestore()
    disconnect.mockRestore()
  })

  describe('observer', () => {
    it('should be null by default', () => {
      const mock = jest.fn()

      window.IntersectionObserver = jest.fn(() => {
        mock()
      })

      let select = createSelect({
        value: null,
        options: [1,2,3]
      })

      expect(mock).toHaveBeenCalled()
    })
  })

  describe('observe', () => {
    it('should observe if has infinite, opens && options is longer then limit', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        infinite: true,
        limit: 1,
      })

      select.vm.open()

      await nextTick()

      expect(observe).toHaveBeenCalledTimes(1)
    })

    it('should disconnect if has infinite && closes', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        infinite: true,
        limit: 1,
      })

      select.vm.open()

      await nextTick()

      select.vm.close()

      await nextTick()

      expect(disconnect).toHaveBeenCalledTimes(1)
    })

    it('should observe if has infinite, search changes && options is longer then limit', async () => {
      let select = createSelect({
        value: null,
        options: [1,11,111],
        infinite: true,
        limit: 1,
        searchable: true,
      })

      select.vm.open()
      await nextTick()

      expect(observe).toHaveBeenCalledTimes(1)

      select.vm.search = '1'
      await nextTick()

      expect(observe).toHaveBeenCalledTimes(2)
    })
  })
})