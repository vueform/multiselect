import vue from 'vue-prev-rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.vue2.js',
      format: 'esm',
    },
    plugins: [
      vue(),
    ],
    external: ['vue'],
  },
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.vue2.global.js',
      format: 'iife',
      name: 'VueformMultiselect',
      globals: {
        'vue': 'Vue',
      }
    },
    plugins: [
      vue(),
      terser()
    ],
    external: ['vue'],
  }
]