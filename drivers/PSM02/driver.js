'use strict';
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
const tamperCancellation = {};
// Product Name:	Slim Multi-Sensor PSM02
// Brand Name:	Philio
// Product Line:	Philio Z-Wave Product
// Product Code:	PSM02
// Product Version:	1.0

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		alarm_motion: {
			command_class: 'COMMAND_CLASS_SENSOR_BINARY',
			command_report: 'SENSOR_BINARY_REPORT',
			command_report_parser: report => {
				if (report && report['Sensor Type'] === 'Motion') return report['Sensor Value'] === 'detected an event';
				return null;
			},
		},
		alarm_contact: {
			command_class: 'COMMAND_CLASS_SENSOR_BINARY',
			command_report: 'SENSOR_BINARY_REPORT',
			command_report_parser: report => {
				if (report && report['Sensor Type'] === 'Door/Window') return report['Sensor Value'] === 'detected an event';
				return null;
			},
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
		measure_temperature: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: report => {
				if (report['Sensor Type'] !== 'Temperature (version 1)') return null;
				return report['Sensor Value (Parsed)'];
			},
		},
		measure_luminance: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: report => {
				if (report['Sensor Type'] !== 'Luminance (version 1)') return null;
				return report['Sensor Value (Parsed)'];
			},
		},
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				if (report['Battery Level'] === "battery low warning") return 1;
				if (report.hasOwnProperty('Battery Level (Raw)')) return report['Battery Level (Raw)'][0];
				return null;
			},
		},
	},
	settings: {
		basic_set_level: {
			index: 2,
			size: 1,
		},
		pir_sensitivity: {
			index: 3,
			size: 1,
		},
		light_threshold: {
			index: 4,
			size: 1,
		},
		operation_mode: {
			index: 5,
			size: 1,
		},
		multi_sensor_function_switch: {
			index: 6,
			size: 1,
		},
		pir_re_detect_interval_time: {
			index: 8,
			size: 1,
		},
		turn_off_light_time: {
			index: 9,
			size: 1,
		},
		auto_report_battery_time: {
			index: 10,
			size: 1,
		},
		auto_report_door_window_state_time: {
			index: 11,
			size: 1,
		},
		auto_report_illumination_time: {
			index: 12,
			size: 1,
		},
		auto_report_temperature_time: {
			index: 13,
			size: 1,
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
	},
});
