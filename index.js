var runParallel = require('run-parallel')
var execSpawn = require('execspawn')
var tapeRun = require('tape-run')
var str = require('string-to-stream')

function WebpackTapeRun (options) {
  this.options = options || {}
}

WebpackTapeRun.prototype.apply = function (compiler) {
  compiler.plugin('after-emit', run.bind(null, this.options))
}

function run (options, compilation, callback) {
  var entry = compilation.chunks.filter((c) => c.hasRuntime())
  var files = entry.map((c) => c.files[0])
  var assets = files.map((f) => compilation.assets[f])
  var source = assets.map((a) => a.source()).join('\n')

  var stream = str(source)
    .pipe(tapeRun(options.tapeRun))

  return runParallel([
    options.reporter ? report : _default,
    exit
  ], callback)


  function report (callback) {
    var reporter = execSpawn(options.reporter,
      { stdio: ['pipe', 'inherit', 'inherit'] })
    stream.pipe(reporter.stdin)
    reporter.on('exit', exited)
    function exited (code) {
      if (code !== 0) addError('test reporter non-zero exit code')
      return callback()
    }
  }

  function _default (callback) {
    stream.pipe(process.stdout)
    stream.on('results', results)
    function results (code) {
      if (!code.ok) addError('test reporter non-zero exit code')
      return callback()
    }
  }

  function exit (callback) {
    stream.on('results', results)
    function results (code) {
      if (!code.ok) addError('tests failed')
      return callback()
    }
  }

  function addError (message) {
    compilation.errors.push(new Error(message))
  }
}

module.exports = WebpackTapeRun