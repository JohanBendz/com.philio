'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PAT02C extends ZwaveDevice {
	async onNodeInit() {
		this.registerCapability('alarm_tamper', 'SENSOR_BINARY', {
			reportParser: report => {
				if (report &&
					report.hasOwnProperty('Sensor Value') &&
					report.hasOwnProperty('Sensor Type') &&
					report['Sensor Type'] === 'Tamper') {
					if (report['Sensor Value'] === 'detected an event') {
						this.driver().tamperTimeout(this.getData(), this.getSetting('tamper_cancellation') || 120);
						return true;
					}
				}
				return null;
			},
			reportParserOverride: true
		});

		this.registerCapability('alarm_water', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true,
			},
		});
		this.registerCapability('measure_battery', 'BATTERY');
	}
}

module.exports = PAT02C;
