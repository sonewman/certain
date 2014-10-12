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
    certain(function () { return true }).deepEquals(function () { return true })
    t.pass()
    t.end()
  })
  
  it('Should throw with two different functions', function (t) {
    try {
      certain(function () { return true }).deepEquals(function () { return false })
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
  
  it('Should throw with two different objects', function (t) {
    try {
      certain({ a: 1 }).deepEquals({ a: 2 })
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should throw with two different objects with a different number of keys', function (t) {
    try {
      certain({ a: 1 }).deepEquals({ a: 1, b: 2 })
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with a string and number of equal value', function (t) {
    certain(1).deepEquals('1')
    t.pass()
    t.end()
  })
  
  it('Should not throw with a number and string of equal value', function (t) {
    certain('1').deepEquals(1)
    t.pass()
    t.end()
  })
  
  it('Should not throw two NaN values', function (t) {
    certain(Number('a')).deepEquals(Number('b'))
    t.pass()
    t.end()
  })
  
  it('Should throw with number value and NaN', function (t) {
    try {
      certain(1).deepEquals(Number('a'))
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with two arrays containing equal values', function (t) {
    certain([1, 2, 3]).deepEquals([1, 2, 3])
    t.pass()
    t.end()
  })
  
  it('Should throw with two arrays similar values one shorter than the next', function (t) {
    try {
      certain([1, 2, 3, 4]).deepEquals([1, 2, 3])
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should throw with two same length arrays with different values', function (t) {
    try {
      certain([1, 2, 3]).deepEquals([4, 5, 6])
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with two dates of equal value', function (t) {
    certain(new Date('10:23 09/21/2014')).deepEquals(new Date('10:23 09/21/2014'))
    t.pass()
    t.end()
  })
  
  it('Should throw with two dates of different values', function (t) {
    try {
      certain(new Date('10:23 09/21/2014')).deepEquals(new Date('10:23:01 09/21/2014'))
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should throw an object and a number value', function (t) {
    try {
      certain({}).deepEquals(1)
      t.fail()
    } catch (err) {
      t.pass()
    }
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
    certain({ a: 1 }).notDeepEquals({ b: 2 })
    t.pass()
    t.end()
  })

})
