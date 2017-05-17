'use strict';
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// Outdoor Motion Sensor PSP05
// http://www.vesternet.com/downloads/dl/file/id/1761/product/2836/z_wave_philio_motion_sensor_psp05_gen5_manual.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		alarm_motion: {
			command_class: 'COMMAND_CLASS_NOTIFICATION',
			command_get: 'NOTIFICATION_GET',
			command_get_parser: () => ({
				'V1 Alarm Type': 7,
				'Notification Type': 'Home Security',
				Event: 8
			}),
			command_report: 'NOTIFICATION_REPORT',
			command_report_parser: report => {
				if (report && report['Notification Type'] === 'Home Security') return report['Event'] === 8;
				return null;
			},
		},
		alarm_tamper: {
			command_class: 'COMMAND_CLASS_NOTIFICATION',
			command_get: 'NOTIFICATION_GET',
			command_get_parser: () => ({
				'V1 Alarm Type': 7,
				'Notification Type': 'Home Security',
				Event: 3
			}),
			command_report: 'NOTIFICATION_REPORT',
			command_report_parser: report => {
				if (report && report['Notification Type'] === 'Home Security') return report['Event'] === 3;
				return null;
			},
		},
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_get: 'BATTERY_GET',
			command_report: 'BATTERY_REPORT',
			command_report_parser: report => {
				if(report['Battery Level'] === "battery low warning") return 1;
				if(typeof report['Battery Level (Raw)'] !== 'undefined') return report['Battery Level (Raw)'][0];
				return null;
			}
		}
	},
	settings: {
		group_2_value: {
			index: 2,
			size: 1,
			signed: false,
		},
		pir_sensitivity: {
			index: 3,
			size: 1,
		},
		motion_cancellation_delay: {
			index: 8,
			size: 1,
			parser: newValue => new Buffer([Math.round(newValue / 8)]),
		},
		group_2_off_time: {
			index: 9,
			size: 1,
			parser: newValue => new Buffer([Math.round(newValue / 8)]),
		}
		battery_report_interval: {
			index: 10,
			size: 1,
		}
		battery_interval_range: {
			index: 20,
			size: 1,
		}
	}
});
