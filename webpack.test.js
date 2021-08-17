const WebpackTapeRun = require('./')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './test',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './output'),
    filename: 'test.js'
  },
  module: {
    rules: [
      {
        loader: 'transform-loader',
        enforce: 'post',
        exclude: [/node_modules/],
        options: {
          coverify: true
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js'],
    fallback: {
      fs: false,
      buffer: false,
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify')
    }
  },
  target: 'web',
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new WebpackTapeRun({
      tapeRun: {
        /* browser: 'phantomjs' */
      },
      reporter: 'coverify'
    })
  ]
}
