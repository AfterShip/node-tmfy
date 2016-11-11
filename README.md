# tmfy

[![node](https://img.shields.io/node/v/tmfy.svg)]()
[![npm](https://img.shields.io/npm/v/tmfy.svg)]()
[![npm](https://img.shields.io/npm/l/tmfy.svg)]()

Timeouts for promises and profisified functions
## Quick Start
```
npm install tmfy
```

```javascript
'use strict'

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

## License
Copyright (c) 2016 AfterShip

Licensed under the MIT license.
