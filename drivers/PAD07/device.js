'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class PAD07 extends ZwaveDevice {
	onMeshInit() {
		this.registerCapability('onoff', 'MULTILEVEL_SWITCH');
		this.registerCapability('dim', 'MULTILEVEL_SWITCH');
	}
}

module.exports = PAD07;
