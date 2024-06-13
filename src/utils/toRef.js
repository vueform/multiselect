import { customRef } from 'vue'

// Polyfill for Vue <3.3 for getters only
// https://vuejs.org/api/reactivity-utilities.html#toref
export default function toRef (get) {
    return customRef(() => ({ get, set: /* istanbul ignore next */ () => { } }))
}