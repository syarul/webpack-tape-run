# webpack-tape-run
The excellent [tape-run](https://github.com/juliangruber/tape-run) ported as [webpack](https://webpack.github.io/) plugin

Runs webpack with the generated output bundle in browser with tape-run (headless or non-headless) and parses the output as tape. 
This works well with ```webpack --watch``` as it will run your tests every time a file changes.

## Usage

```javascript
var  WebpackTapeRun = require('webpack-tape-run')

new WebpackTapeRun(opts)
```
- **opts.tapeRun**: *(object)* ***optional*** tape-run options.
- **opts.reporter**: *(string)* ***optional*** reporter options.

```javascript
module.exports = {
  ...
  new WebpackTapeRun({
    tapeRun: {
      browser: 'phantomjs'
    },
    reporter: 'coverify' 
  }),
  ...
```

By default it parses the output to ```process.stdout```. You can specify a [reporter](https://github.com/sindresorhus/awesome-tap#reporters) as an option for the output, 
if you using coverify, you need to also [transform-loader](https://github.com/webpack-contrib/transform-loader) in 
the ```webpack.config.js``` file see [this](https://github.com/syarul/webpack-tape-run/blob/master/webpack.test.js) for a working example
