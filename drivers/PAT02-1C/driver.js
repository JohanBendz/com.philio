"use strict";
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
// Product Name:	Flood sensor
// Brand Name:	Philio
// Product Line:	Philio Z-Wave Product
// Product Code:	PST02-1C
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
		'alarm_water': {
			command_class: 'COMMAND_CLASS_SENSOR_BINARY',
			command_get: 'SENSOR_BINARY_GET',
			command_report: 'SENSOR_BINARY_REPORT',
			command_report_parser: report => report['Sensor Value'] === 'detected an event',
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
		"customer_function": {
			"index": 7,
			"size": 1
		},
		"auto_report_battery_time": {
			"index": 10,
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
	}
})
