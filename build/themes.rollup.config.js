const fs = require('fs')

import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

const themes = fs.readdirSync(__dirname + '/../themes').filter(f=>f.indexOf('.scss') !== -1).map(f=>f.replace('.scss',''))

export default themes.map((theme) => {
  return {
    input: `themes/${theme}.scss`,
    output: {
      file: `themes/${theme}.css`,
      format: 'esm',
    },
    plugins: [
      postcss({
        extract: true,
        minimize: theme === 'tailwind' ? false : true,
        plugins: [
          autoprefixer(),
        ]
      }),
    ]
  }
})