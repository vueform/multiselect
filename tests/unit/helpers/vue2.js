import { mount, createLocalVue } from '@vue/test-utils'
import CompositionApi from 'composition-api'
import Multiselect from './../../../src/Multiselect'

export const createSelect = (props = {}, options = {}) => {
  const localVue = createLocalVue()
  localVue.use(CompositionApi)

  let config = {
    localVue,
  }

  if (options.attach) {
    config.attachTo = document.querySelector('body')
  }

  let wrapper = mount({
    data() {
      return {
        value: props.value,
        props: props,
      }
    },
    template: `
      <div>
        <Multiselect
          v-model="value"
          v-bind="props"
        />
      </div>
    `,
    components: {
      Multiselect,
    }
  }, config)

  return wrapper.findAllComponents({ name: 'Multiselect' }).at(0)
}

export const destroy = (wrapper) => {
  wrapper.destroy()
} 

const keyEvent = (event, wrapper, key) => {
  switch (key) {
    case 'escape':
      wrapper.trigger(event, { keyCode: 27 })
      break
    case 'backspace':
      wrapper.trigger(event, { keyCode: 8 })
      break
    case 'up':
      wrapper.trigger(event, { keyCode: 38 })
      break
    case 'down':
      wrapper.trigger(event, { keyCode: 40 })
      break
    case 'enter':
      wrapper.trigger(event, { keyCode: 13 })
      break
  }
}

export const keyup = (wrapper, key) => {
  keyEvent('keyup', wrapper, key)
}

export const keydown = (wrapper, key) => {
  keyEvent('keydown', wrapper, key)
}

export const findAll = (parent, query) => {
  let res = parent.findAll(query)

  return {
    at: (i) => { return res.at(i) },
    length: res.length,
  }
}

export const getValue = (select) => {
  return select.vm.value
}