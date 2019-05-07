'use strict';

const Homey = require('homey');
const motionCancellation = {};
const tamperCancellation = {};

class PAT02BDriver extends Homey.Driver {
  onInit() {
    super.onInit();

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

module.exports = PAT02BDriver;
