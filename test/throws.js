var certain = require('../')
var describe = require('macchiato')

describe('throws()', function () {
  
  it('Should not throw if function throws', function (t) {
    certain(function () {
      throw new Error('foo')
    }).throws()
    t.pass()
    t.end()
  })
  
  it('Should throw if function does not throw', function (t) {
    try {
      certain(function () {
        return true
      }).does.throw()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
})

describe('does.not.throw()', function () {
  
  it('Should not throw if function throws', function (t) {
    certain(function () {
      throw new Error('foo')
    }).does.not.throw()
    t.pass()
    t.end()
  })
  
  it('Should throw if function does not throw', function (t) {
    try {
      certain(function () {
        return true
      }).does.not.throw()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
})
