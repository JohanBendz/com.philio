# Philio Z-Wave devices

This app adds support for Philio Z-Wave devices to Homey.


Supported devices:
* PSM02   motion sensor 4:1
* PSR04   smart color button
* PST02-A motion sensor 4:1


Currently supported languages:
* English

#Compatibility
Homey version >= 0.10.4 (due to z-wave rewrite)

#Buy me a beer/pizza/holiday?
[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=KWMTEXY3U6VVN&lc=GB&item_name=HomeyApp&item_number=PhilioApp&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)


Changelog:
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