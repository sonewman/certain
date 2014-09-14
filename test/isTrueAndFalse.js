var certain = require('../')
var describe = require('macchiato')

describe('isTrue()', function () {
  it('Should not throw if true', function (t) {
    certain(true).isTrue()
    t.pass()
    t.end()
  })

  it('Should throw error if not true', function (t) {
    try {
      certain(false).is.true()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

  it('Should not throw if not passed boolean', function (t) {
    try {
      certain('something').isTrue()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
})

describe('not.true()', function (t) {
  it('Should not throw if correct', function (t) {
    certain(false).is.not.true()
    t.pass()
    t.end()
  })
  
  it('Should throw error if wrong', function (t) {
    try {
      certain(true).is.not.true()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with arbitrary value is `not true` is correct', function (t) {
    certain('something').is.not.true()
    t.pass()
    t.end()
  })

})

describe('isFalse()', function () {
  it('Should not throw if true', function (t) {
    certain(false).is.false()
    t.pass()
    t.end()
  })

  it('Should throw error if not true', function (t) {
    try {
      certain(true).isFalse()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

  it('Should not throw if not passed boolean', function (t) {
    debugger
    try {
      certain('something').is.false()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
})

describe('not.false()', function (t) {
  it('Should not throw if correct', function (t) {
    certain(true).is.not.false()
    t.pass()
    t.end()
  })
  
  it('Should throw error if wrong', function (t) {
    try {
      certain(false).is.not.false()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with arbitrary value is `not true` is correct', function (t) {
    certain('something').is.not.false()
    t.pass()
    t.end()
  })

})
