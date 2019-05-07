"use strict";
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
// Product Name:    In Wall Dual relay(1 way) switch module PAN06-1
// Brand Name:    Philio
// Product Line:    Philio Z-Wave Product
// Product Code:    PAN06-1
// Product Version:    1.1

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
		}
	},
	settings: {
		"modeSelection": {
			"index": 1,
			"size": 1
		},
		"edgePulseedgeToggleMode": {
			"index": 2,
			"size": 1
		},
		"restoreSwitchStateMode": {
			"index": 3,
			"size": 1
		},
		"autoOffTimer": {
			"index": 4,
			"size": 2
		},
		"rfOffCommand ": {
			"index": 5,
			"size": 1
		},
		"existenceEndpoint3 ": {
			"index": 6,
			"size": 1
		}
	}
});
