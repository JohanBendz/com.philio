'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PSP05 extends ZwaveDevice {
	async onNodeInit() {

		this.registerCapability('alarm_motion', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true,
			}
		});

		// This device does not send a timeout when the motion period is over. Use a timeout to reset the capability
		this.registerReportListener('SENSOR_BINARY', 'SENSOR_BINARY_REPORT', report => {
	
			if (!report || !report.hasOwnProperty('Sensor Value') || !report.hasOwnProperty('Sensor Type')) return null;
		
			if (report['Sensor Type'] === 'Motion' && report['Sensor Value'] === 'detected an event') {
				this.setCapabilityValue('alarm_motion', true);
				this.motionTimeOut = setTimeout(() => {
				this.setCapabilityValue('alarm_motion', false);
				}, this.getSetting('motion_cancellation')*1000 || 30000);
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
				}, this.getSetting('tamper_cancellation')*1000 || 30000);
			}
		
		});

		this.registerCapability('measure_battery', 'BATTERY');
	}
}

module.exports = PSP05;
