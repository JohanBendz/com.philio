'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PAN04 extends ZwaveDevice {
	async onNodeInit() {
		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}
}

module.exports = PAN04;
