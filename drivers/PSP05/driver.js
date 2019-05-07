'use strict';
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
const motionCancellation = {};
const tamperCancellation = {};

// Outdoor Motion Sensor PSP05
// http://www.vesternet.com/downloads/dl/file/id/1761/product/2836/z_wave_philio_motion_sensor_psp05_gen5_manual.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		alarm_motion: {
			command_class: 'COMMAND_CLASS_SENSOR_BINARY',
			command_report: 'SENSOR_BINARY_REPORT',
			command_report_parser: (report, node) => {
				if (report['Sensor Type'] === 'Motion' && report['Sensor Value'] === 'detected an event') {
					if (node) {
						if (motionCancellation.hasOwnProperty(node.device_data.token) && motionCancellation[node.device_data.token]) {
							clearTimeout(motionCancellation[node.device_data.token]);
							motionCancellation[node.device_data.token] = null;
						}
						if (node.settings.hasOwnProperty('motion_cancellation') && node.settings.motion_cancellation > 0) {
							if (!motionCancellation.hasOwnProperty('node.device_data.token')) motionCancellation[node.device_data.token];
							motionCancellation[node.device_data.token] = setTimeout(() => {
								node.state.alarm_motion = false;
								module.exports.realtime(node.device_data, 'alarm_motion', false);
							}, node.settings.motion_cancellation * 1000);
						}
					}
					return true;
				} else if (report['Sensor Type'] === 'Motion' &&
					report['Sensor Value'] !== 'detected an event' &&
					!node.settings.hasOwnProperty('motion_cancellation')) {
					// this is just to catch people not having saved the settings yet of the device yet so the alarm still turns off
					return false;
				}
				return null;
			}
		},
		alarm_tamper: {
			command_class: 'COMMAND_CLASS_SENSOR_BINARY',
			command_report: 'SENSOR_BINARY_REPORT',
			command_report_parser: (report, node) => {
				if (report['Sensor Type'] === 'Tamper' && report['Sensor Value'] === 'detected an event') {
					if (node) {
						if (tamperCancellation.hasOwnProperty(node.device_data.token) && tamperCancellation[node.device_data.token]) {
							clearTimeout(tamperCancellation[node.device_data.token]);
							tamperCancellation[node.device_data.token] = null;
						}
						if (node.settings.hasOwnProperty('tamper_cancellation') && node.settings.tamper_cancellation > 0) {
							if (!tamperCancellation.hasOwnProperty('node.device_data.token')) tamperCancellation[node.device_data.token];
							tamperCancellation[node.device_data.token] = setTimeout(() => {
								node.state.alarm_tamper = false;
								module.exports.realtime(node.device_data, 'alarm_tamper', false);
							}, node.settings.tamper_cancellation * 1000);
						}
					}
					return true;
				}
				return null;
			}
		},
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				if(report['Battery Level'] === "battery low warning") return 1;
				if(typeof report['Battery Level (Raw)'] !== 'undefined') return report['Battery Level (Raw)'][0];
				return null;
			}
		}
	},
	settings: {
		group_2_value: {
			index: 2,
			size: 1,
			signed: false,
		},
		pir_sensitivity: {
			index: 3,
			size: 1,
		},
		motion_cancellation: (newValue, oldValue, deviceData) => {
			if (motionCancellation.hasOwnProperty(deviceData.token) && motionCancellation[deviceData.token]) {
				clearTimeout(motionCancellation[deviceData.token]);
				motionCancellation[deviceData.token] = null;
				const node = module.exports.nodes[deviceData.token];
				if (node) {
					if (node.state.alarm_motion) module.exports.realtime(deviceData, 'alarm_motion', false);
					node.state.alarm_motion = false;
				}
			}
		},
		tamper_cancellation: (newValue, oldValue, deviceData) => {
			if (tamperCancellation.hasOwnProperty(deviceData.token) && tamperCancellation[deviceData.token]) {
				clearTimeout(tamperCancellation[deviceData.token]);
				tamperCancellation[deviceData.token] = null;
				const node = module.exports.nodes[deviceData.token];
				if (node) {
					if (node.state.alarm_tamper) module.exports.realtime(deviceData, 'alarm_tamper', false);
					node.state.alarm_tamper = false;
				}
			}
		},
		retrigger_time: {
			index: 8,
			size: 1,
			parser: newValue => new Buffer([Math.round(newValue / 8)]),
		},
		group_2_off_time: {
			index: 9,
			size: 1,
			parser: newValue => new Buffer([Math.round(newValue / 8)]),
		},
		battery_report_interval: {
			index: 10,
			size: 1,
		},
		battery_interval_range: {
			index: 20,
			size: 1,
		},
	},
});
