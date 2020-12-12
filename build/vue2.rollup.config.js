import vue from 'vue-prev-rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import base from './base.rollup.config'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default [
  Object.assign({}, base, {
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
  }),
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.vue2.umd.js',
      format: 'esm',
    },
    plugins: base.plugins.concat([
      vue(),
      getBabelOutputPlugin({
        presets: [
          ['@babel/preset-env', {
            modules: false,
          }]
        ],
        plugins: [
          ['@babel/plugin-transform-modules-umd', {
            'globals': {
              'composition-api': 'VueCompositionAPI',
              'vue': 'Vue',
            }
          }]
        ],
        moduleId: 'VueFormMultiselect',
      }),
      babel({
        babelHelpers: 'runtime',
        skipPreflightCheck: true
      }),
      terser()
    ]),
    external: ['vue', 'composition-api'],
  }
]