'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PAT02A extends ZwaveDevice {
	async onNodeInit() {

		this.registerCapability('alarm_tamper', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true,
			}
		});

		// This device does not send a timeout when the tamper period is over. Use a timeout to reset the capability
		this.registerReportListener('SENSOR_BINARY', 'SENSOR_BINARY_REPORT', report => {
	
			if (!report || !report.hasOwnProperty('Sensor Value') || !report.hasOwnProperty('Sensor Type')) return null;
		
			if (report['Sensor Type'] === 'Tamper' && report['Sensor Value'] === 'detected an event') {
				this.setCapabilityValue('alarm_tamper', true);
				this.tamperTimeOut = setTimeout(() => {
				this.setCapabilityValue('alarm_tamper', false);
				}, this.getSetting('tamper_cancellation')*1000 || 120000);
			}
		
		});

		this.registerCapability('alarm_water', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true,
			},
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

module.exports = PAT02A;
