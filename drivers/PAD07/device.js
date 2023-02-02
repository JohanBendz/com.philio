'use strict';
const Homey = require('homey');

const { ZwaveDevice } = require('homey-zwavedriver');

class PAD07 extends ZwaveDevice {
	async onNodeInit() {
		this.registerCapability('onoff', 'MULTILEVEL_SWITCH');
		this.registerCapability('dim', 'MULTILEVEL_SWITCH');
	}
}

module.exports = PAD07;
