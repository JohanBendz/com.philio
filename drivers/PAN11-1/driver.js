"use strict";
        var path = require('path');
        var ZwaveDriver = require('homey-zwavedriver');
// Product Name:    Smart Energy Plug In Switch PAN11-1
// Brand Name:    Philio
// Product Line:    Philio Z-Wave Product
// Product Code:    PAN11-1
// Product Version:    1.1

        module.exports = new ZwaveDriver(path.basename(__dirname), {
            capabilities: {
                onoff: [
                    {
                        command_class: 'COMMAND_CLASS_SWITCH_BINARY',
                        command_set: 'SWITCH_BINARY_SET',
                        command_set_parser: value => ({
                            'Switch Value': value,
                        }),
                    },
                    {
                        command_class: 'COMMAND_CLASS_BASIC',
                        command_get: 'BASIC_GET',
                        command_report: 'BASIC_REPORT',
                        command_report_parser: report => {
                            if (report.hasOwnProperty('Current Value')) return report['Current Value'] !== 0;
                            if (report.hasOwnProperty('Value')) return report['Value'] !== 0;
                            return null;
                        },
                    },
                ],
                measure_power: {
                    command_class: 'COMMAND_CLASS_METER',
                    command_get: 'METER_GET',
                    command_get_parser: () => ({
                        'Sensor Type': 'Electric meter',
                        'Properties1': {
                            'Scale': 0,
                        },
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
                        'Sensor Type': 'Electric meter',
                        'Properties1': {
                            'Scale': 2,
                        },
                    }),
                    command_report: 'METER_REPORT',
                    command_report_parser: report => {
                        if (report.hasOwnProperty('Properties2') &&
                            report.Properties2.hasOwnProperty('Scale bits 10') &&
                            report.Properties2['Scale bits 10'] === 0) {
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
                }
            }
        });
