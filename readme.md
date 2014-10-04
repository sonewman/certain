# Certain
Certain is a simple assertion library.

Install:
```bash
$ npm install certain
```

Usage is pretty simple:
```javascript
var certain = require('certain')

certain('a').equals('a')

certain(false).is.true() // this will throw an AssertionError
```

## API

### certain(actual)
main *certain* method is called with the actual value then there are chained methods which allow the actual value to be compared to the corresponding expected value.

If the assertion is not correct **certain** will throw an AssertionError (this means you can use your preferred test suite provided that it fails the test on error)

There are also a number of chained properties which are available to improve semantics for test readability these are:`be, to, does, is`

For each of the below assertion methods it is possible to invert the assertion type by using: `not, doesnt` for example: `certain('a').does.not.equal('b')`




### #equals(expected, msg) & #*not*.equal(expected, msg)
Assert that actual value triple equals to the expected value
```javascript
certain('a').equals('a')

certain('a').equals('b') // will throw AssertionError

certain('a').does.not.equal('b')

certain('a').does.not.equal('a') // will throw AssertionError

certain('a').does.notEqual('b')

certain('a').does.notEqual('a') // will throw AssertionError
```

### #deepEquals(expected, msg) & #*not*.deepEqual(expected, msg)
Assert that the actual value deepEquals to expected (this checks the values of properties of a specified object rather than references)
```javascript
certain({ a: 1 }).deepEquals({ a: 1 })

certain({ a: 1 }).deepEquals({ a: 2, b: 3 }) // will throw AssertionError

certain({ a: 1 }).does.not.deepEqual({ a: 2, b: 3 })

certain({ a: 1 }).does.not.deepEqual({ a: 1 }) // will throw AssertionError

certain({ a: 1 }).does.notDeepEqual({ a: 2, b: 3 })

certain({ a: 1 }).does.notEqls({ a: 1 }) // will throw AssertionError
```

### #is.true( msg) & #is.*not*.true(msg)
Assert that actual value is or is not equal to *true*
```javascript
certain(true).is.true('It is true!')

certain(false).is.true() // will throw AssertionError

certain(false).is.not.true()

certain(true).is.not.true() // will throw AssertionError
```

### #is.false(msg) & #is.*not*.false(msg)
Assert that actual value is or is not equal to *false*
```javascript
certain(false).is.false('It is false!')

certain(true).is.false() // will throw AssertionError

certain(true).is.not.false()

certain(false).is.not.false() // will throw AssertionError
```

### #is.ok(msg) & #is.*not*.ok(msg)
Assert that actual value is *truthy* by checking: Boolean(expected)
```javascript
certain(1).is.ok('It is OK!')

certain(0).is.ok() // will throw AssertionError

certain(false).is.not.ok()
certain(null).is.not.ok()
certain(undefined).is.not.ok()

certain(true).is.not.ok() // will throw AssertionError
```
### #throws(msg) & #does.*not*.throw(msg)
This expects that the actual value passed is a function and will assert if this function
throws an error when called
```javascript
certain(function () {
  throw new Error()
}).throws()

certain(function () {
  return true
}).throws() // will throw AssertionError

certain(function () {
  return false
}).doesnt.throw()

certain(function () {
  throw new Error()
}).does.not.throw() // will throw AssertionError
```
