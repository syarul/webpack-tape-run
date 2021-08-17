# webpack-tape-run

[![npm package](https://img.shields.io/badge/npm-1.0.0-blue.svg)](https://www.npmjs.com/package/webpack-tape-run)
[![Build Status](https://travis-ci.org/syarul/webpack-tape-run.svg?branch=master)](https://travis-ci.org/syarul/webpack-tape-run)

The excellent [tape-run](https://github.com/juliangruber/tape-run) ported as [webpack](https://webpack.github.io/) plugin

Runs webpack with the generated output bundle in browser with tape-run (headless or non-headless). 
This works well with ```webpack --watch``` as it will run your test every time a file changed.

## Webpack 5.x.x changes

Updated to support Webpack 5.x.x, some modules require in the webpack config for this to work :-
- path-browserify
- stream-browserify
- process/browser

## Usage

```javascript
var WebpackTapeRun = require('webpack-tape-run')

new WebpackTapeRun(opts)
```
- **opts.tapeRun**: *(object)* ***optional*** tape-run options.
- **opts.reporter**: *(string)* ***optional*** reporter options.

```javascript
module.exports = {
  entry: './test',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './output'),
    filename: 'test.js'
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
       browser: 'phantomjs'
      },
      reporter: 'tap-spec'
    })
  ]
}
```

By default, output is pipe to ```process.stdout```. You can specify a [reporter](https://github.com/sindresorhus/awesome-tap#reporters) as an option for the output, 
if you using [coverify](https://github.com/substack/coverify), you also need [transform-loader](https://github.com/webpack-contrib/transform-loader) in 
the ```webpack.config.js```. see [this](https://github.com/syarul/webpack-tape-run/blob/master/webpack.test.js) for a working example
