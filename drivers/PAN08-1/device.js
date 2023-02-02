'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PAN08 extends ZwaveDevice {
	async onNodeInit() {
		this.registerCapability('windowcoverings_state', 'SWITCH_BINARY');
		this.registerCapability('dim', 'SWITCH_MULTILEVEL');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}
}

module.exports = PAN08;
