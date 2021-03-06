# webpack-tape-run

[![npm package](https://img.shields.io/badge/npm-0.0.7-blue.svg)](https://www.npmjs.com/package/webpack-tape-run)
[![Build Status](https://travis-ci.org/syarul/webpack-tape-run.svg?branch=master)](https://travis-ci.org/syarul/webpack-tape-run)

The excellent [tape-run](https://github.com/juliangruber/tape-run) ported as [webpack](https://webpack.github.io/) plugin

Runs webpack with the generated output bundle in browser with tape-run (headless or non-headless) and parses the output as tape. 
This works well with ```webpack --watch``` as it will run your test every time a file changed.

## Usage

```javascript
var WebpackTapeRun = require('webpack-tape-run')

new WebpackTapeRun(opts)
```
- **opts.tapeRun**: *(object)* ***optional*** tape-run options.
- **opts.reporter**: *(string)* ***optional*** reporter options.

```javascript
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
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js']
  },
  plugins: [
    new webpackTapeRun({
      tapeRun: {
       browser: 'phantomjs'
      },
      reporter: 'tap-spec'
    })
  ]
}
```

By default it parses the output to ```process.stdout```. You can specify a [reporter](https://github.com/sindresorhus/awesome-tap#reporters) as an option for the output, 
if you using [coverify](https://github.com/substack/coverify), you also need [transform-loader](https://github.com/webpack-contrib/transform-loader) in 
the ```webpack.config.js```. see [this](https://github.com/syarul/webpack-tape-run/blob/master/webpack.test.js) for a working example
