'use strict';

const Homey = require('homey');

class PSR04Driver extends Homey.Driver {
  onInit() {
    super.onInit();

    this.PSR04_onTrigger = new Homey.FlowCardTriggerDevice('PSR04_on').register();
    this.PSR04_offTrigger = new Homey.FlowCardTriggerDevice('PSR04_off').register();
    this.PSR04_dimTrigger = new Homey.FlowCardTriggerDevice('PSR04_dim').register();

    this.PSR04Condition = new Homey.FlowCardCondition('PSR04_onoff').register().registerRunListener((args, state) => {
        return args.device.getCapabilityValue('show_dim_level');
    });
  }
}

module.exports = PSR04Driver;
