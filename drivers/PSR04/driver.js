'use strict';
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
		
// Smart Color Button PSR04
// https://domboo.es/wp-content/uploads/2015/11/Manual-Mando-PSR04-de-Philio.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		'show_dim_level': {
			'command_class': 'COMMAND_CLASS_BASIC',
			'command_report': 'BASIC_SET',
			'command_report_parser': report => {
				let value = report.Value;	
				
				if (value === 99)
					value = 100;
				
				return value;
			}
		},
		
		'measure_battery': {
			'command_class': 'COMMAND_CLASS_BATTERY',
			'command_get': 'BATTERY_GET',
			'command_report': 'BATTERY_REPORT',
			'command_report_parser': report => {
				if(report['Battery Level'] === "battery low warning")
					return 1;
					
				return report['Battery Level (Raw)'][0];
			}
		}
	},
	settings: {
		2: { // Basic ON
			"index": 2,
			"size": 1
		},
		10: { // Auto Battery Report
			"index": 10,
			"size": 1
		},
		251: { // Basic Auto or Basic Touch
			"index": 25,
			"size": 1,
			"parser": (value, settings) => {
				const bit1 = Number(value);
				
				let bit2 = 0;
				if (!settings[252]) bit2 = 2;
				
				return new Buffer([Math.round(bit1 + bit2)]);
			}
		},
		252: { // Buzzer timer mode
			"index": 25,
			"size": 1,
			"parser": (value, settings) => {
				const bit1 = Number(settings[251]);
				
				let bit2 = 0;
				if (!value) bit2 = 2;
				
				return new Buffer([Math.round(bit1 + bit2)]);
			}
		}
	}
});

module.exports.on('initNode', token => {
	const node = module.exports.nodes[token];
	let state = false;
	
	if (node) {
		node.instance.CommandClass['COMMAND_CLASS_BASIC'].on('report', (command, report) => {
			if (command.name === "BASIC_SET") {
				const dimLevel = {
					"dim": report.Value / 100
				};
				
				if (report.Value > 0 && !state) {
					state = true;
					Homey.manager('flow').triggerDevice('PSR04_on', dimLevel, null, node.device_data, err => {
						if (err) return Homey.error(err);
					});
				}
				
				if (report.Value <= 0) {
					state = false;
					Homey.manager('flow').triggerDevice('PSR04_off', null, null, node.device_data, err => {
						if (err) return Homey.error(err);
					});
				}
				
				Homey.manager('flow').triggerDevice('PSR04_dim', dimLevel, null, node.device_data, err => {
					if (err) return Homey.error(err);
				});
			}
		});
	}
});

Homey.manager('flow').on('condition.PSR04_onoff', (callback, args) => {
	const node = module.exports.nodes[args.device_data['token']];
	
	if (node &&
	node.hasOwnProperty("state") &&
	node.state.hasOwnProperty("show_dim_level") &&
	node.state.show_dim_level > 0) {
		return callback(null, true);
	}
	
	return callback(null, false);
});
