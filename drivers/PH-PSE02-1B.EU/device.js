'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

const TAMPER_TIMEOUT = 30 * 1000;

class PHPSE021BEU extends ZwaveDevice {

	async onNodeInit() {

//    this.enableDebug();
//    this.printNode();

    this.registerCapability('onoff', 'SWITCH_BINARY');
    this.registerCapability('onoff', 'BASIC');

    // This device does not send a timeout when the tamper period is over. Use a timeout to reset the capability
    this.registerReportListener('SENSOR_BINARY', 'SENSOR_BINARY_REPORT', report => {
      
      if (!report || !report.hasOwnProperty('Sensor Value') || !report.hasOwnProperty('Sensor Type')) return null;

      if (report['Sensor Type'] === 'Tamper' && report['Sensor Value'] === 'detected an event') {
        this.setCapabilityValue('alarm_tamper', true);
        this.tamperTimeOut = setTimeout(() => {
          this.setCapabilityValue('alarm_tamper', false);
        }, TAMPER_TIMEOUT);
      }

    });

    //turn alarm on
    this.homey.flow
    .getActionCard('PH-PSE02-1B.EU-siren_on')
    .registerRunListener(async ( args, state ) => {
        return args.device.getCommandClass("SWITCH_BINARY").SWITCH_BINARY_SET({
          'Switch Value': 255
        });
      });

    //turn alarm off
    this.homey.flow
    .getActionCard('PH-PSE02-1B.EU-siren_off')
    .registerRunListener(( args, state ) => {
        return args.device.getCommandClass("SWITCH_BINARY").SWITCH_BINARY_SET({
          'Switch Value': 0
        });
      });

    //play sound
    this.homey.flow
    .getActionCard('PH-PSE02-1B.EU-alarm_sound')
    .registerRunListener((args, state) => {
        if (args.device.hasCommandClass('BASIC')) {
          return args.device.getCommandClass("BASIC").BASIC_SET({
            'Value': Math.round(args.sound * 1),
          });
        }
        return Promise.reject('Device has no valid command class to play sound');
      });

    //disable siren
    this.homey.flow
    .getActionCard('PH-PSE02-1B.EU-disable_siren')
    .registerRunListener((args, state) => {
        return this.configurationSet({
          index: 29,
          size: 1,
        }, 1);
      });

    //enable siren
    this.homey.flow
    .getActionCard('PH-PSE02-1B.EU-enable_siren')
    .registerRunListener((args, state) => {
        return this.configurationSet({
          index: 29,
          size: 1,
        }, 0);
      });

  }
}

module.exports = PHPSE021BEU;