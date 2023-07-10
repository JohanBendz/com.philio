'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class PSR07 extends ZwaveDevice {
	async onNodeInit() {
		// REGISTER FLOWS
		this._triggerOn = this.driver.PSR07_onTrigger;
		this._triggerOff = this.driver.PSR07_offTrigger;
		this._triggerDim = this.driver.PSR07_dimTrigger;
		this._triggerScene = this.driver.PSR07_sceneTrigger;

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

		// CENTRAL SCENE
		let holdTimeout, debounce;

		this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', report => {
			if(report.hasOwnProperty('Properties1') && report.Properties1.hasOwnProperty('Key Attributes') && report.hasOwnProperty('Scene Number')) {

				const buttonValue = {
					button: report['Scene Number'].toString(),
					scene: report.Properties1['Key Attributes']
				};

				// Hold key Scene activation
				if(report.Properties1['Key Attributes'] === 'Key Held Down') {
					this._triggerScene.trigger(this, null, buttonValue);

					buttonValue.scene = 'Key Held Down Single';
					if (!debounce) {
						this._triggerScene.trigger(this, null, buttonValue);
						debounce = true;
					}

					if (holdTimeout) {
						clearTimeout(holdTimeout);
						holdTimeout = null;
					}
					holdTimeout = setTimeout(() => {
						debounce = false;
					}, 600);

				// Rest Scene activation
				} else {
						this._triggerScene.trigger(this, null, buttonValue);
						this._triggerScene.trigger(this, buttonValue, null);
				}
			}
		});
	}
}

module.exports = PSR07;
