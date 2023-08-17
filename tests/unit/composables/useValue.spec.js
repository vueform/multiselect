import { createSelect } from 'unit-test-helpers'
import { nextTick, ref } from 'vue'

describe('useValue', () => {
  describe('modelValue', () => {
    it('should keep reference to original v-model', async () => {
      const vmodel = ref(undefined)
      const select = createSelect({ value: vmodel })
      expect(select.vm.ev).toBeUndefined()

      vmodel.value = 'new value'
      await nextTick()
      expect(select.vm.ev).toBe('new value')
    })
  })
})