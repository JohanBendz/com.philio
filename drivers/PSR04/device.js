'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PSR04 extends ZwaveDevice {
	async onNodeInit() {
		// REGISTER FLOWS
		this._triggerOn = this.driver.PSR04_onTrigger;
		this._triggerOff = this.driver.PSR04_offTrigger;
		this._triggerDim = this.driver.PSR04_dimTrigger;

		// REGISTER CAPABILITIES
		this.registerCapability('show_dim_level', 'BASIC', {
			report: 'BASIC_SET',
			reportParser: report => {
				if (report && report.hasOwnProperty('Value')) {
					const dimLevel = {
						"dim": report.Value / 99
					};

					if (report.Value > 0) this._triggerOn.trigger(this, dimLevel, null);
					else  this._triggerOff.trigger(this, null, null);

					this._triggerDim.trigger(this, dimLevel, null);

					return report.Value / 99;
				}
				return null;
			}
		});

		this.registerCapability('measure_battery', 'BATTERY');

		// REGISTER SETTINGS
		this.registerSetting(251, (value, settings) => Buffer.from([ Math.round( parseInt(value) + (settings[251] ? 0 : 2)) ]));
		this.registerSetting(252, (value, settings) => Buffer.from([ Math.round( parseInt(value) + (settings[252] ? 0 : 2)) ]));
	}
}

module.exports = PSR04;
