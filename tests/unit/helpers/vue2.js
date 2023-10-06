import { mount, createLocalVue } from '@vue/test-utils'
import Multiselect from './../../../dist/multiselect.vue2'

export const createSelect = (props = {}, options = {}) => {
  const localVue = createLocalVue()

  localVue.use({
    install(vue) {
      vue.mixin({
        data: () => ({
          vueVersionMs: 2
        })
      })
    }
  })

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
    case 'left':
      wrapper.trigger(event, { key: 'ArrowLeft' })
      break
    case 'right':
      wrapper.trigger(event, { key: 'ArrowRight' })
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
    at: (i) => { return res.at(i) },
    length: res.length,
  }
}

export const getValue = (select) => {
  return select.vm.value
}

export const $set = (component, object, name, value) => {
  return component.$set(object, name, value)
}