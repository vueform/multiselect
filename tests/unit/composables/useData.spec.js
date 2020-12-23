import { createSelect } from 'unit-test-helpers'

describe('useData', () => {
  it('should emit input, change & update:modelValue event on `update`', () => {
    const select = createSelect({
      options: [
        { v: 0, label: 0 },
        { v: 1, label: 1 },
        { v: 2, label: 2 },
      ],
      valueProp: 'v'
    })

    select.vm.update({v: 1})

    expect(select.emitted('input')[0][0]).toEqual(1)
    expect(select.emitted('change')[0][0]).toEqual(1)
    expect(select.emitted('update:modelValue')[0][0]).toEqual(1)
  })
})