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

var lib = {
	sendEmail: function(send_to) {
		// need 200ms to send
		return new Promise(function (r) { setTimeout(r, 200) });
	},
	sendEmailSlowly: function(send_to) {
		// need 20000ms to send
		return new Promise(function (r) { setTimeout(r, 20000) });
	}
};

tmfy.timeifyAll(lib);

lib.sendEmailTimeout(1000, 'me@apple.com') // timeout after 1000ms
	.then(function(result) {
		console.log('email sent');
	})
	.catch(function(error) {
		// never called
	});

lib.sendEmailSlowlyTimeout(1000, 'me@apple.com') // timeout after 1000ms
	.then(function(result) {
		// never called
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
