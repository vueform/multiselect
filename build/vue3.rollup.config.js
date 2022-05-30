import vue from 'vue-next-rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.js',
      format: 'esm',
    },
    plugins: [
      alias({
        entries: [
          { find: 'composition-api', replacement: 'vue' },
        ]
      }),
      vue(),
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
      alias({
        entries: [
          { find: 'composition-api', replacement: 'vue' },
        ]
      }),
      vue(),
      terser(),
    ],
    external: ['vue'],
  }
]