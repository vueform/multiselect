import vue from 'vue-prev-rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.vue2.js',
      format: 'esm',
    },
    plugins: [
      vue(),
      nodeResolve({
        resolveOnly: ['@popperjs/core']
      }),
    ],
    external: ['vue'],
  },
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.vue2.min.js',
      format: 'esm',
    },
    plugins: [
      vue(),
      nodeResolve({
        resolveOnly: ['@popperjs/core']
      }),
      terser()
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
      nodeResolve({
        resolveOnly: ['@popperjs/core']
      }),
      terser()
    ],
    external: ['vue'],
  }
]