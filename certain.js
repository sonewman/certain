var assert = require('assert')
var extend = require('util-extend')
var eqs = require('./lib/equals')
var utils = require('./lib/utils')
var normPrimitive = utils.normalisePrimitive
var normResult = utils.normaliseResult

function certain(value) {
  return new Certain(value)
}

// throws on fail
certain.throws = true
// returns results on success
// (and failure is certain.throws == false)
certain.results = false


module.exports = certain


function Certain(value, inv) {
  this.__val__ = value
  this.__inverted__ = inv || false
}

Object.defineProperty(Certain.prototype, 'not', {
  get: function () {
    this.__inverted__ = !this.__inverted__
    return this
  }
})

;['be', 'to', 'does', 'is'].forEach(function (key) {
  Object.defineProperty(Certain.prototype, key, {
    get: function () { return this }
  })
})


function assert_(certain, details) {
  var err
  if (!details.ok) err = utils.fail(details)
  if (certain.throws && err) throw err 
  return details
}

function assertValue(value, expected, inv) {
  var res = !inv ? value === expected : value !== expected
  return normResult(inv, res, '===', '!==')
}


Certain.prototype.assert
= Certain.prototype.isTrue
= Certain.prototype['true']
= function isTrue(msg) {
  var value = normPrimitive(this.__val__)
  var inv = this.__inverted__
  var result = extend({
    actual: value
    , expected: true
    , msg: msg
    , callee: arguments[1] || isTrue
  }, assertValue(value, true, inv))
  
  return assert_(this, result)
}

Certain.prototype.isFalse
= Certain.prototype['false']
= function isFalse(msg) {
  var value = normPrimitive(this.__val__)
  var inv = this.__inverted__
  var result = extend({
    actual: value
    , expected: false
    , msg: msg
    , callee: arguments[1] || isFalse
  }, assertValue(value, false, inv))
  
  return assert_(this, result)
}

function isOK(value, inv) {
  return normResult(inv, !inv ? !!value : !value, '==', '!=')
}

Certain.prototype.ok 
= function ok(msg) {
  var value = normPrimitive(this.__val__)
  var inv = this.__inverted__
  
  var result = extend({
    actual: value
    , expected: expected
    , msg: msg
    , callee: arguments[1] || ok
  }, isOK(value, inv))

  return assert_(this, result)
}

function normEquals(inversed, result) {
  return !inversed ? result : !result
}

function eqls(actual, expected, inv) {
  var result = normEquals(inv, eqs.triple(actual, expected))
  return normResult(inv, result, '===', '!==')
}

Certain.prototype.equal
= Certain.prototype.equals
= function equal(expected, msg) {
  var actual = normPrimitive(this.__val__)
  expected = normPrimitive(expected)

  var inv = this.__inverted__
  var result = extend({
    actual: actual
    , expected: expected
    , msg: msg
    , callee: arguments[2] || equal
  }, eqls(actual, expected, inv))

  return assert_(this, result)
}

function deepEqls(actual, expected, inv) {
  var result = normEquals(inv, eqs.deep(actual, expected))
  return normResult(inv, result, '===', '!==')
}

Certain.prototype.deepEqual 
= Certain.prototype.deepEquals 
= Certain.prototype.eql 
= function deepEquals(expected, msg) {
  var actual = normPrimitive(this.__val__)
  expected = normPrimitive(expected)

  var inv = this.__inverted__
  var result = extend({
    actual: actual
    , expected: expected
    , msg: msg
    , callee: arguments[2] || deepEquals
  }, deepEqls(actual, expected, inv))

  return assert_(this, result)
}

function throws(does, inv) {
  return normResult(inv, does, 'should', 'should not')
}

Certain.prototype.throws
= Certain.prototype.throwsError
= function throws(msg) {
  var does = false
  try { this.__val__() } 
  catch (err) { does = true }
  
  var inv = this.__inverted__
  var result = extend({
    actual: does ? 'throws' : 'not throws'
    , expected: !inv ? 'throw': 'not throw'
    , msg: msg
    , callee: arguments[2] || throws
  }, throws(does, inv))

  return assert_(this, result)
}
