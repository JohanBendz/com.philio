"use strict";
        var path = require('path');
        var ZwaveDriver = require('homey-zwavedriver');
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
                "Watt Meter Report Period": {
                    "index": 1,
                    "size": 2
                },
                "KWH Meter Report Period": {
                    "index": 2,
                    "size": 2
                },
                "Selected Relay": {
                    "index": 3,
                    "size": 1
                },
                "Edge or Pulse mode or Edge-Toggle mode": {
                    "index": 4,
                    "size": 1
                },
                "Threshold of current for Load Caution": {
                    "index": 5,
                    "size": 2
                },
                "Threshold of KWh for Load Caution": {
                    "index": 6,
                    "size": 2
                },
                "Restore switch state mode": {
                    "index": 7,
                    "size": 1
                },
                "Auto off timer": {
                    "index": 8,
                    "size": 2
                },
                "RF off command mode": {
                    "index": 9,
                    "size": 1
                },
                "Existence of Endpoint3": {
                    "index": 10,
                    "size": 1
                }
            }
        });
