import vue from 'vue-prev-rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import base from './base.rollup.config'

export default Object.assign({}, base, {
  output: {
    file: 'dist/multiselect.vue2.js',
    format: 'esm',
  },
  plugins: base.plugins.concat([
    vue(),
    alias({
      entries: [
        { find: 'composition-api', replacement: '@vue/composition-api' },
      ]
    }),
  ]),
  external: '@vue/composition-api',
})