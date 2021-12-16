import { mount } from '@vue/test-utils'
import Multiselect from './../../../src/Multiselect'

export const createSelect = (props = {}, options = {}) => {
  let config = {}

  document.body.innerHTML = `
    <div>
      <div id="app"></div>
    </div>
  `

  if (options.attach) {
    config.attachTo = document.getElementById('app')
  }

  let wrapper = mount({
    data() {
      return {
        value: props.value,
        props: props
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

  return wrapper.findAllComponents({ name: 'Multiselect' })[0]
}

export const destroy = (wrapper) => {} 

const keyEvent = (event, wrapper, key) => {
  if (typeof key === 'object') {
    wrapper.trigger(event, key)
    return
  }

  switch (key) {
    case 'esc':
      wrapper.trigger(event, { key: 'Escape' })
      break
    case 'backspace':
      wrapper.trigger(event, { key: 'Backspace' })
      break
    case 'up':
      wrapper.trigger(event, { key: 'ArrowUp' })
      break
    case 'down':
      wrapper.trigger(event, { key: 'ArrowDown' })
      break
    case 'enter':
      wrapper.trigger(event, { key: 'Enter' })
      break
    case 'space':
      wrapper.trigger(event, { key: ' ' })
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
    at: (i) => { return res[i] },
    length: res.length,
  }
}

export const getValue = (select) => {
  return select.vm.modelValue
}

export const $set = (component, object, name, value) => {
  return object[name] = value
}