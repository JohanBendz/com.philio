'use strict';

const Homey = require('homey');

class PSR04Driver extends Homey.Driver {
  async onInit() {
    super.onInit();

    // this.PSR04_onTrigger = this.homey.flow.getTriggerCardDevice('PSR04_on').register();
    this.PSR04_onTrigger = this.homey.flow.getTriggerCard("PSR04_on");
    
    // this.PSR04_offTrigger = this.homey.flow.getTriggerCardDevice('PSR04_off').register();
    this.PSR04_offTrigger = this.homey.flow.getTriggerCard("PSR04_off");

    // this.PSR04_dimTrigger = this.homey.flow.getTriggerCardDevice('PSR04_dim').register();
    this.PSR04_dimTrigger = this.homey.flow.getTriggerCard("PSR04_dim");

    // this.PSR04Condition = this.homey.flow.getConditionCard('PSR04_onoff').register().registerRunListener((args, state) => {
      this.PSR04Condition = this.homey.flow.getConditionCard("PSR04_onoff").registerRunListener((args, state) => {
      return args.device.getCapabilityValue('show_dim_level');
    });
  }
}

module.exports = PSR04Driver;
