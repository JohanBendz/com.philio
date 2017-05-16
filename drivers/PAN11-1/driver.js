"use strict";
var path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
// Product Name:    Smart Energy Plug In Switch PAN11-1
// Brand Name:    Philio
// Product Line:    Philio Z-Wave Product
// Product Code:    PAN11-1
// Product Version:    1.1

module.exports = new ZwaveDriver(path.basename(__dirname), {
    debug: true,
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
                    'Rate Type': 'Import',
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
                    'Rate Type': 'Import',
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
        },
        measure_voltage: {
            command_class: 'COMMAND_CLASS_METER',
            command_get: 'METER_GET',
            command_get_parser: () => ({
				Properties1: {
					Scale: 4,
				},
			}),
            command_report: 'METER_REPORT',
            command_report_parser: report => {
			if (report.hasOwnProperty('Properties2') &&
					report.Properties2.hasOwnProperty('Size') &&
					report.Properties2.Size === 2 &&
					report.Properties2.hasOwnProperty('Scale bits 10') &&
					report.Properties2['Scale bits 10'] === 0) {
					return report['Meter Value (Parsed)'];
				}
			},
        },
        measure_current: {
            command_class: 'COMMAND_CLASS_METER',
            command_get: 'METER_GET',
            command_get_parser: () => ({
				Properties1: {
					Scale: 5,
				},
			}),
            command_report: 'METER_REPORT',
            command_report_parser: report => {
                if (report.hasOwnProperty('Properties2') &&
					report.Properties2.hasOwnProperty('Size') &&
					report.Properties2.Size === 2 &&
					report.Properties2.hasOwnProperty('Scale bits 10') &&
					report.Properties2['Scale bits 10'] === 1) {
					return report['Meter Value (Parsed)'];
				}
				return null;
			},
        },
    },
    settings: {
        "watt_report_period": {
            "index": 1,
            "size": 2
        },
        "kwh_report_period": {
            "index": 2,
            "size": 2
        },
        "threshold_watt_load": {
            "index": 3,
            "size": 2
        },
        "threshold_kwh_load": {
            "index": 4,
            "size": 2
        },
        "restore_switch_state": {
            "index": 5,
            "size": 1
        },
        "mode_of_switch_off": {
            "index": 6,
            "size": 1
        },
        "LED_indication": {
            "index": 7,
            "size": 1
        },
        "auto_off_timer": {
            "index": 8,
            "size": 1
        },
        "RF_off_command": {
            "index": 9,
            "size": 1
        }
    }
});
