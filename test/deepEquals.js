var certain = require('../')
var describe = require('macchiato')

describe('deepEquals(\'a\', \'a\')', function () {
  it('Should not throw with two matching strings', function (t) {
    certain('a').deepEquals('a')
    t.pass()
    t.end()
  })

  it('Should throw error if not equal', function (t) {
    try {
      certain('a').deepEquals('b')
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

  it('Should not throw with two matching objects', function (t) {
    certain({ a: 1 }).deepEquals({ a: 1 })
    t.pass()
    t.end()
  })
})

describe('not.deepEquals()', function (t) {
  it('Should not throw with two not matching strings', function (t) {
    certain('a').not.deepEquals('b')
    t.pass()
    t.end()
  })
  
  it('Should throw error if not equal', function (t) {
    try {
      certain('a').not.deepEquals('a')
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with two matching objects', function (t) {
    certain({ a: 1 }).not.deepEquals({ b: 2 })
    t.pass()
    t.end()
  })

})
