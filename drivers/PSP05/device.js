'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

// TODO: setting: motion & tamper cancellation

class PSP05 extends ZwaveDevice {
	async onNodeInit() {
		this.registerCapability('alarm_motion', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true,
			},
			reportParser: report => {
				if (report &&
					report.hasOwnProperty('Sensor Value') &&
					report.hasOwnProperty('Sensor Type') &&
					report['Sensor Type'] === 'Motion') {
					if (report['Sensor Value'] === 'detected an event') {
						this.getDriver().motionTimeout(this.getData(), this.getSetting('motion_cancellation') || 30);
						return true;
					}
					if (this.getSetting('motion_cancellation') <= 0) return false;
				}
				return null;
			},
			reportParserOverride: true
		});

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

		this.registerCapability('measure_battery', 'BATTERY');
	}
}

module.exports = PSP05;
