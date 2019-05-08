'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class PAN06 extends ZwaveDevice {
	onMeshInit() {
		this.registerCapability('onoff', 'SWITCH_BINARY');
	}
}

module.exports = PAN06;
