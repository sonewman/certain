var certain = require('../')
var describe = require('macchiato')

describe('pass()', function () {
  it('Should not throw if function throws', function (t) {
    certain().pass()
    t.pass()
    t.end()
  })
})

describe('not.fail()', function () {
  it('Should throw if function does not throw', function (t) {
    certain().not.fail()
    t.pass()
    t.end()
  })
})

describe('fail()', function () {
  it('Should throw if `fail` is called', function (t) {
    try {
      certain().fail()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
})

describe('not.pass()', function () {
  it('Should throw if `not.pass` is called', function (t) {
    try {
      certain().not.pass()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
})
