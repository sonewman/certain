var assert = require('assert')
var utils = require('core-util-is')
var extend = require('util-extend')

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

function captureStackTrace(caller) {
  var s = {}
  Error.captureStackTrace(s, caller)
  return s.stack
}

var stackLineSplitter = /[\t\s]+at[\s]*/
var braceMatcher = /[\(\)]/g

function getCallerDetails(stack) {
  var msgIndex = stack.indexOf('\n')
  var msg = stack.substring(0, msgIndex)
  stack = stack.substring(msgIndex + 1)
    .split(stackLineSplitter)

  stack.shift()
  var at = stack.slice(0, 1)[0]
  var fn = at.split(' ')
  var file = fn.pop().replace(braceMatcher, '')
  var fileSplit = file.split(':')

  return {
    functionName: fn.join(' ')
    , msg: msg
    , file: file
    , filename: fileSplit[0]
    , line: fileSplit[1]
    , column: fileSplit[2]
    , at: at
    , stack: stack
  }
}

exports.pass = pass
function pass(details) {
  var stack = captureStackTrace(details.caller)
  return extend(details, getCallerDetails(stack))
}

exports.fail = fail
function fail(details) {
  var err = new assert.AssertionError({
    actual: details.actual
    , expected: details.expected
    , operator: details.invalidOperator
    , stackStartFunction: details.caller || fail
  })

  details.error = err
  return extend(details, getCallerDetails(err.stack))
}
