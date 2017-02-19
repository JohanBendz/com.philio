# Philio Z-Wave devices

This app adds support for Philio Z-Wave devices to Homey.


Supported devices:
* PSM02   motion sensor 4:1
* PSR04   smart color button
* PST02-A motion sensor 4:1
* PST02-C Door/Window 3 in 1 sensor
* PAN11-1 Smart Energy Plug In Switch
* PAN06-1 In Wall Dual relay(1 way) switch module

Currently supported languages:
* English


#Compatibility
Homey version >= 1.1.0


Changelog:

0.0.14
* Added missing parameters for the PAN06-1
* Added missing parameters for the PAN11-1
* Added missing Voltage and Amp Meter for the PAN11-1
* Add support for PAN04-1 In Wall Dual relay with meter
* Fix wrong image for learn mode
* Update z-wave drivers (1.1.4)
* Added battery polling when awake for PSM02/PSR04/PST02-A/PST02-C
* Added fix for settings for PAN11/PAN04/PAN06

0.0.13
* Add support for PAN06-1 In Wall Dual relay(1 way) switch module
* Removed debug marker from some devices

0.0.12
* Add support for PAN11-1 Smart Energy Plug in Switch

0.0.11
* Add support for PST02-C door/windows 3 in 1 sensor (thanks valkhyr1!)

0.0.10
* PSR04 fix driver for global tags support
* Update z-wave drivers (1.1.2)

0.0.9
* Add smart color button PSR04
* Update z-wave drivers (1.0.2)

0.0.8
* Fixt all sensors for PST02-A. Please remove and re-add your devices. If the temperature reports +/- -40 then the settings are in Fahrenheit and the device settings weren't applied correctly. Please update "Operation Mode" and "Customer Function" to another value, click save and change it back to the original values. Otherwise your sensors won't update.

0.0.3
* Added PST02-A motion sensor, updated ZwaveDriver, added 'alarm_contact' capability to PSM02

0.0.1
* First version
