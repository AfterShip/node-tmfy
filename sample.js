var tmfy = require('./index');

var sleep = function(mil) {
	return new Promise(function (r) { setTimeout(r, mil) });
};
var lib = {
	sleep_ms: sleep,
	sleep_s: (s) => sleep(s*1000)
};
tmfy.timeifyAll(lib);

lib.sleep_sTimeout(1000, 2) // timeout after 1000ms, sleep for 2s
	.then(function(result) {
		console.log('sleep first');
	})
	.catch(function(error) {
		console.log('timeout first');
	});