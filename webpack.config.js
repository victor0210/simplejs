const path = require('path')
// const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  entry: {
    path: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
        query: {
          presets: ['env', ['es2015', {modules: false}]]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
			path.resolve(__dirname, 'src'),
			path.resolve(__dirname, 'node_modules')
    ],
    alias: {
      'src': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
