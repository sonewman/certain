var assert = require('assert')
var extend = require('util-extend')
var eqs = require('./lib/equals')
var utils = require('./lib/utils')
var inherits = require('inherits')
var Readable = require('readable-stream').Readable
var normPrimitive = utils.normalisePrimitive
var normResult = utils.normaliseResult
var DEFAULT_ASSERT_NAME = '(unnamed assert)'

function certain(value) {
  return new Certain(value)
}

module.exports = certain

function Certain(value, inv) {
  this.__val__ = value
  this.__inverted__ = inv || false
}

certain.Certain = Certain

// throws on fail
Certain.prototype.THROWS = true

function invert() {
  /** jshint validthis:true */
  this.__inverted__ = !this.__inverted__
  return this
}

// keys which invert assertion
;['not', 'doesnt'].forEach(function (key) {
  Object.defineProperty(Certain.prototype, key, {
    get: invert
  })
})

// chaining keys added for readability
;['be', 'to', 'does', 'is'].forEach(function (key) {
  Object.defineProperty(Certain.prototype, key, {
    get: function () { return this }
  })
})

function assert_(value, expected, inv) {
  var res = !inv ? value === expected : value !== expected
  return normResult(inv, res, '===', '!==')
}

Certain.prototype._validate = function (details) {
  details.name = details.name || DEFAULT_ASSERT_NAME
  utils[details.ok ? 'pass' : 'fail'](details)

  if (this.THROWS && details.error)
    throw details.error

  return details
}

Certain.prototype.assert
= Certain.prototype.isTrue
= Certain.prototype['true']
= function isTrue(msg) {
  var actual = normPrimitive(this.__val__)

  this._validate(extend({
    actual: actual
    , expected: true
    , name: msg
    , callee: arguments[1] || isTrue
  }, assert_(actual, true, this.__inverted__)))
}

Certain.prototype.fail = function (msg) {
  this._validate({
    actual: 'Failed'
    , expected: 'Pass'
    , invalidOperator: 'test was expected to'
    , name: msg
    , callee: arguments[1] || fail
  })
}

Certain.prototype.isFalse
= Certain.prototype['false']
= function isFalse(msg) {
  var actual = normPrimitive(this.__val__)

  this._validate(extend({
    actual: actual
    , expected: false
    , name: msg
    , callee: arguments[1] || isFalse
  }, assert_(actual, false, this.__inverted__)))
}

function ok_(value, inv) {
  return normResult(inv, !inv ? !!value : !value, '==', '!=')
}

Certain.prototype.ok
= function ok(msg) {
  var actual = normPrimitive(this.__val__)

  this._validate(extend({
    actual: actual
    , expected: !this.__inverted__ ? 'true' : 'false'
    , name: msg
    , callee: arguments[1] || ok
  }, ok_(actual, this.__inverted__)))
}

function normEquals(inversed, result) {
  return !inversed ? result : !result
}

function equals_(actual, expected, inv) {
  var result = normEquals(inv, eqs.triple(actual, expected))
  return normResult(inv, result, '===', '!==')
}

Certain.prototype.equal
= Certain.prototype.equals
= function equals(expected, msg) {
  var actual = normPrimitive(this.__val__)
  expected = normPrimitive(expected)

  this._validate(extend({
    actual: actual
    , expected: expected
    , name: msg
    , callee: arguments[2] || equals
  }, equals_(actual, expected, this.__inverted__)))
}

Certain.prototype.notEquals
= Certain.prototype.notEqual
= function notEquals(expected, msg) {
  this.__inverted__ = !this.__inverted__
  return this.equals(expected, msg)
}

function deepEquals_(actual, expected, inv) {
  var result = normEquals(inv, eqs.deep(actual, expected))
  return normResult(inv, result, '===', '!==')
}

Certain.prototype.deepEqual
= Certain.prototype.deepEquals
= Certain.prototype.eqls
= function deepEquals(expected, msg) {
  var actual = normPrimitive(this.__val__)
  expected = normPrimitive(expected)

  this._validate(extend({
    actual: actual
    , expected: expected
    , name: msg
    , callee: arguments[2] || deepEquals
  }, deepEquals_(actual, expected, this.__inverted__)))
}

Certain.prototype.notDeepEquals
= Certain.prototype.notEqls
= function notEquals(expected, msg) {
  this.__inverted__ = !this.__inverted__
  return this.deepEquals(expected, msg)
}

function throws_(does, inv) {
  return normResult(inv, does, 'should', 'should not')
}

Certain.prototype.throws
= Certain.prototype.throw
= Certain.prototype.throwsError
= function throws(msg) {
  var does = false
  try { this.__val__() } catch (err) { does = true }

  this._validate(extend({
    actual: does ? 'throws' : 'not throws'
    , expected: !this.__inverted__ ? 'throw': 'not throw'
    , name: msg
    , callee: arguments[2] || throws
  }, throws_(does, this.__inverted__)))
}

function ResultsStream () {
  Readable.call(this, { objectMode: true })
}

inherits(ResultsStream, Readable)

ResultsStream.prototype._read = function () {}

// certain assertions with a results readable stream
function CertainResults(resultsStream, value) {
  Certain.call(this, value)
  this.__resultStream__ = resultsStream
  this.THROWS = false
}

inherits(CertainResults, Certain)

var validate_ = Certain.prototype._validate
CertainResults.prototype._validate = function (details) {
  var v = validate_.call(this, details)
  this.__resultStream__.push(v)
}

certain.withResults = function () {
  var resultsStream = new ResultsStream()
  function certainResults(value) {
    return new CertainResults(resultsStream, value)
  }

  certainResults.readStream = resultsStream
  return certainResults
}

