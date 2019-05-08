# Philio Z-Wave devices

This app adds support for Philio Z-Wave devices to Homey.


Supported devices:
* PAN04     In wall dual relay (1 way) switch module
* PAN06     In wall dual relay (1 way) switch module
* PAN07     Smart in wall dual relay switch module
* PAN08     In wall roller shutter module
* PAN11     Smart Energy Plug In Switch
* PAN16     Smart Energy Plug In Switch
* PAT02-1A  Flood Multisensor
* PAT02-1B  Temperature and Humidity sensor
* PAT02-1C  Flood sensor
* PSM02     Motion sensor 4:1
* PSP05     Outdoor motion sensor
* PSR04     Smart color button
* PSR07     Smart color button
* PST02-A   Motion sensor 4:1
* PST02-B   Motion sensor 3:1
* PST02-C   Door/Window sensor 3:1

Currently supported languages:
* English
* Dutch (Gedeeltelijk)


#Compatibility
Homey version >= 2.0.4


Changelog:
0.1.1
* PST02 (A/B/C) now will show (approximate) lux, instead of the percentage it only sends, its range is small (only 0 - 500 lux), so keep that in mind.

0.1.0
* Rewrite to SDKv2/meshdriver
* Added (software) tamper cancellation for PAT02-(1A/1B/1C) and PST02-(A/B/C)
* Trying to seperate out PAN11 devices into measuring and non measuring
* Add support PSR07 Smart color button
* Add support PAN07
* Added an ID to PAN08 driver

0.0.30
* Fixed PAN08-1 support
* Fixed any validator issues related to homey v2, further nothing functional changed (preparing SDKv2 rewrite)

0.0.24
* Added a (custom) motion cancellation setting for the PSP05

0.0.23
* Added support for PAN08 roller shutter controller

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
