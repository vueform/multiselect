import vue from 'vue-next-rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import base from './base.rollup.config'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default [
  Object.assign({}, base, {
    output: {
      file: 'dist/multiselect.js',
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
  }),
  {
    input: 'src/Multiselect.vue',
    output: {
      file: 'dist/multiselect.umd.js',
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
              'composition-api': 'Vue',
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