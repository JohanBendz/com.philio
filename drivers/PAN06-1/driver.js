"use strict";
        var path = require('path');
        var ZwaveDriver = require('homey-zwavedriver');
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
                    command_set_parser: value => {
                        return {
                            'Switch Value': (value > 0) ? 255 : 0
                        };
                    },
                    command_report: 'SWITCH_BINARY_REPORT',
                    command_report_parser: report => report['Value'] === 'on/enable'
                }
            },
            settings: {
                "mode_selection": {
                    "index": 1,
                    "size": 1
                },
                "edge_pulse_edge_toggle_mode": {
                    "index": 2,
                    "size": 1
                },
                "restore_switch_state_mode": {
                    "index": 3,
                    "size": 1
                },
                "auto_off_timer": {
                    "index": 4,
                    "size": 2
                },
                "rf_off_command ": {
                    "index": 5,
                    "size": 1
                },
                "existence_endpoint3 ": {
                    "index": 6,
                    "size": 1
                }
            }
        });
