# tmfy

[![node](https://img.shields.io/node/v/tmfy.svg)]()
[![npm](https://img.shields.io/npm/v/tmfy.svg)]()
[![npm](https://img.shields.io/npm/l/tmfy.svg)]()

Timeouts for promises and promisified functions

**Pronunciation**: timeify, `Thai-Me-Fy`

## Quick Start
```
npm install tmfy
```

```javascript
var tmfy = require('tmfy');

var sleep = function(mil) {
	return new Promise(function (r) { setTimeout(r, mil) });
};
var lib = {
	sleep_ms: sleep,
	sleep_s: function(s) { return sleep(s*1000); }
};
tmfy.timeifyAll(lib);

lib.sleep_sTimeout(1000, 2) // timeout after 1000ms, sleep for 2s
	.then(function(result) {
		console.log('sleep first');
	})
	.catch(function(error) {
		console.log('timeout first');
	});
```

## API

#### timeout(mil, promise)
#### timeout(mil, handler, promise)

Returns a Promise.
- Resolves if `promise` is resolved before `mil`ms timeout. `promise` result is passed.
- Rejects if `promise` is rejected before `mil`ms timeout. `promise` error is passed.
- Rejects with `new Error('TIMEOUT')` if `mil`ms timeout before `promise` is resolved or rejected.

If `handler` is set and have `emit()`, `error` event will be emitted on timeout with `new Error('TIMEOUT')`.

#### timeify(func)

`func` must returns a Promise.

Returns a wrapped function around `func` which accepts `mil` as a first argument:
```javascript
var funcTimeout = tmfy.timeify(func);
funcTimeout(1000, ...); // runs func(...) with 1000ms timeout
```

A wrapped function returns a Promise. Same logic as for `timeout()` applies.
If `this` is set and have `emit()`, `error` event will be emitted on timeout with `new Error('TIMEOUT')`.

#### timeifyAll(obj)

Extends `obj` with timeified versions of all functions. Adds 'Timeout' suffix to wrapped functions.
```javascript
var obj = {
	func: function() { return Promise.resolve('success'); }
};
tmfy.timeifyAll(obj);
obj.funcTimeout(1000)
	.then(function(result) {
		// prints "success"
		result => console.log(result)
	})
```

## License
Copyright (c) 2016 AfterShip

Licensed under the MIT license.
