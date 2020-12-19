import vue from 'vue-prev-rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
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
      babel({
        babelHelpers: 'runtime',
        skipPreflightCheck: true,
      }),
      alias({
        entries: [
          { find: 'composition-api', replacement: '@vue/composition-api' },
        ]
      }),
      terser(),
    ],
    external: ['@vue/composition-api'],
  },
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.vue2.global.js',
      format: 'iife',
      name: 'VueformMultiselect',
      globals: {
        'composition-api': 'VueCompositionAPI',
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