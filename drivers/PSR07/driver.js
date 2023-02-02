'use strict';

const Homey = require('homey');

class PSR07Driver extends Homey.Driver {
  onInit() {
    super.onInit();

    // this.PSR07_onTrigger = this.homey.flow.getTriggerCardDevice('PSR07_on').register();
    this.PSR07_onTrigger = this.homey.flow.getTriggerCard('PSR07_on');

    // this.PSR07_offTrigger = this.homey.flow.getTriggerCardDevice('PSR07_off').register();
    this.PSR07_offTrigger = this.homey.flow.getTriggerCard('PSR07_off');

    // this.PSR07_dimTrigger = this.homey.flow.getTriggerCardDevice('PSR07_dim').register();
    this.PSR07_dimTrigger = this.homey.flow.getTriggerCard('PSR07_dim');

    // this.PSR07_sceneTrigger = this.homey.flow.getTriggerCardDevice('PSR07_scene').register().registerRunListener((args, state) => (args.scene === state.scene));
    this.PSR07_sceneTrigger = this.homey.flow.getTriggerCard('PSR07_scene').registerRunListener((args, state) => (args.scene === state.scene));

    // this.PSR07Condition = this.homey.flow.getConditionCard('PSR07_onoff').register().registerRunListener((args, state) => {
    this.PSR07Condition = this.homey.flow.getConditionCard('PSR07_onoff').registerRunListener((args, state) => {      
      return args.device.getCapabilityValue('show_dim_level');
    });
  }
}

module.exports = PSR07Driver;
