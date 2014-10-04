var certain = require('../')
var describe = require('macchiato')

describe('equals()', function () {
  it('Should not throw with two matching strings', function (t) {
    certain('a').equals('a')
    t.pass()
    t.end()
  })

  it('Should throw error if not equal', function (t) {
    try {
      certain('a').equals('b')
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

  it('Should not throw with two matching objects', function (t) {
    var a = { a: 1 }
    var b = a
    certain(a).equals(b)
    t.pass()
    t.end()
  })
})

describe('not.equals()', function (t) {
  it('Should not throw with two not matching strings', function (t) {
    certain('a').not.equals('b')
    t.pass()
    t.end()
  })
  
  it('Should throw error if equal', function (t) {
    try {
      certain('a').not.equals('a')
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should throw with two matching objects', function (t) {
    var a = { a: 1 }
    var b = a
    try {
      certain(a).not.equals(b)
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

})

describe('notEquals()', function (t) {
  it('Should not throw with two not matching strings', function (t) {
    certain('a').notEquals('b')
    t.pass()
    t.end()
  })
  
  it('Should throw error if equal', function (t) {
    try {
      certain('a').notEquals('a')
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should throw with two matching objects', function (t) {
    var a = { a: 1 }
    var b = a
    try {
      certain(a).notEquals(b)
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

})
