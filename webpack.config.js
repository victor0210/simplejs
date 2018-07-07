const resolve = dir => require('path').join(__dirname, '..', dir)

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
        include: [resolve('/src')],
        query: {
          presets: ['env', ['es2015', {modules: false}]]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      resolve('/src'),
      resolve('/node_modules')
    ],
    alias: {
      'src': resolve('/src')
    }
  },
  output: {
    filename: 'bundle.js',
    path: resolve('/dist')
  }
}
