import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    ts({
      include: 'src/**'
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    })
  ]
}
