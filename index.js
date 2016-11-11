'use strict';

const isFunction = (obj) => (typeof obj === 'function');

const timeout = function () {
	return new Promise((resolve, reject) => {
		// user input is one of:
		// - timeout(mil, promise)
		// - timeout(mil, handler, promise)
		const mil = arguments[0];
		const handler = arguments.length === 3 ? arguments[1] : undefined;
		const promise = arguments.length === 3 ? arguments[2] : arguments[1];

		// start the timer
		const delay = new Promise(r => setTimeout(r, mil));
		let finished = false;

		promise
			.then(result => {
				if (finished) return;
				finished = true;
				resolve(result);
			})
			.catch(error => {
				if (finished) return;
				finished = true;
				reject(error);
			});

		delay
			.then(result => {
				if (finished) return;
				finished = true;
				let error = new Error('TIMEOUT');
				if (handler && isFunction(handler.emit)) handler.emit('error', error);
				reject(error);
			});
	});
};

const timeify = function (func) {
	return function () {
		const mil = arguments[0];
		const funcArguments = Array.apply(null, arguments).slice(1);
		let promise = func.apply(this, funcArguments);
		return timeout(mil, this, promise);
	};
};

const timeifyAll = function (obj) {
	for (let name in obj) {
		if (!obj.hasOwnProperty(name) || !isFunction(obj[name])) continue;
		obj[`${name}Timeout`] = timeify(obj[name]);
	}
	return obj;
};

module.exports = {
	timeout,
	timeify,
	timeifyAll
};
