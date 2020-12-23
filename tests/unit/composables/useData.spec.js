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

  it('should update internalValue when single', () => {
    const select = createSelect({
      options: [
        { value: 0, label: 0 },
        { value: 1, label: 1 },
        { value: 2, label: 2 },
      ],
    })

    select.vm.update(null)
    expect(select.vm.internalValue).toStrictEqual({})

    select.vm.update(undefined)
    expect(select.vm.internalValue).toStrictEqual({})

    select.vm.update(false)
    expect(select.vm.internalValue).toStrictEqual({})

    select.vm.update({ value: 1, label: 2 })
    expect(select.vm.internalValue).toStrictEqual({ value: 1, label: 2 })
  })

  it('should update internalValue when multiple', () => {
    const select = createSelect({
      mode: 'multiple',
      options: [
        { value: 0, label: 0 },
        { value: 1, label: 1 },
        { value: 2, label: 2 },
      ],
    })

    select.vm.update(null)
    expect(select.vm.internalValue).toStrictEqual([])

    select.vm.update(undefined)
    expect(select.vm.internalValue).toStrictEqual([])

    select.vm.update(false)
    expect(select.vm.internalValue).toStrictEqual([])

    select.vm.update([{ value: 1, label: 2 }])
    expect(select.vm.internalValue).toStrictEqual([{ value: 1, label: 2 }])
  })
})