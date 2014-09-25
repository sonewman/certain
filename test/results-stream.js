
var certain = require('../')
var withResults = certain.withResults
var Writable = require('readable-stream').Writable

var describe = require('macchiato')

describe('results-stream', function () {
  it('Should pass along assert results', function (t) {

    var count = 0
    var writable = new Writable({ objectMode: true })
    writable._write = function (result, enc, next) {
      certain(typeof result).equals('object')

      switch (++count) {
        case 1:
          certain(result.expected).equals('a')
          certain(result.actual).equals('a')
          certain(result.operator).equals('===')
          certain(result.ok).is.true()
          break

        case 2:
          certain(result.expected).equals(2)
          certain(result.actual).equals(1)
          certain(result.operator).equals('!==')
          certain(result.ok).is.true()
          break

        case 3:
          certain(result.expected).deepEquals(null)
          certain(result.actual).deepEquals({})
          certain(result.operator).equals('===')
          certain(result.ok).is.false()
          certain(result.error instanceof Error).is.true()
          t.pass()
          t.end()
          break
      }

      next()
    }

    var certainResults = withResults()
    certainResults.readStream.pipe(writable)

    certainResults('a').equals('a')
    certainResults(1).not.equals(2)
    certainResults({}).equals(null)
  })
})
