import vue from 'vue-next-rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import base from './base.rollup.config'

export default Object.assign({}, base, {
  output: {
    file: 'dist/multiselect.vue3.js',
    format: 'esm',
  },
  plugins: base.plugins.concat([
    vue(),
    alias({
      entries: [
        { find: 'composition-api', replacement: 'vue' },
      ]
    }),
  ]),
  external: 'vue',
})