import vue from 'vue-next-rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.js',
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
      file: 'dist/multiselect.min.js',
      format: 'esm',
    },
    plugins: [
      vue(),
      nodeResolve({
        resolveOnly: ['@popperjs/core']
      }),
      terser(),
    ],
    external: ['vue'],
  },
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.mjs',
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
      file: 'dist/multiselect.global.js',
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
      terser(),
    ],
    external: ['vue'],
  }
]