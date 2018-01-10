# Philio Z-Wave devices

This app adds support for Philio Z-Wave devices to Homey.


Supported devices:
* PSM02   motion sensor 4:1
* PSP05   outdoor motion sensor
* PSR04   smart color button
* PAT02-1A Flood Multisensor
* PAT02-1B Temperature and Humidity sensor
* PAT02-1C Flood sensor
* PST02-A motion sensor 4:1
* PST02-C Door/Window 3 in 1 sensor
* PAN11-1* Smart Energy Plug In Switch
* PAN16-1 Smart Energy Plug In Switch
* PAN04-1* In Wall Dual relay(1 way) switch module
* PAN06-1* In Wall Dual relay(1 way) switch module

Currently supported languages:
* English


#Compatibility
Homey version >= 1.1.0


Changelog:

0.0.23
* Added support for PAN08 ruller shutter controller

0.0.22
* Added support for Z-wave+ versions of PAN11, PAN04, PAN06

0.0.21
* Add support for PAN16-1 Smart Energy Plug-in Switch   

0.0.20
* Add support for PAT02-1A Flood Multisensor   
* Add support for PAT02-1B Temperature and Humidity sensor    
* Add support for PAT02-1C Flood Sensor   

0.0.17
* Fix PSM02: door/window and tamper were working incorrectly

0.0.16
* Add support PSP05 - Outdoor Motion Sensor
* Add proper icons and images PAN04/PAN06/PAN11

0.0.15
* Fix that onOff is not correctly set after restart
* Added missing Voltage and Amp Meter for the PAN11-1
* Update z-wave drivers (1.1.8)

0.0.14
* Added missing parameters for the PAN06-1
* Added missing parameters for the PAN11-1
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
