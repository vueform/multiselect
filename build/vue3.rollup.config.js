import vue from 'vue-next-rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.js',
      format: 'esm',
    },
    plugins: [
      vue(),
      babel({
        babelHelpers: 'runtime',
        skipPreflightCheck: true,
      }),
      alias({
        entries: [
          { find: 'composition-api', replacement: 'vue' },
        ]
      }),
      terser(),
    ],
    external: 'vue',
  },
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.global.js',
      format: 'iife',
      name: 'VueformMultiselect',
      globals: {
        'composition-api': 'Vue',
        'vue': 'Vue',
      }
    },
    plugins: [
      vue(),
      babel({
        babelHelpers: 'bundled',
      }),
      terser()
    ],
    external: ['composition-api', 'vue'],
  }
]