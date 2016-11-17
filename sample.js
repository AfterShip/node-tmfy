var tmfy = require('./index');

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
