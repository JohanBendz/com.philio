"use strict";
var path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
// Product Name:	Slim Multi-Sensor PSM02
// Brand Name:	Philio
// Product Line:	Philio Z-Wave Product
// Product Code:	PSM02
// Product Version:	1.0

module.exports = new ZwaveDriver(path.basename(__dirname), {
    capabilities: {
        'alarm_motion': {
            'command_class': 'COMMAND_CLASS_SENSOR_BINARY',
            'command_report': 'SENSOR_BINARY_REPORT',
            'command_report_parser': report => report['Sensor Value'] === 'detected an event'
        },
        'alarm_contact': {
            'command_class': 'COMMAND_CLASS_SENSOR_BINARY',
            'command_report': 'SENSOR_BINARY_REPORT',
            'command_report_parser': report => report['Sensor State'] === 'Door/Window'

        },
        'alarm_tamper': {
            'command_class': 'COMMAND_CLASS_SENSOR_BINARY',
            'command_report': 'SENSOR_BINARY_REPORT',
            'command_report_parser': report => report['Sensor State'] === 'alarm'
        },
        'measure_temperature': {
            'command_class': 'COMMAND_CLASS_SENSOR_MULTILEVEL',
            'command_get_parser': () => ({
                    'Sensor Type': "Temperature (version 1)",
                    'Properties1': {'Scale': 0}
            }),
            'command_report': 'SENSOR_MULTILEVEL_REPORT',
            'command_report_parser': report => {
				if (report['Sensor Type'] !== 'Temperature (version 1)') return null;

				return report['Sensor Value (Parsed)'];
			}
        },
        'measure_luminance': {
            'command_class': 'COMMAND_CLASS_SENSOR_MULTILEVEL',
            'command_get_parser': () => ({
                    'Sensor Type': "Luminance (version 1)",
                    'Properties1': {'Scale': 0}
            }),
            'command_report': 'SENSOR_MULTILEVEL_REPORT',
            'command_report_parser': report => {
				if (report['Sensor Type'] !== 'Luminance (version 1)') return null;

				return report['Sensor Value (Parsed)'];
			}
        },
        'measure_battery': {
            'getOnWakeUp': true,
            'command_class': 'COMMAND_CLASS_BATTERY',
            'command_get': 'BATTERY_GET',
            'command_report': 'BATTERY_REPORT',
            'command_report_parser': report => {
				if (report['Battery Level'] === "battery low warning") return 1;

				if (report.hasOwnProperty('Battery Level (Raw)'))
					return report['Battery Level (Raw)'][0];

				return null;
			}
        }
    },
    settings: {
        "basic_set_level": {
            "index": 2,
            "size": 1
        },
        "pir_sensitivity": {
            "index": 3,
            "size": 1
        },
        "light_threshold": {
            "index": 4,
            "size": 1
        },
        "operation_mode": {
            "index": 5,
            "size": 1,
        },
        "multi_sensor_function_switch": {
            "index": 6,
            "size": 1,
        },
        "pir_re_detect_interval_time": {
            "index": 8,
            "size": 1
        },
        "turn_off_light_time": {
            "index": 9,
            "size": 1
        },
        "auto_report_battery_time": {
            "index": 10,
            "size": 1
        },
        "auto_report_door_window_state_time": {
            "index": 11,
            "size": 1
        },
        "auto_report_illumination_time": {
            "index": 12,
            "size": 1
        },
        "auto_report_temperature_time": {
            "index": 13,
            "size": 1
        }
    }
})
