"use strict";
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
// Product Name:	Flood, Temperature and Humidity sensor
// Brand Name:	Philio
// Product Line:	Philio Z-Wave Product
// Product Code:	PST02-1A
// Product Version:	1.0
// http://products.z-wavealliance.org/products/1186
module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {

		'alarm_tamper': {
			'command_class': 'COMMAND_CLASS_SENSOR_BINARY',
			'command_report': 'SENSOR_BINARY_REPORT',
			'command_report_parser': function (report) {
				if (report['Sensor Type'] === 'Tamper') {
					return report['Sensor Value'] === 'detected an event';
				}

				return null;
			}
		},
		alarm_water: {
			command_class: 'COMMAND_CLASS_SENSOR_BINARY',
			command_get: 'SENSOR_BINARY_GET',
			command_report: 'SENSOR_BINARY_REPORT',
			command_report_parser: report => report['Sensor Value'] === 'detected an event',
		},
		'measure_temperature': {
			'command_class': 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			'command_get': 'SENSOR_MULTILEVEL_GET',
			'command_get_parser': function () {
				return {
					'Sensor Type': "Temperature (version 1)",
					'Properties1': {
						'Scale': 0
					}
				}
			},
			'command_report': 'SENSOR_MULTILEVEL_REPORT',
			'command_report_parser': function (report) {
				if (report['Sensor Type'] !== 'Temperature (version 1)') {
					return null;
				}
				else {
					return report['Sensor Value (Parsed)'];
				}
			}
		},

		'measure_humidity': {
			'command_class': 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			'command_get': 'SENSOR_MULTILEVEL_GET',
			'command_get_parser': function () {
				return {
					'Sensor Type': "Relative humidity (version 2)",
					'Properties1': {
						'Scale': 0
					}
				}
			},
			'command_report': 'SENSOR_MULTILEVEL_REPORT',
			'command_report_parser': function (report) {
				if (report['Sensor Type'] !== 'Relative humidity (version 2)') {
					return null;
				}
				else {
					return report['Sensor Value (Parsed)'];
				}
			}
		},

		'measure_battery': {
			'getOnWakeUp': true,
			'command_class': 'COMMAND_CLASS_BATTERY',
			'command_get': 'BATTERY_GET',
			'command_report': 'BATTERY_REPORT',
			'command_report_parser': function (report) {
				if (report['Battery Level'] === "battery low warning") {
					return 1;
				}
				else {
					return report['Battery Level (Raw)'][0];
				}
			}
		}
	},
	settings: {
		"basic_set_OFF": {
			"index": 1,
			"size": 1
		},
		"basic_set_ON": {
			"index": 2,
			"size": 1
		},
		"operation_mode": {
			"index": 5,
			"size": 1
		},
		"multi_sensor_function_switch": {
			"index": 6,
			"size": 1
		},
		"customer_function": {
			"index": 7,
			"size": 1
		},
		"auto_report_battery_time": {
			"index": 10,
			"size": 1
		},
		"auto_report_temperature_time": {
			"index": 13,
			"size": 1
		},
		"auto_report_humidity_time": {
			"index": 14,
			"size": 1
		},
		"auto_report_flood_time": {
			"index": 14,
			"size": 1
		},
		"auto_report_tick_interval": {
			"index": 20,
			"size": 1
		},
		"temperature_differential_report": {
			"index": 21,
			"size": 1
		},
		"humidity_differential_report": {
			"index": 23,
			"size": 1
		}
	}
})
