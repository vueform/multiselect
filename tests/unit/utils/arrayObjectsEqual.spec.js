import arrayObjectsEqual from './../../../src/utils/arrayObjectsEqual'

describe('arrayObjectsEqual', () => {
  it('should return false if arrays are not same length', () => {
    expect(arrayObjectsEqual([1],[1,2])).toBe(false)
  })
})