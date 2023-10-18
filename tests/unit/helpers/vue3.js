import { mount } from '@vue/test-utils'
import Multiselect from './../../../src/Multiselect.vue'

export const createSelect = (props = {}, options = {}, returnWrapper = false) => {
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

  return returnWrapper
    ? wrapper
    : wrapper.findAllComponents({ name: 'Multiselect' })[0]
}

export const destroy = (wrapper) => {} 

export const unmount = (wrapper) => {
  wrapper.unmount()
} 

const keyEvent = (event, wrapper, key) => {
  let triggerKey = ''

  if (typeof key === 'object') {
    triggerKey = key
  }

  switch (key) {
    case 'esc':
      triggerKey = 'Escape'
      break
    case 'backspace':
      triggerKey = 'Backspace'
      break
    case 'up':
      triggerKey = 'ArrowUp'
      break
    case 'down':
      triggerKey = 'ArrowDown'
      break
    case 'left':
      triggerKey = 'ArrowLeft'
      break
    case 'right':
      triggerKey = 'ArrowRight'
      break
    case 'enter':
      triggerKey = 'Enter'
      break
    case 'space':
      triggerKey = ' '
      break
  }

  let params = typeof triggerKey === 'object' ? triggerKey : { key: triggerKey }
  
  if (wrapper.trigger) {
    wrapper.trigger(event, params)
  } else {
    wrapper.dispatchEvent(new Event(event, params))

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

export const findAllComponents = (parent, query) => {
  let res = parent.findAllComponents(query)

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