import { customRef, readonly } from 'vue'

// Polyfill for Vue <3.3 for getters only
// https://vuejs.org/api/reactivity-utilities.html#toref
export default function toRef (get) {
    return readonly(customRef(() => ({ get, set: () => { } })))
}