'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PST02B extends ZwaveDevice {
	async onNodeInit() {
		this.registerCapability('alarm_motion', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true,
			}
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

module.exports = PST02B;
