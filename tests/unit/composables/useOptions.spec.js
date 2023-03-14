import { createSelect, getValue, destroy, $set, findAll } from 'unit-test-helpers'
import { toBeVisible } from '@testing-library/jest-dom/matchers'
import { nextTick } from 'vue'
import flushPromises from 'flush-promises'

expect.extend({toBeVisible})

jest.useFakeTimers()

describe('useOptions', () => {
  describe('offset', () => {
    it('should be 10 if infinite=true & limit=udnefined', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        infinite: true,
      })

      expect(select.vm.offset).toStrictEqual(10)
    })
    it('should be limit if infinite=true & limit=20', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        infinite: true,
        limit: 20,
      })

      expect(select.vm.offset).toStrictEqual(20)
    })
  })

  describe('fo', () => {
    it('should be an empty array of options not defined', () => {
      let select = createSelect()

      expect(select.vm.fo).toStrictEqual([])
    })

    it('should be and empty array if resolved options has no value', async () => {
      let select = createSelect({
        options: async () => {
          return new Promise((resolve, reject) => {
            resolve(false)
          })
        }
      })

      await flushPromises()

      expect(select.vm.fo).toStrictEqual([])
    })

    it('should be an array of objects if items is a plain array', () => {
      let select = createSelect({
        options: [1,2,3],
        trackBy: 'a',
        label: 'b',
        valueProp: 'v'
      })

      expect(select.vm.fo).toStrictEqual([
        { v: 1, a: 1, b: 1 },
        { v: 2, a: 2, b: 2 },
        { v: 3, a: 3, b: 3 },
      ])
    })

    it('should be an array of objects if items is a plain object', () => {
      let select = createSelect({
        options: {
          0: 1,
          1: 2,
          2: 3,
        },
        trackBy: 'a',
        label: 'b',
        valueProp: 'v'
      })

      expect(select.vm.fo).toStrictEqual([
        { v: '0', a: 1, b: 1 },
        { v: '1', a: 2, b: 2 },
        { v: '2', a: 3, b: 3 },
      ])
    })

    it('should reverse the options', () => {
      let select = createSelect({
        options: [1,2,3],
        reverse: true,
      })

      expect(select.vm.fo).toStrictEqual([
        { value: 3, label: 3 },
        { value: 2, label: 2 },
        { value: 1, label: 1 },
      ])
    })

    it('should append createdOption to `fo` when createTag true', () => {
      const select = createSelect({
        mode: 'tags',
        createTag: true,
        value: [],
        valueProp: 'v'
      })

      select.vm.search = 'new-tag'

      expect(select.vm.fo[0].v).toStrictEqual('new-tag')
    })

    it('should not append createdOption to `fo` when if it already exists', () => {
      const select = createSelect({
        mode: 'tags',
        createTag: true,
        options: [
          'tag1', 'tag2', 'tag3'
        ],
        value: [],
      })

      select.vm.search = 'tag2'

      expect(select.vm.fo).toStrictEqual([
        { value: 'tag2', label: 'tag2' }
      ])
    })

    it('should not append createdOption to `fo` when if it already exists and it\'s a number', () => {
      const select = createSelect({
        mode: 'tags',
        createTag: true,
        options: [
          1, 2, 3
        ],
        value: [],
      })

      select.vm.search = '1'

      expect(select.vm.fo).toStrictEqual([
        { value: 1, label: 1 }
      ])
    })

    it('should contain only options with normalized labels that match normalized search, strict=true, trackBy=undefined', () => {
      const select = createSelect({
        options: [
          { value: 0, name: 'Value0', },
          { value: 1, name: 'Value1', },
          { value: 2, name: 'Value2', }
        ],
        label: 'name',
      })

      select.vm.search = 'VALUE1'

      expect(select.vm.fo.length).toBe(1)
      expect(select.vm.fo[0].name).toBe('Value1')
    })

    it('should contain only options with normalized labels that match normalized search, strict=true, trackBy=search', () => {
      const select = createSelect({
        options: [
          { value: 0, name: 'Value0', search: 'aaa', },
          { value: 1, name: 'Value1', search: 'bbb', },
          { value: 2, name: 'Value2', search: 'ccc', }
        ],
        label: 'name',
        trackBy: 'search',
      })

      select.vm.search = 'bb'

      expect(select.vm.fo.length).toBe(1)
      expect(select.vm.fo[0].name).toBe('Value1')
    })

    it('should contain only options with normalized trackBys that match normalized search, strict=true', () => {
      const select = createSelect({
        options: [
          { value: 0, name: 'Value0', },
          { value: 1, name: 'Value1', },
          { value: 2, name: 'Value2', }
        ],
        trackBy: 'name',
        label: 'name',
      })

      select.vm.search = 'VALUE1'

      expect(select.vm.fo.length).toBe(1)
      expect(select.vm.fo[0].name).toBe('Value1')
    })

    it('should contain only options with normalized trackBys that match normalized search, strict=false', () => {
      const select = createSelect({
        options: [
          { value: 0, name: 'Válué0', },
          { value: 1, name: 'Válué1', },
          { value: 2, name: 'Value2', }
        ],
        trackBy: 'name',
        label: 'name',
        strict: false,
      })

      select.vm.search = 'VALUE1'

      expect(select.vm.fo.length).toBe(1)
      expect(select.vm.fo[0].name).toBe('Válué1')
    })

    it('should contain only options with normalized trackBys that match normalized search start, strict=false, searchStart=trze', () => {
      const select = createSelect({
        options: [
          { value: 0, name: 'aVálué0', },
          { value: 1, name: 'bVálué1', },
          { value: 2, name: 'aaVálué2', }
        ],
        trackBy: 'name',
        label: 'name',
        strict: false,
        searchStart: true,
      })

      select.vm.search = 'a'

      expect(select.vm.fo.length).toBe(2)
      expect(select.vm.fo[0].name).toBe('aVálué0')
      expect(select.vm.fo[1].name).toBe('aaVálué2')
    })

    it('should hide selected tags when hideSelected is true', async () => {
      const select = createSelect({
        mode: 'tags',
        hideSelected: true,
        options: [1,2,3],
      })

      select.vm.select(1)

      await nextTick()

      expect(select.vm.fo).toStrictEqual([
        { value: 2, label: 2 },
        { value: 3, label: 3 },
      ])
    })

    it('should limit options', () => {
      const select = createSelect({
        options: [1,2,3,4,5],
        limit: 3,
      })

      expect(select.vm.fo.length).toBe(3)
      expect(select.vm.fo[0].label).toBe(1)
      expect(select.vm.fo[1].label).toBe(2)
      expect(select.vm.fo[2].label).toBe(3)
    })

    it('should set iv when options are set later but value exists mode=single', async () => {
      let select = createSelect({
        options: [],
        value: 1,
      })

      expect(select.vm.iv).toStrictEqual({})
      
      select.vm.$parent.props.options = [1,2,3]

      await nextTick()

      expect(select.vm.iv).toStrictEqual({value:1,label:1})
    })

    it('should set iv when options are set later but value exists mode=multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [],
        value: [1,2],
      })

      expect(select.vm.iv).toStrictEqual([])
      
      select.vm.$parent.props.options = [1,2,3]

      await nextTick()

      expect(select.vm.iv).toStrictEqual([{value:1,label:1},{value:2,label:2}])
    })

    it('should reactively changes label when optipons has been changed mode=single, object=false', async () => {
      let select = createSelect({
        value: 'ru',
        label: 'name',
        valueProp: 'code',
        options: [{ code: 'au', name: 'Australia' }, { code: 'ru', name: 'Russia' }, { code: 'us', name: 'USA' }],
      }, {
        attach: true,
      })

      select.vm.$parent.props.options = [{ code: 'au', name: 'Австралия' }, { code: 'ru', name: 'Россия' }, { code: 'us', name: 'США' }]

      await nextTick()
      await nextTick()

      expect(select.find('.multiselect-single-label').element).toBeVisible()
      expect(select.find('.multiselect-single-label').html()).toContain('Россия')

      destroy(select)
    })

    it('should not update value when options changed but did not affect value mode=single, object=false', async () => {
      let select = createSelect({
        value: 'ru',
        label: 'name',
        valueProp: 'code',
        options: [{ code: 'au', name: 'Australia' }, { code: 'ru', name: 'Russia' }, { code: 'us', name: 'USA' }],
      }, {
        attach: true,
      })

      select.vm.$parent.props.options = [{ code: 'au', name: 'Australia' }, { code: 'ru', name: 'Russia' }]

      await nextTick()
      await nextTick()

      expect(select.find('.multiselect-single-label').element).toBeVisible()
      expect(select.find('.multiselect-single-label').html()).toContain('Russia')

      destroy(select)
    })

    it('should reactively changes label when options has been changed mode=tags, object=false', async () => {
      let select = createSelect({
        mode: 'tags',
        value: ['ru', 'au'],
        label: 'name',
        valueProp: 'code',
        options: [{ code: 'au', name: 'Australia' }, { code: 'ru', name: 'Russia' }, { code: 'us', name: 'USA' }],
      }, {
        attach: true,
      })

      select.vm.$parent.props.options = [{ code: 'au', name: 'Австралия' }, { code: 'ru', name: 'Россия' }, { code: 'us', name: 'США' }]

      await nextTick()
      await nextTick()

      expect(findAll(select, '.multiselect-tag').at(0).element).toBeVisible()
      expect(findAll(select, '.multiselect-tag').at(0).html()).toContain('Россия')
      expect(findAll(select, '.multiselect-tag').at(1).element).toBeVisible()
      expect(findAll(select, '.multiselect-tag').at(1).html()).toContain('Австралия')

      destroy(select)
    })

    it('should reactively changes external value when options has been changed mode=single, object=true', async () => {
      let select = createSelect({
        value: { code: 'ru', name: 'Russia' },
        label: 'name',
        valueProp: 'code',
        options: [{ code: 'au', name: 'Australia' }, { code: 'ru', name: 'Russia' }, { code: 'us', name: 'USA' }],
        object: true,
      })

      select.vm.$parent.props.options = [{ code: 'au', name: 'Австралия' }, { code: 'ru', name: 'Россия' }, { code: 'us', name: 'США' }]

      await nextTick()

      expect(select.vm.$parent.value).toStrictEqual({ code: 'ru', name: 'Россия' })
    })

    it('should reactively changes external value when options has been changed mode=single, object=true', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [{ code: 'ru', name: 'Russia' }, { code: 'au', name: 'Australia' }],
        label: 'name',
        valueProp: 'code',
        options: [{ code: 'au', name: 'Australia' }, { code: 'ru', name: 'Russia' }, { code: 'us', name: 'USA' }],
        object: true,
      })

      select.vm.$parent.props.options = [{ code: 'au', name: 'Австралия' }, { code: 'ru', name: 'Россия' }, { code: 'us', name: 'США' }]

      await nextTick()

      expect(select.vm.$parent.value).toStrictEqual([{ code: 'ru', name: 'Россия' }, { code: 'au', name: 'Австралия' }])
    })

    it('should be equal to all options from groups', async () => {
      let select = createSelect({
        groups: true,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        value: null,
      })

      expect(select.vm.fo).toStrictEqual([
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
      ])
    })
  })

  describe('eg', () => {
    it('should be empty if not groupped', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null,
      })

      expect(select.vm.eg).toStrictEqual([])
    })
  })

  describe('pfg', () => {
    it('should add created option to already existing no-label group if it has appended value', async () => {
      let select = createSelect({
        createOption: true,
        value: null,
        groups: true,
        searchable: true,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
      })

      select.vm.search = 111
      select.vm.setPointerFirst()
      select.vm.selectPointer()
      select.vm.clear()

      select.vm.search = 11

      expect(select.vm.fg[0].__CREATE__).toEqual(true)
      expect(select.vm.fg[0].label).toEqual(' ')
      expect(select.vm.fg[0].options).toEqual([
        {
          __CREATE__: true,
          value: 11,
          label: 11,
        },
        {
          value: 111,
          label: 111,
        }
      ])
    })
  })

  describe('fg', () => {
    it('should keep the appended option in the first no-label group', async () => {
      let select = createSelect({
        createOption: true,
        value: null,
        groups: true,
        searchable: true,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
      })

      select.vm.search = 11
      select.vm.setPointerFirst()
      select.vm.selectPointer()
      select.vm.clear()


      expect(select.vm.fg[0].__CREATE__).toEqual(true)
      expect(select.vm.fg[0].label).toEqual(' ')
      expect(select.vm.fg[0].options).toEqual([
        {
          value: 11,
          label: 11,
        }
      ])
    })

    it('should have options/__visible__ equal to options', async () => {
      let select = createSelect({
        groups: true,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        value: null,
      })

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
          ],
          __VISIBLE__: [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
          ]
        },
        {
          label: 'Second',
          group: true,
          index: 1,
          options: [
            { value: 4, label: 4 },
            { value: 5, label: 5 },
            { value: 6, label: 6 },
          ],
          __VISIBLE__: [
            { value: 4, label: 4 },
            { value: 5, label: 5 },
            { value: 6, label: 6 },
          ]
        },
      ])
    })

    it('should have options/__visible__ equal to filtered by search options', async () => {
      let select = createSelect({
        groups: true,
        searchable: true,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: ['value4',5,6],
          },
        ],
        value: null,
      })

      select.vm.search = 'value'

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ]
        },
        {
          label: 'Second',
          group: true,
          index: 1,
          options: [
            { value: 'value4', label: 'value4' },
          ],
          __VISIBLE__: [
            { value: 'value4', label: 'value4' },
          ]
        },
      ])
    })

    it('should have options/__visible__ equal to filtered by search options when has selected and hideSelected = false', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        searchable: true,
        hideSelected: false,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: ['value4',5,6],
          },
        ],
        value: ['value2'],
      })

      select.vm.search = 'value'

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ]
        },
        {
          label: 'Second',
          group: true,
          index: 1,
          options: [
            { value: 'value4', label: 'value4' },
          ],
          __VISIBLE__: [
            { value: 'value4', label: 'value4' },
          ]
        },
      ])
    })

    it('should have options/__visible__ equal to filtered by search options when has selected and hideSelected = true', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        searchable: true,
        hideSelected: true,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: ['value4',5,6],
          },
        ],
        value: ['value2'],
      })

      select.vm.search = 'value'

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
          ]
        },
        {
          label: 'Second',
          group: true,
          index: 1,
          options: [
            { value: 'value4', label: 'value4' },
          ],
          __VISIBLE__: [
            { value: 'value4', label: 'value4' },
          ]
        },
      ])
    })

    it('should have options/__visible__ equal to filtered by search options when has selected and hideSelected = false', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        searchable: true,
        hideSelected: false,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: ['value4',5,6],
          },
        ],
        value: ['value2'],
      })

      select.vm.search = 'value'

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ]
        },
        {
          label: 'Second',
          group: true,
          index: 1,
          options: [
            { value: 'value4', label: 'value4' },
          ],
          __VISIBLE__: [
            { value: 'value4', label: 'value4' },
          ]
        },
      ])
    })

    it('should hide group if has search and hideSelected=true and has a selected option', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        searchable: true,
        hideSelected: true,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: ['value4',5,6],
          },
        ],
        value: ['value4'],
      })

      select.vm.search = 'value'

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ]
        },
      ])
    })

    it('should not hide group if has search and hideSelected=false and has a selected option', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        searchable: true,
        hideSelected: false,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: ['value4',5,6],
          },
        ],
        value: ['value4'],
      })

      select.vm.search = 'value'

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ]
        },
        {
          label: 'Second',
          group: true,
          index: 1,
          options: [
            { value: 'value4', label: 'value4' },
          ],
          __VISIBLE__: [
            { value: 'value4', label: 'value4' },
          ]
        },
      ])
    })

    it('should not hide group if it has no search and hideSelected=true and groupHideEmpty=true and has only selected options', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        searchable: true,
        hideSelected: true,
        groupHideEmpty: true,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: ['value4', 5, 6],
          },
        ],
        value: ['value4', 5, 6],
      })

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
            { value: 3, label: 3 },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
            { value: 3, label: 3 },
          ]
        },
        {
          label: 'Second',
          group: true,
          index: 1,
          options: [
            { value: 'value4', label: 'value4' },
            { value: 5, label: 5 },
            { value: 6, label: 6 },
          ],
          __VISIBLE__: [
          ]
        },
      ])
    })

    it('should hide group if groupHideEmpty=true and has no options', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        searchable: true,
        groupHideEmpty: true,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: [],
          },
        ],
      })

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
            { value: 3, label: 3 },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
            { value: 3, label: 3 },
          ]
        },
      ])
    })

    it('should not hide group if groupHideEmpty=false and has no options', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        searchable: true,
        groupHideEmpty: false,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: [],
          },
        ],
      })

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
            { value: 3, label: 3 },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
            { value: 3, label: 3 },
          ]
        },
        {
          label: 'Second',
          index: 1,
          group: true,
          options: [],
          __VISIBLE__: []
        },
      ])
    })

    it('should not hide group if groupHideEmpty=true if has seaarch and has visible options', async () => {
      let select = createSelect({
        mode: 'multiple',
        groups: true,
        searchable: true,
        groupHideEmpty: true,
        options: [
          {
            label: 'First',
            options: ['value1','value2',3],
          },
          {
            label: 'Second',
            options: ['value4', 'value5'],
          },
        ],
        value: ['value4']
      })

      select.vm.search = 'value'

      expect(select.vm.fg).toStrictEqual([
        {
          label: 'First',
          group: true,
          index: 0,
          options: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ],
          __VISIBLE__: [
            { value: 'value1', label: 'value1' },
            { value: 'value2', label: 'value2' },
          ]
        },
        {
          label: 'Second',
          group: true,
          index: 1,
          options: [
            { value: 'value4', label: 'value4' },
            { value: 'value5', label: 'value5' },
          ],
          __VISIBLE__: [
            { value: 'value5', label: 'value5' },
          ]
        },
      ])
    })

    it('should be an empty array if groups=false', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: []
      })

      expect(select.vm.fg).toStrictEqual([])
    })
  })

  describe('hasSelected', () => {
    it('should true if has value when single', () => {
      let select = createSelect({
        value: null,
      })
      expect(select.vm.hasSelected).toBe(false)

      select = createSelect({
        value: undefined,
      })
      expect(select.vm.hasSelected).toBe(false)

      select = createSelect({
        value: 1,
        options: [1,2,3],
      })
      expect(select.vm.hasSelected).toBe(true)

      select = createSelect({
        value: 'value',
        options: {
          value: 1,
          value2: 2,
        },
      })
      expect(select.vm.hasSelected).toBe(true)
    })

    it('should true if has value when multiple', () => {
      let select = createSelect({
        mode: 'multiple',
        value: null,
      })
      expect(select.vm.hasSelected).toBe(false)

      select = createSelect({
        mode: 'multiple',
        value: undefined,
      })
      expect(select.vm.hasSelected).toBe(false)

      select = createSelect({
        mode: 'multiple',
        value: [1],
        options: [1,2,3],
      })
      expect(select.vm.hasSelected).toBe(true)

      select = createSelect({
        mode: 'multiple',
        value: ['value'],
        options: {
          value: 1,
          value2: 2,
        },
      })
      expect(select.vm.hasSelected).toBe(true)
    })

    it('should true if has value when tags', () => {
      let select = createSelect({
        mode: 'tags',
        value: null,
      })
      expect(select.vm.hasSelected).toBe(false)

      select = createSelect({
        mode: 'tags',
        value: undefined,
      })
      expect(select.vm.hasSelected).toBe(false)

      select = createSelect({
        mode: 'tags',
        value: [1],
        options: [1,2,3],
      })
      expect(select.vm.hasSelected).toBe(true)

      select = createSelect({
        mode: 'tags',
        value: ['value'],
        options: {
          value: 1,
          value2: 2,
        },
      })
      expect(select.vm.hasSelected).toBe(true)
    })
  })

  describe('multipleLabelText', () => {
    it('should be default text with one or more options selected', () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1],
        options: [1,2,3]
      })
      expect(select.vm.multipleLabelText).toStrictEqual('1 option selected')

      select = createSelect({
        mode: 'multiple',
        value: [1,2],
        options: [1,2,3]
      })
      expect(select.vm.multipleLabelText).toStrictEqual('2 options selected')
    })

    it('should be custom text with one or more options selected', () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1],
        options: [1,2,3],
        multipleLabel: val => val.length + ' selected',
      })
      expect(select.vm.multipleLabelText).toStrictEqual('1 selected')

      select = createSelect({
        mode: 'multiple',
        value: [1,2],
        options: [1,2,3],
        multipleLabel: val => val.length + ' selected',
      })
      expect(select.vm.multipleLabelText).toStrictEqual('2 selected')
    })
  })

  describe('noOptions', () => {
    it('should be true if no options provided', () => {
      let select = createSelect()
      expect(select.vm.noOptions).toBe(true)

      select = createSelect({
        options: [1,2,3],
      })
      expect(select.vm.noOptions).toBe(false)
    })
  })

  describe('noResults', () => {
    it('should be true if no options match search', () => {
      let select = createSelect({
        options: ['Java', 'Javascript'],
      })
      select.vm.search = 'jav'
      expect(select.vm.noResults).toBe(false)

      select.vm.search = 'type'
      expect(select.vm.noResults).toBe(true)
    })
  })

  describe('select', () => {
    it('should update value on select when using single with object false', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null
      })

      select.vm.select({ value: 1, label: 1 })

      await nextTick()

      expect(getValue(select)).toBe(1)
    })

    it('should update value on select when using single with object true', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null,
        object: true,
      })

      select.vm.select({ value: 1, label: 1 })

      await nextTick()

      expect(getValue(select)).toStrictEqual({ value: 1, label: 1 })
    })

    it('should update value on select when using multiple with object false', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: null
      })

      select.vm.select({ value: 1, label: 1 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1])
    })

    it('should update value on select when using multiple with object true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: null,
        object: true
      })

      select.vm.select({ value: 1, label: 1 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([{ value: 1, label: 1 }])
    })

    it('should update value on select when using multiple with when value is null', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: null,
      })

      select.vm.update(null)

      select.vm.select({ value: 1, label: 1 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1])
    })

    it('should update value when providing a plain value', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null
      })

      select.vm.select(1)

      await nextTick()

      expect(getValue(select)).toBe(1)
    })

    it('should emit select with value when object false', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: 2,
      })

      select.vm.select({ value: 2, label: 2 })

      expect(select.emitted('select')[0][0]).toStrictEqual(2)
      expect(select.emitted('select')[0][1]).toStrictEqual({ value: 2, label: 2 })
    })

    it('should emit select with value when object true', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: 2,
        object: true,
      })

      select.vm.select({ value: 2, label: 2 })

      expect(select.emitted('select')[0][0]).toStrictEqual({ value: 2, label: 2 })
      expect(select.emitted('select')[0][1]).toStrictEqual({ value: 2, label: 2 })
    })
  })

  describe('deselect', () => {
    it('should clear value when deselect single', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: 2
      })

      select.vm.deselect({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual(null)
    })

    it('should remove value when deselect multiple and object false', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [1,2],
        valueProp: 'v'
      })

      select.vm.deselect({ v: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1])
    })

    it('should remove value when deselect multiple and object true', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [{ v: 2, label: 2 }, { v: 3, label: 3 }],
        object: true,
        valueProp: 'v'
      })

      select.vm.deselect({ v: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([{ v: 3, label: 3 }])
    })

    it('should remove value when deselect multiple by providing value', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [1,2],
        valueProp: 'v'
      })

      select.vm.deselect(1)

      await nextTick()

      expect(getValue(select)).toStrictEqual([2])
    })

    it('should emit deselect with value when object false', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: 2,
        valueProp: 'v'
      })

      select.vm.deselect({ v: 2, label: 2 })

      expect(select.emitted('deselect')[0][0]).toStrictEqual(2)
      expect(select.emitted('deselect')[0][1]).toStrictEqual({ v: 2, label: 2 })
    })

    it('should emit deselect with value when object true', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: 2,
        object: true,
        valueProp: 'v'
      })

      select.vm.deselect({ v: 2, label: 2 })

      expect(select.emitted('deselect')[0][0]).toStrictEqual({ v: 2, label: 2 })
      expect(select.emitted('deselect')[0][1]).toStrictEqual({ v: 2, label: 2 })
    })
  })

  describe('remove', () => {
    it('should deselect on remove', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [1,2],
      })

      select.vm.remove(1)

      await nextTick()

      expect(getValue(select)).toStrictEqual([2])
    })
  })

  describe('handleTagRemove', () => {
    it('should not deselect option and preventDefault if event.button is not 0', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [1,2],
      })

      let preventDefaultMock = jest.fn()

      select.vm.handleTagRemove(1, {
        button: 2,
        preventDefault: preventDefaultMock,
      })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
      expect(preventDefaultMock).toHaveBeenCalled()
    })

    it('should deselect option and not preventDefault if event.button is 0', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [1,2],
      })

      let preventDefaultMock = jest.fn()

      select.vm.handleTagRemove(1, {
        button: 0,
        preventDefault: preventDefaultMock,
      })

      await nextTick()

      expect(getValue(select)).toStrictEqual([2])
      expect(preventDefaultMock).not.toHaveBeenCalled()
    })
  })

  describe('clear', () => {
    it('should set value to null on clear when single', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: 1,
      })

      select.vm.clear()

      await nextTick()

      expect(getValue(select)).toStrictEqual(null)
    })

    it('should set value to [] on clear when multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [1,2],
      })

      select.vm.clear()

      await nextTick()

      expect(getValue(select)).toStrictEqual([])
    })

    it('should emit clear event', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: 1,
      })

      select.vm.clear()

      await nextTick()

      expect(select.emitted('clear')).toBeTruthy()
    })
  })

  describe('selectAll', () => {
    it('should do nothing when single', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: null,
      })

      select.vm.selectAll()

      await nextTick()

      expect(getValue(select)).toStrictEqual(null)
    })

    it('should select all when multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [],
      })

      select.vm.selectAll()

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2,3])
    })

    it('should select all when tags', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [1,2,3],
        value: [],
      })

      select.vm.selectAll()

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2,3])
    })

    it('should only select non-disabled options', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [
          { label: 1, value: 1, },
          { label: 2, value: 2, disabled: true, },
          { label: 3, value: 3, },
        ],
        value: [],
      })

      select.vm.selectAll()

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,3])
    })

    it('should not select an option twice', async () => {
      let select = createSelect({
        mode: 'tags',
        hideSelected: false,
        options: [
          { label: 1, value: 1, },
          { label: 2, value: 2, disabled: true, },
          { label: 3, value: 3, },
        ],
        value: [1],
      })

      select.vm.selectAll()

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,3])
    })
  })

  describe('isSelected', () => {
    it('should be true if value equals option value when object false and single', () => {
      let select = createSelect({
        options: [1,2,3],
        value: 2,
        valueProp: 'v',
      })

      expect(select.vm.isSelected({ v: 2, label: 2 })).toBe(true)
      expect(select.vm.isSelected({ v: 3, label: 3 })).toBe(false)
    })

    it('should be true if value object equals option when object true and single', () => {
      let select = createSelect({
        options: [1,2,3],
        value: { v: 2, label: 2 },
        object: true,
        valueProp: 'v',
      })

      expect(select.vm.isSelected({ v: 2, label: 2 })).toBe(true)
      expect(select.vm.isSelected({ v: 3, label: 3 })).toBe(false)
    })

    it('should be true if option value is in value when object false and multiple', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [1,2],
        valueProp: 'v',
      })

      expect(select.vm.isSelected({ v: 2, label: 2 })).toBe(true)
      expect(select.vm.isSelected({ v: 3, label: 3 })).toBe(false)
    })

    it('should be true if option is in value when object true and multiple', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [
          { v: 1, label: 1 },
          { v: 2, label: 2 },
        ],
        object: true,
        valueProp: 'v',
      })

      expect(select.vm.isSelected({ v: 2, label: 2 })).toBe(true)
      expect(select.vm.isSelected({ v: 3, label: 3 })).toBe(false)
    })
  })

  describe('isDisabled', () => {
    it('should be false if the option has no disabled property', () => {
      let select = createSelect({
        options: [1,2,3],
        value: 2,
      })

      expect(select.vm.isDisabled({ value: 2, label: 2 })).toBe(false)
    })

    it('should be false if the option has false disabled property', () => {
      let select = createSelect({
        options: [1,2,3],
        value: 2,
      })

      expect(select.vm.isDisabled({ value: 2, label: 2, disabled: false })).toBe(false)
    })

    it('should be true if the option has true disabled property', () => {
      let select = createSelect({
        options: [1,2,3],
        value: 2,
      })

      expect(select.vm.isDisabled({ value: 2, label: 2, disabled: true })).toBe(true)
    })
  })

  describe('isMax', () => {
    it('should be false if max is -1', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        max: -1
      })

      expect(select.vm.isMax()).toBe(false)
    })
    
    it('should be false if max is 1 && null', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: null,
        max: 1
      })

      expect(select.vm.isMax()).toBe(false)
    })
    
    it('should be false if max is 1 && empty', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [],
        max: 1
      })

      expect(select.vm.isMax()).toBe(false)
    })
    
    it('should be true if max is 0 && null', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: null,
        max: 0
      })

      expect(select.vm.isMax()).toBe(true)
    })
    
    it('should be true if max is 0 && empty', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [],
        max: 0
      })

      expect(select.vm.isMax()).toBe(true)
    })
    
    it('should be true if max is 2 && has 2 values', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [1,2],
        max: 2
      })

      expect(select.vm.isMax()).toBe(true)
    })
    
    it('should be true if max is 2 && has 3 values', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [1,2,3],
        max: 2
      })

      expect(select.vm.isMax()).toBe(true)
    })
    
    it('should be false if max is 2 && has 1 value', () => {
      let select = createSelect({
        mode: 'multiple',
        options: [1,2,3],
        value: [1],
        max: 2
      })

      expect(select.vm.isMax()).toBe(false)
    })
  })

  describe('handleOptionClick', () => {
    it('should not select option if disabled', async () => {
      let select = createSelect({
        value: 0,
        options: [
          { value: 0, label: 0, disabled: false },
          { value: 1, label: 1, disabled: false },
          { value: 2, label: 2, disabled: true },
        ],
      }, {
        attach: true,
      })

      select.vm.handleOptionClick(select.vm.getOption(2))

      await nextTick()

      expect(select.vm.ev).toBe(0)

      destroy(select)
    })

    it('should select option if not disabled', async () => {
      let select = createSelect({
        value: 0,
        options: [
          { value: 0, label: 0, disabled: false },
          { value: 1, label: 1, disabled: false },
          { value: 2, label: 2, disabled: true },
        ],
      }, {
        attach: true,
      })

      select.vm.handleOptionClick(select.vm.getOption(1))

      await nextTick()

      expect(select.vm.ev).toBe(1)

      destroy(select)
    })

    it('should not select option if onCreate returns false', async () => {
      let select = createSelect({
        value: 0,
        options: [
          { value: 0, label: 0 },
          { value: 1, label: 1 },
          { value: 2, label: 2 },
        ],
        createOption: true,
        onCreate: () => false
      }, {
        attach: true,
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 'value', label: 'value', __CREATE__: true })

      await nextTick()

      expect(select.vm.ev).toBe(0)

      destroy(select)
    })

    it('should not select option if onCreate returns false mode=multiple', async () => {
      let select = createSelect({
        value: [1],
        options: [
          { value: 0, label: 0 },
          { value: 1, label: 1 },
          { value: 2, label: 2 },
        ],
        mode: 'multiple',
        createOption: true,
        onCreate: () => false
      }, {
        attach: true,
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 'value', label: 'value', __CREATE__: true })

      await nextTick()

      expect(select.vm.ev).toStrictEqual([1])

      destroy(select)
    })

    it('should not select option if onCreate returns false mode=tags', async () => {
      let select = createSelect({
        value: [1],
        options: [
          { value: 0, label: 0 },
          { value: 1, label: 1 },
          { value: 2, label: 2 },
        ],
        mode: 'tags',
        createOption: true,
        onCreate: () => false
      }, {
        attach: true,
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 'value', label: 'value', __CREATE__: true })

      await nextTick()

      expect(select.vm.ev).toStrictEqual([1])

      destroy(select)
    })

    it('should select modified option if onCreate returns it and append it to option list', async () => {
      let select = createSelect({
        value: 0,
        options: [
          { value: 0, label: 0 },
          { value: 1, label: 1 },
          { value: 2, label: 2 },
        ],
        object: true,
        createOption: true,
        onCreate: (option) => {
          return {
            ...option,
            created_at: 'now'
          }
        }
      }, {
        attach: true,
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 'value', label: 'value', __CREATE__: true })

      await flushPromises()
      await nextTick()

      select.vm.search = null

      expect(select.vm.ev).toStrictEqual({ value: 'value', label: 'value', created_at: 'now' })
      expect(select.vm.fo[3]).toStrictEqual({ value: 'value', label: 'value', created_at: 'now' })

      destroy(select)
    })

    it('should resolve modified option with async onCreate', async () => {
      let select = createSelect({
        value: 0,
        options: [
          { value: 0, label: 0 },
          { value: 1, label: 1 },
          { value: 2, label: 2 },
        ],
        object: true,
        createOption: true,
        onCreate: (option) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({
                ...option,
                created_at: 'now'
              })
            }, 1)
          })
        }
      }, {
        attach: true,
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 'value', label: 'value', __CREATE__: true })

      await flushPromises()
      jest.advanceTimersByTime(1)
      await flushPromises()
      await nextTick()

      select.vm.search = null

      expect(select.vm.ev).toStrictEqual({ value: 'value', label: 'value', created_at: 'now' })
      expect(select.vm.fo[3]).toStrictEqual({ value: 'value', label: 'value', created_at: 'now' })

      destroy(select)
    })

    /* SINGLE */

    it('should select option as value if not selected when single', async () => {
      let select = createSelect({
        value: 1,
        options: [1,2,3],
      }, {
        attach: true,
      })

      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual(2)

      destroy(select)
    })

    it('should deselect option if selected when single', async () => {
      let select = createSelect({
        value: 2,
        options: [1,2,3],
      }, {
        attach: true,
      })

      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual(null)

      destroy(select)
    })

    it('should not deselect option if selected when single and canDeselect=false', async () => {
      let select = createSelect({
        value: 2,
        options: [1,2,3],
        canDeselect: false,
      }, {
        attach: true,
      })

      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual(2)

      destroy(select)
    })

    it('should emit option & create and clear search and not append option on select if createOption true and option does not exist', async () => {
      let select = createSelect({
        mode: 'single',
        value: null,
        options: [1,2,3],
        createOption: true,
        appendNewOption: false,
        object: true,
        valueProp: 'v'
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()

      expect(select.emitted('option')[0][0]).toStrictEqual('value')
      expect(select.emitted('create')[0][0]).toStrictEqual('value')
      expect(select.vm.search).toBe('')
      expect(select.vm.fo.length).toBe(3)
    })

    it('should append option if createOption && appendNewOption true and option does not exist', async () => {
      let select = createSelect({
        mode: 'single',
        value: null,
        options: [1,2,3],
        createOption: true,
        appendNewOption: true,
        hideSelected: false,
        valueProp: 'v'
      })

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()

      expect(select.emitted('option')[0][0]).toStrictEqual('value')
      expect(select.vm.fo).toStrictEqual([
        { v: 1, label: 1 },
        { v: 2, label: 2 },
        { v: 3, label: 3 },
        { v: 'value', label: 'value' },
      ])
    })

    it('should not append option if it already exists', async () => {
      let select = createSelect({
        mode: 'single',
        value: null,
        options: [1,2,3],
        createOption: true,
        appendNewOption: true,
        hideSelected: false,
        valueProp: 'v',
      })

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()
      
      expect(select.vm.fo).toStrictEqual([
        { v: 1, label: 1 },
        { v: 2, label: 2 },
        { v: 3, label: 3 },
        { v: 'value', label: 'value' },
      ])
    })

    it('should not append option if appendNewOption is false', async () => {
      let select = createSelect({
        mode: 'single',
        value: null,
        options: [1,2,3],
        createOption: true,
        appendNewOption: false,
        hideSelected: false,
        object: true,
        valueProp: 'v',
      })

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()
      
      expect(select.vm.fo).toStrictEqual([
        { v: 1, label: 1 },
        { v: 2, label: 2 },
        { v: 3, label: 3 },
      ])
    })

    /* MULTISELECT */

    it('should remove option from value if selected when multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1,2],
        options: [1,2,3],
      })

      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1])
    })

    it('should not clear search on deselect when multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1,2],
        options: [1,2,3],
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(select.vm.search).toBe('value')
      expect(getValue(select)).toStrictEqual([1])
    })

    it('should add option to value if not selected when multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1],
        options: [1,2,3],
      })

      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
    })

    it('should not add option to value if reached max', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1],
        options: [1,2,3],
        max: 1
      })

      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1])
    })

    it('should clear search after select when multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1],
        options: [1,2,3],
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
      expect(select.vm.search).toBe('')
    })

    it('should not clear search after select when multiple and clearOnSelect is false', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1],
        options: [1,2,3],
        clearOnSelect: false,
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
      expect(select.vm.search).toBe('value')
    })

    it('should not clear pointer after select when multiple and hideSelected is false', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [1,2,3],
        hideSelected: false,
      })

      select.vm.pointer = select.vm.getOption(2)
      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(select.vm.pointer).toStrictEqual(select.vm.getOption(2))
    })

    it('should emit option and clear search and not append option on select if createOption true and option does not exist', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [1,2,3],
        createOption: true,
        appendNewOption: false,
        object: true,
        valueProp: 'v'
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()

      expect(select.emitted('option')[0][0]).toStrictEqual('value')
      expect(select.vm.search).toBe('')
      expect(select.vm.fo.length).toBe(3)
    })

    it('should append option if createOption && appendNewOption true and option does not exist', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [1,2,3],
        createOption: true,
        appendNewOption: true,
        hideSelected: false,
        valueProp: 'v'
      })

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()

      expect(select.emitted('option')[0][0]).toStrictEqual('value')
      expect(select.vm.fo).toStrictEqual([
        { v: 1, label: 1 },
        { v: 2, label: 2 },
        { v: 3, label: 3 },
        { v: 'value', label: 'value' },
      ])
    })

    it('should not append option if it already exists', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [1,2,3],
        createOption: true,
        appendNewOption: true,
        hideSelected: false,
        valueProp: 'v',
      })

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()
      
      expect(select.vm.fo).toStrictEqual([
        { v: 1, label: 1 },
        { v: 2, label: 2 },
        { v: 3, label: 3 },
        { v: 'value', label: 'value' },
      ])
    })

    it('should not append option if appendNewOption is false', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [1,2,3],
        createOption: true,
        appendNewOption: false,
        hideSelected: false,
        object: true,
        valueProp: 'v',
      })

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()
      
      expect(select.vm.fo).toStrictEqual([
        { v: 1, label: 1 },
        { v: 2, label: 2 },
        { v: 3, label: 3 },
      ])
    })

    it('should close input after select if closeOnSelect=true && mode=multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [1,2,3],
        searchable: true,
        closeOnSelect: true,
      }, {
        attach: true,
      })

      select.vm.input.focus()

      expect(document.activeElement == select.vm.input).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      await nextTick()

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement == select.vm.input).toBe(true)

      destroy(select)
    })

    it('should close input after deselect if closeOnDeselect=true && mode=multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [2],
        options: [1,2,3],
        searchable: true,
        closeOnDeselect: true,
        hideSelected: false,
      }, {
        attach: true,
      })

      select.vm.input.focus()

      expect(document.activeElement == select.vm.input).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      await nextTick()

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement == select.vm.input).toBe(true)

      destroy(select)
    })

    it('should not blur input after select if closeOnSelect=false && mode=multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [1,2,3],
        searchable: true,
        closeOnSelect: false,
      }, {
        attach: true,
      })

      select.vm.input.focus()

      expect(document.activeElement == select.vm.input).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      await nextTick()

      expect(document.activeElement == select.vm.input).toBe(true)

      destroy(select)
    })

    /* TAGS */

    it('should remove option from value if selected when tags', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [1,2],
        options: [1,2,3],
      })

      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1])
    })

    it('should not clear search on deselect when tags', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [1,2],
        options: [1,2,3],
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(select.vm.search).toBe('value')
      expect(getValue(select)).toStrictEqual([1])
    })

    it('should add option to value if not selected when tags', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [1],
        options: [1,2,3],
      })

      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
    })

    it('should not add option to value if reached max when tags', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [1],
        options: [1,2,3],
        max: 1
      })

      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1])
    })

    it('should not clear search after select when tags if clearOnSelect is false', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [1],
        options: [1,2,3],
        clearOnSelect: false,
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
      expect(select.vm.search).toBe('value')
    })

    it('should clear search after select when tags if clearOnSelect is true', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [1],
        options: [1,2,3],
        clearOnSelect: true,
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ value: 2, label: 2 })

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
      expect(select.vm.search).toBe('')
    })

    it('should emit tag and clear search and not append tag on select if createTag true and option does not exist', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [],
        options: [1,2,3],
        createTag: true,
        appendNewTag: false,
        object: true,
        valueProp: 'v'
      })

      select.vm.search = 'value'
      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()

      expect(select.emitted('tag')[0][0]).toStrictEqual('value')
      expect(select.vm.search).toBe('')
      expect(select.vm.fo.length).toBe(3)
    })

    it('should append option if createTag && appendNewTag true and option does not exist', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [],
        options: [1,2,3],
        createTag: true,
        appendNewTag: true,
        hideSelected: false,
        valueProp: 'v'
      })

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()

      expect(select.emitted('tag')[0][0]).toStrictEqual('value')
      expect(select.vm.fo).toStrictEqual([
        { v: 1, label: 1 },
        { v: 2, label: 2 },
        { v: 3, label: 3 },
        { v: 'value', label: 'value' },
      ])
    })

    it('should not append option if it already exists', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [],
        options: [1,2,3],
        createTag: true,
        appendNewTag: true,
        hideSelected: false,
        valueProp: 'v',
      })

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()
      
      expect(select.vm.fo).toStrictEqual([
        { v: 1, label: 1 },
        { v: 2, label: 2 },
        { v: 3, label: 3 },
        { v: 'value', label: 'value' },
      ])
    })

    it('should not append option if appendNewTag is false', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [],
        options: [1,2,3],
        createTag: true,
        appendNewTag: false,
        hideSelected: false,
        object: true,
        valueProp: 'v',
      })

      select.vm.handleOptionClick({ v: 'value', label: 'value' })

      await nextTick()
      
      expect(select.vm.fo).toStrictEqual([
        { v: 1, label: 1 },
        { v: 2, label: 2 },
        { v: 3, label: 3 },
      ])
    })

    it('should close input after select if closeOnSelect=true && mode=tags', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [],
        options: [1,2,3],
        searchable: true,
        closeOnSelect: true,
      }, {
        attach: true,
      })

      select.vm.input.focus()

      expect(document.activeElement == select.vm.input).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      await nextTick()

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement == select.vm.input).toBe(true)

      destroy(select)
    })

    it('should close input after deselect if closeOnDeselect=true && mode=tags', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [2],
        options: [1,2,3],
        searchable: true,
        closeOnDeselect: true,
        hideSelected: false,
      }, {
        attach: true,
      })

      select.vm.input.focus()

      expect(document.activeElement == select.vm.input).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      await nextTick()

      expect(select.vm.isOpen).toBe(false)
      expect(document.activeElement == select.vm.input).toBe(true)

      destroy(select)
    })

    it('should not blur input after select if closeOnSelect=false && mode=tags', async () => {
      let select = createSelect({
        mode: 'tags',
        value: [],
        options: [1,2,3],
        searchable: true,
        closeOnSelect: false,
      }, {
        attach: true,
      })

      select.vm.input.focus()

      expect(document.activeElement == select.vm.input).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      await nextTick()

      expect(document.activeElement == select.vm.input).toBe(true)

      destroy(select)
    })

    it('should deactivate on select when closeOnSelect=true', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        closeOnSelect: true,
      })

      select.vm.open()
      expect(select.vm.isOpen).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(false)
    })

    it('should deactivate on deselect when closeOnDeelect=true', async () => {
      let select = createSelect({
        value: 2,
        options: [1,2,3],
        closeOnDeselect: true,
      })

      select.vm.open()
      expect(select.vm.isOpen).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(false)
    })

    it('should not deactivate on select when closeOnSelect=false', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        closeOnSelect: false,
      })

      select.vm.open()
      expect(select.vm.isOpen).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(true)
    })

    it('should focus input on select when closeOnSelect=false and has search', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        closeOnSelect: false,
        searchable: true,
      }, {
        attach: true,
      })

      select.vm.open()
      expect(select.vm.isOpen).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      jest.advanceTimersByTime(1)
      expect(document.activeElement == select.vm.input).toBe(true)

      destroy(select)
    })

    it('should not focus input on select when closeOnSelect=true and has search', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        closeOnSelect: true,
        searchable: true,
      }, {
        attach: true,
      })

      select.vm.open()
      expect(select.vm.isOpen).toBe(true)

      select.vm.handleOptionClick(select.vm.getOption(2))

      jest.advanceTimersByTime(1)
      expect(document.activeElement == select.vm.input).toBe(false)

      destroy(select)
    })
  })

  describe('handleGroupClick', () => {
    it('should not select options in group when disabled and mode=multiple ', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [
          {
            label: 'First',
            disabled: true,
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true,
      })

      select.vm.handleGroupClick(select.vm.fg[0])

      await nextTick()

      expect(getValue(select)).toStrictEqual([])
    })

    it('should not select options in group when mode=single ', async () => {
      let select = createSelect({
        mode: 'single',
        value: null,
        options: [
          {
            label: 'First',
            disabled: true,
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true,
      })

      select.vm.handleGroupClick(select.vm.fg[0])

      await nextTick()

      expect(getValue(select)).toStrictEqual(null)
    })

    it('should select options in group when multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true,
      })

      select.vm.handleGroupClick(select.vm.fg[0])

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2,3])
    })

    it('should select only enabled options in group when multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        options: [
          {
            label: 'First',
            options: [
              1,
              { value: 2, label: 2, disabled: true, },
              3,
            ],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true,
      })

      select.vm.handleGroupClick(select.vm.fg[0])

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,3])
    })

    it('should select only max amount of options when group is selected', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        max: 2,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true,
      })

      select.vm.handleGroupClick(select.vm.fg[0])

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
    })

    it('should select only unselected options', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1],
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true,
      })

      select.vm.handleGroupClick(select.vm.fg[0])

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2,3])
    })

    it('should deselect options in group when multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [1,2,3],
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true,
      })

      select.vm.handleGroupClick(select.vm.fg[0])

      await nextTick()

      expect(getValue(select)).toStrictEqual([])
    })

    it('should deactivate on select when closeOnSelect=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        closeOnSelect: true,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true,
      })

      select.vm.open()
      expect(select.vm.isOpen).toBe(true)

      select.vm.handleGroupClick(select.vm.fg[0])

      await nextTick()

      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(false)
    })

    it('should not deactivate on select when closeOnSelect=false', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: [],
        closeOnSelect: false,
        options: [
          {
            label: 'First',
            options: [1,2,3],
          },
          {
            label: 'Second',
            options: [4,5,6],
          },
        ],
        groups: true,
      })

      select.vm.open()
      expect(select.vm.isOpen).toBe(true)

      select.vm.handleGroupClick(select.vm.fg[0])

      await nextTick()

      jest.advanceTimersByTime(1)
      expect(select.vm.isOpen).toBe(true)
    })
  })

  describe('getOption', () => {
    it('should return option by value', () => {
      let select = createSelect({
        options: [1,2,3],
        valueProp: 'v',
      })

      expect(select.vm.getOption(3)).toStrictEqual({ v: 3, label: 3 })
    })
  })

  describe('filterOptions', () => {
    it('should use searchFilter for search when defined', () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        searchable: true,
        searchFilter(option) {
          return option.value == 2
        }
      })

      select.vm.search = 'aaa'

      expect(select.vm.fo).toStrictEqual([
        {
          label: 2,
          value: 2,
        }
      ])
    })
  })
  
  describe('resolveOptions', () => {
    it('should resolve options', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        resolveOnLoad: false,
      })
  
      await flushPromises()

      expect(select.vm.fo).toStrictEqual([])

      select.vm.resolveOptions()

      await flushPromises()

      expect(select.vm.fo).toStrictEqual([
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
      ])
    })

    it('should set empty options on error', async () => {
      let errorMock = jest.fn()

      const originalConsoleError = console.error
      const originalConsoleWarn = console.warn
      console.error = errorMock
      console.warn = () => {}

      let select = createSelect({
        options: async () => {
          return Promise.reject()
        },
        resolveOnLoad: false,
      })
  
      await flushPromises()

      expect(select.vm.fo).toStrictEqual([])

      select.vm.resolveOptions()

      await flushPromises()

      expect(select.vm.fo).toStrictEqual([])
      expect(select.vm.resolving).toStrictEqual(false)

      expect(errorMock).toHaveBeenCalledTimes(1)

      console.error = originalConsoleError
      console.warn = originalConsoleWarn
    })
  })
  
  describe('refreshOptions', () => {
    it('should resolve options', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        resolveOnLoad: false,
      })
  
      await flushPromises()

      expect(select.vm.fo).toStrictEqual([])

      select.vm.refreshOptions()

      await flushPromises()

      expect(select.vm.fo).toStrictEqual([
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
      ])
    })
  })
  
  describe('makeInternal', () => {
    it('should not set absent values by default', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: 4,
      })
  
      expect(select.vm.iv).toEqual({})
    })

    it('should set absent values if allowAbsent: true', async () => {
      let select = createSelect({
        options: [1,2,3],
        value: 4,
        allowAbsent: true,
      })
  
      expect(select.vm.iv).toEqual({
        value: 4,
        label: 4
      })
    })
  })

  describe('onCreated', () => {
    it('should throw error if initial value is not empty or an array when multiple', () => {
      const originalConsoleError = console.error
      const originalConsoleWarn = console.warn
      console.error = () => {}
      console.warn = () => {}

      expect(() => {
        createSelect({
          mode: 'multiple',
          options: [1,2,3],
          value: 1,
        })
      }).toThrowError()

      console.error = originalConsoleError
      console.warn = originalConsoleWarn
    })

    it('should resolve async options', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
      })
  
      await flushPromises()

      expect(select.vm.fo).toStrictEqual([
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
      ])
    })

    it('should not resolve async options if resolveOnLoad is false', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        resolveOnLoad: false
      })
  
      await flushPromises()

      expect(select.vm.fo).toStrictEqual([])
    })

    it('should be busy when resolving async options', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
      })

      expect(select.vm.busy).toBe(true)

      await flushPromises()

      expect(select.vm.busy).toBe(false)
    })

    it('should set iv if not async options and object=false', async () => {
      let select = createSelect({
        value: 2,
        options: [1,2,3],
        object: false,
      })

      expect(select.vm.iv).toStrictEqual({
        value: 2,
        label: 2,
      })
    })

    it('should set iv if not async options and object=true', async () => {
      let select = createSelect({
        value: { value: 2, label: 2 },
        options: [1,2,3],
        object: true,
      })

      expect(select.vm.iv).toStrictEqual({
        value: 2,
        label: 2,
      })
    })

    it('should set iv when async options are resolved when resolveOnLoad=true objec=false', async () => {
      let select = createSelect({
        value: 2,
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        resolveOnLoad: true,
        object: false
      })

      expect(select.vm.iv).toStrictEqual({})

      await flushPromises()

      expect(select.vm.iv).toStrictEqual({
        value: 2,
        label: 2,
      })
    })

    it('should set iv when async options are resolved when resolveOnLoad=true objec=true', async () => {
      let select = createSelect({
        value: { value: 2, label: 2 },
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        resolveOnLoad: true,
        object: true
      })

      expect(select.vm.iv).toStrictEqual({})

      await flushPromises()

      expect(select.vm.iv).toStrictEqual({
        value: 2,
        label: 2,
      })
    })

    it('should not set iv value with async options when resolveOnLoad=false object=false', async () => {
      let select = createSelect({
        value: 2,
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        resolveOnLoad: false,
        object: false,
      })

      expect(select.vm.iv).toStrictEqual({})

      await flushPromises()

      expect(select.vm.iv).toStrictEqual({})
    })

    it('should set iv value with async options when resolveOnLoad=false object=true', async () => {
      let select = createSelect({
        value: { value: 2, label: 2 },
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        resolveOnLoad: false,
        object: true
      })

      expect(select.vm.iv).toStrictEqual({
        value: 2,
        label: 2
      })
    })
  })

  describe('watchers', () => {
    it('should resolve options when async options change & resolveOnLoad=true', async () => {
      let asyncOptionsMock = jest.fn()
      let asyncOptionsMock2 = jest.fn()

      let select = createSelect({
        resolveOnLoad: true,
        options: async () => {
          return await new Promise((resolve, reject) => {
            asyncOptionsMock()
            resolve([1,2,3])
          })
        },
      })

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)

      select.vm.$parent.props.options = async () => {
        return await new Promise((resolve, reject) => {
          asyncOptionsMock2()
          resolve([4,5,6])
        })
      }

      await flushPromises()

      expect(asyncOptionsMock2).toHaveBeenCalledTimes(1)
    })

    it('should not resolve options when async options does not change & resolveOnLoad=true', async () => {
      let asyncOptionsMock = jest.fn()

      const fn1 = async () => {
        return await new Promise((resolve, reject) => {
          asyncOptionsMock()
          resolve([1,2,3])
        })
      }

      const fn2 = async () => {
        return await new Promise((resolve, reject) => {
          asyncOptionsMock()
          resolve([1,2,3])
        })
      }

      let select = createSelect({
        resolveOnLoad: true,
        options: fn1,
      })

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)

      select.vm.$parent.props.options = fn2

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)
    })

    it('should not resolve options when async options change & resolveOnLoad=false', async () => {
      let asyncOptionsMock = jest.fn()
      let asyncOptionsMock2 = jest.fn()

      let select = createSelect({
        resolveOnLoad: false,
        options: async () => {
          return await new Promise((resolve, reject) => {
            asyncOptionsMock()
            resolve([1,2,3])
          })
        },
      })

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(0)

      select.vm.$parent.props.options = async () => {
        return await new Promise((resolve, reject) => {
          asyncOptionsMock2()
          resolve([4,5,6])
        })
      }

      await flushPromises()

      expect(asyncOptionsMock2).toHaveBeenCalledTimes(0)
    })

    it('should not update async option list when search changes if delay is -1', async () => {
      let asyncOptionsMock = jest.fn()

      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            asyncOptionsMock()
            resolve([1,2,3])
          })
        },
        delay: -1
      })

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)

      select.vm.search = 'value'

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)
    })

    it('should unwatch search when delay changes & reinit only if it is >= 0', async () => {
      let asyncOptionsMock = jest.fn()

      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            asyncOptionsMock()
            resolve([1,2,3])
          })
        },
        delay: 10
      })

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)

      select.vm.search = 'value'

      jest.advanceTimersByTime(10)
      await flushPromises()
      
      expect(asyncOptionsMock).toHaveBeenCalledTimes(2)

      select.vm.$parent.props.delay = 5 

      await nextTick()

      select.vm.search = 'value2'

      jest.advanceTimersByTime(5)
      await flushPromises()
      
      expect(asyncOptionsMock).toHaveBeenCalledTimes(3)

      select.vm.$parent.props.delay = -1 

      await nextTick()

      select.vm.search = 'value3'

      jest.advanceTimersByTime(10)
      await flushPromises()
      
      expect(asyncOptionsMock).toHaveBeenCalledTimes(3)
    })

    it('should update async option list when search changes', async () => {
      let select = createSelect({
        options: async (query) => {
          return await new Promise((resolve, reject) => {
            resolve(query === 'val2' ? [4,5,6] : [1,2,3])
          })
        },
        delay: 10,
        filterResults: false,
      })

      await flushPromises()

      await nextTick()

      select.vm.search = 'val'

      jest.advanceTimersByTime(5)

      select.vm.search = 'val2'

      jest.advanceTimersByTime(10)

      await flushPromises()
      
      expect(select.vm.fo).toStrictEqual([
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
      ])
    })

    it('should set pointer to first when search changes using async option list', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve(['php', 'java', 'javascript'])
          })
        },
        delay: 10,
      })

      await flushPromises()

      select.vm.search = 'jav'

      jest.runAllTimers()

      await flushPromises()
      
      expect(select.vm.pointer).toStrictEqual({ value: 'java', label: 'java' })
    })

    it('should set pointer to first non-disabled when search changes using async option list', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([
              { value: 0, label: 'php' },
              { value: 1, label: 'javascript', disabled: true },
              { value: 2, label: 'java' },
            ])
          })
        },
        delay: 10,
      })

      await flushPromises()

      select.vm.search = 'jav'

      jest.runAllTimers()

      await flushPromises()
      
      expect(select.vm.pointer).toStrictEqual({ value: 2, label: 'java' })
    })

    it('should not set pointer to first when search changes using async option list with no result', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve(['php', 'java', 'javascript'])
          })
        },
        delay: 10,
      })

      await flushPromises()

      select.vm.search = 'perl'

      jest.runAllTimers()

      await flushPromises()
      
      expect(select.vm.pointer).toStrictEqual(null)
    })

    it('should not resolve async options when search changes if query is not equal to search value when delay has passed', async () => {
      let select = createSelect({
        options: async (query) => {
          return await new Promise((resolve, reject) => {
            resolve(query === 'val2' ? [4,5,6] : [1,2,3])
          })
        },
        delay: 10,
        filterResults: false,
      })

      await flushPromises()

      await nextTick()

      select.vm.search = 'val'

      jest.advanceTimersByTime(5)

      select.vm.search = 'val2'

      jest.advanceTimersByTime(5)

      await flushPromises()
      
      expect(select.vm.fo).toStrictEqual([
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
      ])
    })

    it('should not update async option list when search changes during async request', async () => {
      let select = createSelect({
        options: async (query) => {
          return await new Promise((resolve, reject) => {
            resolve(query === 'val2' ? [4,5,6] : [1,2,3])
          })
        },
        delay: 10,
        filterResults: false,
      })

      await flushPromises()

      await nextTick()

      select.vm.search = 'val'

      jest.runAllTimers()

      select.vm.search = 'val2'

      await flushPromises()
      
      expect(select.vm.fo).toStrictEqual([
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
      ])
    })

    it('should not update async option list when search changes to less chars than minChars', async () => {
      let asyncOptionsMock = jest.fn()

      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            asyncOptionsMock()
            resolve([1,2,3])
          })
        },
        delay: 0,
        minChars: 3
      })

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)

      select.vm.search = 'va'

      jest.runAllTimers()

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)
    })

    it('should update async option list when search changes to >= chars than minChars', async () => {
      let asyncOptionsMock = jest.fn()

      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            asyncOptionsMock()
            resolve([1,2,3])
          })
        },
        delay: 0,
        minChars: 3
      })

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)

      select.vm.search = 'val'

      jest.runAllTimers()

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(2)
    })

    it('should update async option list when search changes to empty when minChars=0', async () => {
      let asyncOptionsMock = jest.fn()

      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            asyncOptionsMock()
            resolve([1,2,3])
          })
        },
        delay: 0,
        minChars: 0
      })

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(1)

      select.vm.search = 'val'

      jest.runAllTimers()

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(2)

      select.vm.search = ''

      jest.runAllTimers()

      await flushPromises()

      expect(asyncOptionsMock).toHaveBeenCalledTimes(3)
    })

    it('should clear options before updating async options if clearOnSearch is true', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        delay: 0,
        clearOnSearch: true,
        filterResults: false,
      })

      await flushPromises()

      select.vm.search = 'val'

      expect(select.vm.fo.length).toBe(0)
    })

    it('should not clear options before updating async options if clearOnSearch is false', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        delay: 0,
        clearOnSearch: false,
        filterResults: false,
      })

      await flushPromises()

      select.vm.search = 'val'

      expect(select.vm.fo.length).toBe(3)
    })

    it('should be busy when resolve new async options', async () => {
      let select = createSelect({
        options: async () => {
          return await new Promise((resolve, reject) => {
            resolve([1,2,3])
          })
        },
        delay: 1,
      })

      await flushPromises()

      select.vm.search = 'val'

      jest.runAllTimers()

      expect(select.vm.busy).toBe(true)

      await flushPromises()

      expect(select.vm.busy).toBe(false)
    })

    it('should update iv when v-model changes when mode=single, object=false', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
      })

      select.vm.$parent.value = 1
      await nextTick()
      expect(select.vm.iv).toStrictEqual(select.vm.getOption(1))

      select.vm.$parent.value = 2
      await nextTick()
      expect(select.vm.iv).toStrictEqual(select.vm.getOption(2))

      select.vm.$parent.value = null
      await nextTick()
      expect(select.vm.iv).toStrictEqual({})

      select.vm.$parent.value = undefined
      await nextTick()
      expect(select.vm.iv).toStrictEqual({})

      select.vm.$parent.value = false
      await nextTick()
      expect(select.vm.iv).toStrictEqual({})

      select.vm.$parent.value = 4
      await nextTick()
      expect(select.vm.iv).toStrictEqual({})
    })

    it('should update iv when v-model changes when mode=single, object=true', async () => {
      let select = createSelect({
        value: null,
        options: [1,2,3],
        object: true,
      })

      select.vm.$parent.value = { value: 2, label: 2 }
      await nextTick()
      expect(select.vm.iv).toStrictEqual(select.vm.getOption(2))

      select.vm.$parent.value = { value: 3, label: 3 }
      await nextTick()
      expect(select.vm.iv).toStrictEqual(select.vm.getOption(3))

      select.vm.$parent.value = null
      await nextTick()
      expect(select.vm.iv).toStrictEqual({})

      select.vm.$parent.value = undefined
      await nextTick()
      expect(select.vm.iv).toStrictEqual({})

      select.vm.$parent.value = false
      await nextTick()
      expect(select.vm.iv).toStrictEqual({})

      select.vm.$parent.value = { value: 5, label: 5 }
      await nextTick()
      expect(select.vm.iv).toStrictEqual({ value: 5, label: 5 })
    })

    it('should update iv when v-model changes when mode=multiple, object=false', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: null,
        options: [false,1,2,3],
      })

      select.vm.$parent.value = [1]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([select.vm.getOption(1)])

      select.vm.$parent.value = [2, 1]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([
        select.vm.getOption(2),
        select.vm.getOption(1),
      ])

      select.vm.$parent.value = null
      await nextTick()
      expect(select.vm.iv).toStrictEqual([])

      select.vm.$parent.value = undefined
      await nextTick()
      expect(select.vm.iv).toStrictEqual([])

      select.vm.$parent.value = [false]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([{
        label: false,
        value: false,
      }])

      select.vm.$parent.value = []
      await nextTick()
      expect(select.vm.iv).toStrictEqual([])

      select.vm.$parent.value = [4]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([])
    })

    it('should not have value which is not among options when allowAbsent: false', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: null,
        options: [false,1,2,3],
        allowAbsent: false,
      })

      select.vm.$parent.value = [4]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([])
    })

    it('should have value which is not among options when allowAbsent: true', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: null,
        options: [false,1,2,3],
        allowAbsent: true,
      })

      select.vm.$parent.value = [4]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([{
        label: 4,
        value: 4,
      }])
    })

    it('should update iv when v-model changes when mode=multiple, object=true', async () => {
      let select = createSelect({
        mode: 'multiple',
        value: null,
        options: [false,1,2,3],
        object: true,
      })

      select.vm.$parent.value = [{ value: 2, label: 2 }]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([select.vm.getOption(2)])

      select.vm.$parent.value = [{ value: 3, label: 3 }, { value: 2, label: 2 }]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([
        select.vm.getOption(3),
        select.vm.getOption(2),
      ])

      select.vm.$parent.value = null
      await nextTick()
      expect(select.vm.iv).toStrictEqual([])

      select.vm.$parent.value = undefined
      await nextTick()
      expect(select.vm.iv).toStrictEqual([])

      select.vm.$parent.value = [false]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([false])

      select.vm.$parent.value = []
      await nextTick()
      expect(select.vm.iv).toStrictEqual([])

      select.vm.$parent.value = [{ value: 5, label: 5 }]
      await nextTick()
      expect(select.vm.iv).toStrictEqual([{ value: 5, label: 5 }])
    })

    it('should update ro when :options property get assigned', async () => {
      let select = createSelect()

      $set(select.vm, select.vm.$parent.props, 'options', [1,2,3])

      await nextTick()

      expect(select.vm.fo).toStrictEqual([
        { value: 1, label: 1, },
        { value: 2, label: 2, },
        { value: 3, label: 3, },
      ])
    })

    it('should update ro when :options property changes when options are not async', async () => {
      let select = createSelect({
        options: [1,2,3],
      })

      select.vm.$parent.props.options = [4,5,6]

      await nextTick()

      expect(select.vm.fo).toStrictEqual([
        { value: 4, label: 4, },
        { value: 5, label: 5, },
        { value: 6, label: 6, },
      ])
    })

    it('should update ro when :options children changes', async () => {
      let select = createSelect({
        options: [1,2,3],
      })

      select.vm.$parent.props.options.push(4)

      await nextTick()

      expect(select.vm.fo).toStrictEqual([
        { value: 1, label: 1, },
        { value: 2, label: 2, },
        { value: 3, label: 3, },
        { value: 4, label: 4, },
      ])
    })

    it('should set value when changed upon changin options too when mode=single', async () => {
      let select = createSelect({
        options: [],
      })

      select.vm.$parent.props.options = [1,2,3]
      select.vm.$parent.value = 1

      await nextTick()

      expect(getValue(select)).toBe(1)
    })

    it('should set value when changed upon changin options too when mode=multiple', async () => {
      let select = createSelect({
        mode: 'multiple',
        options: [],
      })

      select.vm.$parent.props.options = [1,2,3]
      select.vm.$parent.value = [1,2]

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
    })

    it('should set value when changed upon changin options too when mode=tags', async () => {
      let select = createSelect({
        mode: 'tags',
        options: [],
      })

      select.vm.$parent.props.options = [1,2,3]
      select.vm.$parent.value = [1,2]

      await nextTick()

      expect(getValue(select)).toStrictEqual([1,2])
    })
  })
})