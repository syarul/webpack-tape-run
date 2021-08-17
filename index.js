const runParallel = require('run-parallel')
const execSpawn = require('execspawn')
const tapeRun = require('tape-run')
const str = require('string-to-stream')

class WebpackTapeRun {
  constructor (options) {
    this.options = options || {}
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('WebpackTapeRun', run.bind(null, this.options))

    async function run (options, compilation, callback) {
      const source = []
    
      compilation.chunks
        .forEach((chunk) => {
          if (chunk.hasRuntime()) {
            const files = []
            chunk.files.forEach((filename) => {
              files.push(compilation.assets[filename].source())
            })
            source.push(files.join('\n'))
          }
        })
    
      const stream = str(source.join('\n'))
        .pipe(tapeRun(options.tapeRun))
    
      return runParallel([
        options.reporter ? report : _default,
        exit
      ], callback)
    
      function report (callback) {
        const reporter = execSpawn(options.reporter,
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
  }
}

module.exports = WebpackTapeRun
