'use strict';

const Homey = require('homey');
const motionCancellation = {};
const tamperCancellation = {};

class PSP05Driver extends Homey.Driver {
  onInit() {
    super.onInit();

    this.motionTimeout = function(nodeID, timeOut) {
      if (motionCancellation.hasOwnProperty(nodeID.token)) {
        clearTimeout(motionCancellation[nodeID.token]);
				motionCancellation[nodeID.token] = null;
      }
      if (timeOut > 0) {
				if (!motionCancellation.hasOwnProperty(nodeID.token)) motionCancellation[nodeID];
				motionCancellation[nodeID.token] = setTimeout(() => {
					this.getDevice(nodeID).setCapabilityValue('alarm_motion', false);
				}, timeOut * 1000);
			}
    }

    this.tamperTimeout = function(nodeID, timeOut) {
      if (tamperCancellation.hasOwnProperty(nodeID.token)) {
        clearTimeout(tamperCancellation[nodeID.token]);
				tamperCancellation[nodeID.token] = null;
      }
      if (timeOut > 0) {
				if (!tamperCancellation.hasOwnProperty(nodeID.token)) tamperCancellation[nodeID];
				tamperCancellation[nodeID.token] = setTimeout(() => {
					this.getDevice(nodeID).setCapabilityValue('alarm_tamper', false);
				}, timeOut * 1000);
			}
    }
  }
}

module.exports = PSP05Driver;
