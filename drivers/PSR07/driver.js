'use strict';

const Homey = require('homey');

class PSR07Driver extends Homey.Driver {
  onInit() {
    super.onInit();

    this.PSR07_onTrigger = new Homey.FlowCardTriggerDevice('PSR07_on').register();
    this.PSR07_offTrigger = new Homey.FlowCardTriggerDevice('PSR07_off').register();
    this.PSR07_dimTrigger = new Homey.FlowCardTriggerDevice('PSR07_dim').register();

    this.PSR07_sceneTrigger = new Homey.FlowCardTriggerDevice('PSR07_scene').register().registerRunListener((args, state) => (args.scene === state.scene));

    this.PSR07Condition = new Homey.FlowCardCondition('PSR07_onoff').register().registerRunListener((args, state) => {
      return args.device.getCapabilityValue('show_dim_level');
    });
  }
}

module.exports = PSR07Driver;
