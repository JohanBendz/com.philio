'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PAN06 extends ZwaveDevice {
	async onNodeInit() {
		this.registerCapability('onoff', 'SWITCH_BINARY');
	}
}

module.exports = PAN06;
