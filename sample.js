'use strict';

let tmfy = require('./index');

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