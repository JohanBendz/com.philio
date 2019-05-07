"use strict";
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
// Product Name:    In Wall Dual relay(1 way) switch module PAN04-1
// Brand Name:    Philio
// Product Line:    Philio Z-Wave Product
// Product Code:    PAN04-1
// Product Version:    1.0

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		onoff: {
			command_class: 'COMMAND_CLASS_SWITCH_BINARY',
			command_get: 'SWITCH_BINARY_GET',
			command_set: 'SWITCH_BINARY_SET',
			command_set_parser: (value) => ({
				'Switch Value': (value > 0) ? 'on/enable' : 'off/disable',
			}),
			command_report: 'SWITCH_BINARY_REPORT',
			command_report_parser: report => report.Value === 'on/enable',
		},
		measure_power: {
			command_class: 'COMMAND_CLASS_METER',
			command_get: 'METER_GET',
			command_get_parser: () => ({
				Properties1: {
					Scale: 2
				}
			}),
			command_report: 'METER_REPORT',
			command_report_parser: report => {
				if (report.hasOwnProperty('Properties2') &&
					report.Properties2.hasOwnProperty('Scale bits 10') &&
					report.Properties2['Scale bits 10'] === 2) {
					return report['Meter Value (Parsed)'];
				}
				return null;
			}
		},
		meter_power: {
			command_class: 'COMMAND_CLASS_METER',
			command_get: 'METER_GET',
			command_get_parser: () => ({
				Properties1: {
					Scale: 0
				}
			}),
			command_report: 'METER_REPORT',
			command_report_parser: report => {
				if (report.hasOwnProperty('Properties2') &&
					report.Properties2.hasOwnProperty('Size') &&
					report.Properties2.Size === 4 &&
					report.Properties2.hasOwnProperty('Scale bits 10') &&
					report.Properties2['Scale bits 10'] === 0) {
					return report['Meter Value (Parsed)'];
				}
				return null;
			}
		}
	},
	settings: {
		"wattMeterReportPeriod": {
			"index": 1,
			"size": 2
		},
		"kwhMeterReportPeriod": {
			"index": 2,
			"size": 2
		},
		"selectedRelay": {
			"index": 3,
			"size": 1
		},
		"edgePulseModeEdgeToggleMode": {
			"index": 4,
			"size": 1
		},
		"thresholdCurrentLoadCaution": {
			"index": 5,
			"size": 2
		},
		"thresholdKwhLoadCaution": {
			"index": 6,
			"size": 2
		},
		"restoreSwitchStateMode": {
			"index": 7,
			"size": 1
		},
		"autoOffTimer": {
			"index": 8,
			"size": 2
		},
		"rfOffCommandMode": {
			"index": 9,
			"size": 1
		},
		"existenceOfEndpoint3": {
			"index": 10,
			"size": 1
		}
	}
});
