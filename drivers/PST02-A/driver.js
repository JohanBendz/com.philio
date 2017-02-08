"use strict";
        const path = require('path');
        const ZwaveDriver = require('homey-zwavedriver');
// Product Name:	Slim Multi-Sensor PST02-A
// Brand Name:	Philio
// Product Line:	Philio Z-Wave Product
// Product Code:	PST02-A
// Product Version:	1.0
        module.exports = new ZwaveDriver(path.basename(__dirname), {
            capabilities: {
                'alarm_motion': {
                    'command_class': 'COMMAND_CLASS_SENSOR_BINARY',
                    'command_report': 'SENSOR_BINARY_REPORT',
                    'command_report_parser': function (report) {
                        if (report['Sensor Type'] === 'Motion') {
                            return report['Sensor Value'] === 'detected an event';
                        }

                        return null;
                    }
                },
                'alarm_contact': {
                    'command_class': 'COMMAND_CLASS_SENSOR_BINARY',
                    'command_report': 'SENSOR_BINARY_REPORT',
                    'command_report_parser': function (report) {
                        if(report['Sensor Type'] === 'Door/Window') {
                            return report['Sensor Value'] === 'detected an event';
                        }

                        return null;
                    }
                },
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
                'measure_temperature': {
                    'command_class': 'COMMAND_CLASS_SENSOR_MULTILEVEL',
                    'command_get': 'SENSOR_MULTILEVEL_GET',
                    'command_get_parser': function () {
                        return {
                            'Sensor Type': "Temperature (version 1)",
                            'Properties1': { 'Scale': 0 }
                        }
                    },
                    'command_report': 'SENSOR_MULTILEVEL_REPORT',
                    'command_report_parser': function (report) {
                        if(report['Sensor Type'] !== 'Temperature (version 1)') {
                            return null;
                        } else {
                            return report['Sensor Value (Parsed)'];
                        }
                    }
                },

                'measure_luminance': {
                    'command_class': 'COMMAND_CLASS_SENSOR_MULTILEVEL',
                    'command_get': 'SENSOR_MULTILEVEL_GET',
                    'command_get_parser': function () {
                        return {
                            'Sensor Type': "Luminance (version 1)",
                            'Properties1': {'Scale': 0 }
                        }
                    },
                    'command_report': 'SENSOR_MULTILEVEL_REPORT',
                    'command_report_parser': function (report) {
                        if(report['Sensor Type'] !== 'Luminance (version 1)') {
                            return null;
                        }else{
                            return report['Sensor Value (Parsed)'];
                        }


                    }
                },

                'measure_battery': {
                    'command_class': 'COMMAND_CLASS_BATTERY',
					'command_get': 'BATTERY_GET',
                    'command_report': 'BATTERY_REPORT',
                    'command_report_parser': function (report) {
                        if(report['Battery Level'] === "battery low warning") {
                            return 1;
                        } else {
                            return report['Battery Level (Raw)'][0];
                        }
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
                },
                "auto_report_tick_interval": {
                    "index": 20,
                    "size": 1
                },
                "temperature_differential_report": {
                    "index": 21,
                    "size": 1
                },
                "illumination_differential_report": {
                    "index": 22,
                    "size": 1
                }
            }
        })
