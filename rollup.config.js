import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'

/**
 * TODO: divide dev & prod
 * */
export default {
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
