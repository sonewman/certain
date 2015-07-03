var certain = require('../')
var describe = require('macchiato')

describe('error()', function () {
  it('Should throw if given an error', function (t) {
    var err = new Error('foo')
    try {
      certain(err).error()
      t.fail()
    } catch (er) {
      t.equals(err, er)
      t.end()
    }
  })

  it('Should throw new error if none given', function (t) {
    try {
      certain().error()
      t.fail()
    } catch (err) {
      t.equals(Object.prototype.toString.call(err), '[object Error]')
      t.end()
    }
  })
})
