
var assert = require('assert')
var utils = require('core-util-is')

var isFunc = exports.isFunc = utils.isFunction
var isObj = exports.isObj = utils.isObject
var isDate = exports.isDate = utils.isDate

exports.isStr = isStr
function isStr(str) {
  return utils.isString(str) || str instanceof String
}

exports.isNum = isNum
function isNum(no) {
  return utils.isNumber(no) || no instanceof Number
}

exports.isBool = isBool
function isBool(bool) {
  return utils.isBoolean(bool) || bool instanceof Boolean
}

exports.isPrimitive = isPrimitive
function isPrimitive(obj) {
  return isStr(obj) || isNum(obj) || isBool(obj)
}

exports.normalisePrimitive = normalisePrimitive
function normalisePrimitive(obj) {
  return isPrimitive(obj) ? obj.valueOf() : obj
}

exports.normaliseResult = normaliseResult
function normaliseResult(inv, res, op, invOp) {
  return !inv 
    ? { ok: res, operator: op, invalidOperator: invOp }
    : { ok: res, operator: invOp, invalidOperator: op }
}

exports.fail = fail
function fail(details) {
  var err = new assert.AssertionError({
    actual: details.actual
    , expected: details.expected
    , operator: details.invalidOperator
    , stackStartFunction: details.callee
  })

  details.error = err
  return err
}
