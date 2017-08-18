var webpackTapeRun = require('./')
var path = require('path')

module.exports = {
  target: 'web',
  entry: ['./test'],
  node: {
    fs: 'empty'
  },
  output: {
    path: path.resolve(__dirname, './output'),
    filename: 'test.js'
  },
  module: {
    rules: [
      {
        loader: 'transform-loader?coverify',
        enforce: 'post',
        exclude: [/node_modules/]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js']
  },
  plugins: [
    new webpackTapeRun({
      tapeRun: {
       /* browser: 'phantomjs'*/
      },
      reporter: 'coverify'
    })
  ]
}