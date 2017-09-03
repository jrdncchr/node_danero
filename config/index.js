'use strict'

// required environment variables
var requiredEnv = [
	'NODE_ENV',
	'DB_CONNECTION',
	'PORT'
];

requiredEnv.forEach((name) => {
	if (!process.env[name]) {
		throw new Error(`Environment variable ${name} is missing`)
	}
});

var server = require('./server');

module.exports = Object.assign({}, server);