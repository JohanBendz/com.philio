'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class PAT02B extends ZwaveDevice {
	onMeshInit() {
		this.registerCapability('alarm_tamper', 'SENSOR_BINARY', {
			reportParser: report => {
				if (report &&
					report.hasOwnProperty('Sensor Value') &&
					report.hasOwnProperty('Sensor Type') &&
					report['Sensor Type'] === 'Tamper') {
					if (report['Sensor Value'] === 'detected an event') {
						this.getDriver().tamperTimeout(this.getData(), this.getSetting('tamper_cancellation') || 120);

						return true;
					}
				}
				return null;
			},
			reportParserOverride: true
		});

		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
			getOpts: {
				getOnStart: false,
			},
		});
		this.registerCapability('measure_humidity', 'SENSOR_MULTILEVEL', {
			getOpts: {
				getOnStart: false,
			},
		});
		this.registerCapability('measure_battery', 'BATTERY');
	}
}

module.exports = PAT02B;
