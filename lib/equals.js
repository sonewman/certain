var utils = require('./utils')

function checkNaN(a, b) {
  return (utils.isNum(a) && utils.isNum(b))
    ?  (isNaN(actual) && isNaN(expected))
    : false
}

exports.triple = function triple(a, b) {
  return a === b || checkNaN(a, b)
}

function recKeys(obj) {
  var keys = Object.keys(obj)
  var proto = obj.__proto__
  return proto === null ? keys : keys.concat(recKeys(proto))
}

function noAndSt(a, b) {
  return noSt(a, b) || noSt(b, a)
}

function noSt(a, b) {
  return 'string' === typeof a
    && 'number' === typeof b
}

exports.deep = function deep(a, b) {
  var aKeys, bKeys

  if (a === b) return true
  if (noAndSt(a, b) && Number(a) === Number(b))
    return true

  if (typeof a !== typeof b) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    if (a.every(function (e, i) {
      return deep(e, b[i])
    })) return true
  } else if (utils.isDate(a) && utils.isDate(b)) {
    return +a === +b
  } else if (utils.isObj(a) && utils.isObj(b)) {
    aKeys = recKeys(a)
    bKeys = recKeys(b)
    if (aKeys.length !== bKeys.length) return false
    return aKeys.every(function (key) {
      return ~bKeys.indexOf(key) && deep(a[key], b[key])
    })
  } else if (utils.isFunc(a) && utils.isFunc(b)) {
    return a.toString() === b.toString()
  }

  return false
}
