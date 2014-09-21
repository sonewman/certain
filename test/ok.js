var certain = require('../')
var describe = require('macchiato')

describe('ok()', function () {
  it('Should not throw with a truthy string value', function (t) {
    certain('a').is.ok()
    t.pass()
    t.end()
  })

  it('Should throw with a falsey string value', function (t) {
    try {
      certain('').is.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

  it('Should not throw with a truthy number value', function (t) {
    certain(1).is.ok()
    t.pass()
    t.end()
  })
  
  it('Should throw with a falsey number value', function (t) {
    try {
      certain(0).is.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

  it('Should not throw with a truthy boolean value', function (t) {
    certain(true).is.ok()
    t.pass()
    t.end()
  })
  
  it('Should throw with a falsey boolean value', function (t) {
    try {
      certain(false).is.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with a truthy object value', function (t) {
    certain({}).is.ok()
    t.pass()
    t.end()
  })
  
  it('Should throw with a null object', function (t) {
    try {
      certain(null).is.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should throw with an undefined value', function (t) {
    try {
      certain(undefined).is.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should throw with a NaN value', function (t) {
    try {
      certain(Number('a')).is.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with an Infinity value', function (t) {
    certain(Infinity).is.ok()
    certain(-Infinity).is.ok()
    t.pass()
    t.end()
  })
})

describe('not.ok()', function () {
  it('Should not throw with a falsey string value', function (t) {
    certain('').is.not.ok()
    t.pass()
    t.end()
  })

  it('Should throw with a truthy string value', function (t) {
    try {
      certain('a').is.not.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

  it('Should not throw with a falsey number value', function (t) {
    certain(0).is.not.ok()
    t.pass()
    t.end()
  })
  
  it('Should throw with a truthy number value', function (t) {
    try {
      certain(1).is.not.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

  it('Should not throw with a falsey boolean value', function (t) {
    certain(false).is.not.ok()
    t.pass()
    t.end()
  })
  
  it('Should throw with a truthy boolean value', function (t) {
    try {
      certain(true).is.not.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with a null object', function (t) {
    certain(null).is.not.ok()
    t.pass()
    t.end()
  })
  
  it('Should throw with a truthy object', function (t) {
    try {
      certain({}).is.not.ok()
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  
  it('Should not throw with an undefined value', function (t) {
    certain(undefined).is.not.ok()
    t.pass()
    t.end()
  })
  
  it('Should not throw with a NaN value', function (t) {
    certain(Number('a')).is.not.ok()
    t.pass()
    t.end()
  })
  
  it('Should throw with an Infinity value', function (t) {
    try {
      certain(Infinity).is.not.ok()
      t.fail()
    } catch (err) {
      try {
        certain(-Infinity).is.not.ok()
        t.fail()
      } catch (err2) {
        t.pass()
      }
    }
    t.end()
  })
})
