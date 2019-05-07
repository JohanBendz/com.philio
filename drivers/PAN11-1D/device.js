'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class PAN11D extends ZwaveDevice {
	onMeshInit() {
		this.registerCapability('onoff', 'SWITCH_BINARY');
	}
}

module.exports = PAN11D;
