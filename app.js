'use strict';
const Homey = require('homey');

class PhilioApp extends Homey.App {
	onInit() {
		this.log(`${Homey.manifest.id} running...`);
	}
}

module.exports = PhilioApp;
