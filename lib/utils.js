
var assert = require('assert')
var utils = require('core-util-is')
var extend = require('util-extend')

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

function captureStackTrace(callee) {
  var s = {}
  Error.captureStackTrace(s, callee)
  return s.stack
}

var stackLineSplitter = /[\t\s]+at[\s]*/
var braceMatcher = /[\(\)]/g

function getCalleeDetails(stack) {
  var msgIndex = stack.indexOf('\n')
  var msg = stack.substring(0, msgIndex)
  stack = stack.substring(msgIndex + 1)
    .split(stackLineSplitter)

  stack.shift()
  var at = stack.shift()
  var fn = at.split(' ')
  var file  = fn.pop().replace(braceMatcher, '')
  var fileSplit = file.split(':')

  return {
    functionName: fn.join(' '),
    file: file,
    filename: fileSplit[0],
    line: fileSplit[1],
    column: fileSplit[2],
    at: at
  }
}

exports.pass = pass
function pass(details) {
  var stack = captureStackTrace(details.callee)
  return extend(details, getCalleeDetails(stack))
}

exports.fail = fail
function fail(details) {
  var err = new assert.AssertionError({
    actual: details.actual
    , expected: details.expected
    , operator: details.invalidOperator
    , stackStartFunction: details.callee || fail
  })

  details.error = err
  return extend(details, getCalleeDetails(err.stack))
}
