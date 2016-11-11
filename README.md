# tmfy

[![node](https://img.shields.io/node/v/tmfy.svg)]()
[![npm](https://img.shields.io/npm/v/tmfy.svg)]()
[![npm](https://img.shields.io/npm/l/tmfy.svg)]()

Timeouts for promises and promifisified functions
## Quick Start
```
npm install tmfy
```

```javascript
'use strict';

let tmfy = require('tmfy');

let sleep = (mil) => new Promise(r => setTimeout(r, mil));
let lib = {
	sleep_ms: sleep,
	sleep_s: (s) => sleep(s*1000)
};
tmfy.timeifyAll(lib);

lib.sleep_sTimeout(1000, 2) // timeout after 1000ms, sleep for 2s
	.then(result => {
		console.log('sleep first');
	})
	.catch(error => {
		console.log('timeout first');
	});
```

## API

#### timeout(mil, promise)
#### timeout(mil, handler, promise)

Returns a Promise.
- Resoves if `promise` got resolved before `mil`ms timeout. `promise` result is passed.
- Rejects if `promise` got rejected before `mil`ms timeout. `promise` error is passed.
- Rejects if `mil`ms timeout before `promise` got resolved or rejected.

If `handler` is set and have `emit()`, `error` event will be emitted on timeout (with `new Error('TIMEOUT')`).

#### timeify(func)

Returns a wrapped function around `func` which accepts `mil` as a first argument:
```javascript
'use strict';
let tmfy = require('tmfy');
let funcTimeout = tmfy.timeify(func);
funcTimeout(1000, ...); // runs `func` with 1000ms timeout
```

Wrapped function returns a Promise. Same logic as for `timeout()` applies.
If `this` is set and have `emit()`, `error` event will be emitted on timeout (with `new Error('TIMEOUT')`).

#### timeifyAll(obj)

Extends `obj` with timeified versions of all functions. Adds 'Timeout' suffix to wrapped functions.
```javascript
'use strict';
let tmfy = require('tmfy');
let obj = {
	func: () => Promise.resolve('success')
};
tmfy.timeifyAll(obj);

// prints "success"
obj.funcTimeout(1000).then(result => console.log(result))
```

## License
Copyright (c) 2016 AfterShip

Licensed under the MIT license.
