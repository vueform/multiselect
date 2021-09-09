import normalize from './../../../src/utils/normalize'

describe('normalize', () => {
  it('should have strict=true by default', () => {
    expect(normalize('ASD')).toBe('asd')
  })
})