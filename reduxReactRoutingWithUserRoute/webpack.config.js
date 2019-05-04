module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: './bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  devServer: {
    historyApiFallback: true,
  }
};