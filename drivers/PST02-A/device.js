'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PST02A extends ZwaveDevice {
	async onNodeInit() {
		this.registerCapability('alarm_motion', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true,
			}
		});

		this.registerCapability('alarm_contact', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true,
			}
		});

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

		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
			getOpts: {
				getOnStart: false,
			}
		});

		this.registerCapability('measure_luminance', 'SENSOR_MULTILEVEL', {
			getOpts: {
				getOnOnline: true,
			},
			reportParser: report => {
				if (report &&
					report.hasOwnProperty('Sensor Type') &&
					report.hasOwnProperty('Sensor Value (Parsed)') &&
					report.hasOwnProperty('Level') &&
					report.Level.hasOwnProperty('Scale') &&
					report['Sensor Type'] === 'Luminance (version 1)') {
					if (report.Level.Scale === 0) return report['Sensor Value (Parsed)'] * 5;
					else return report['Sensor Value (Parsed)'];
				}
				return null;
			},
			reportParserOverride: true
		});

		this.registerCapability('measure_battery', 'BATTERY');
	}
}

module.exports = PST02A;
