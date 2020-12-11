import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/Multiselect.vue',
  plugins: [
    getBabelOutputPlugin({
      configFile: './babel.config.js',
    }),
    babel({
      babelHelpers: 'runtime',
      skipPreflightCheck: true
    }),
    terser()
  ],
}