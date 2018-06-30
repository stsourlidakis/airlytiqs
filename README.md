# AirLytiQs
## Overview
Developed during [#CityChallenge crowdhackathon by Crowdpolicy](http://crowdhackathon.com/smartcity2/en/).
The system measures various environmental parameters and sends them via GPRS to an endpoint, from where data is collected, stored, analyzed and presented in a simple webapp in -mostly- graphical form.

## Tech
### Software
* Database: [PostgreSQL](https://www.postgresql.org/)
* Backend/API: [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/)
* Frontend: HTML/CSS/JS
* Maps: [OpenLayers](https://openlayers.org/), [OpenStreetMap](https://www.openstreetmap.org/about)

### Hardware
* Arduino Pro 5V/16MHz
* [Optical Dust Sensor - GP2Y1010AU0F](https://www.sparkfun.com/products/9689)
* [Carbon Monoxide Sensor - MQ-7](https://www.sparkfun.com/products/9403)
* [SI1145 UV/Vis/IR](https://learn.adafruit.com/adafruit-si1145-breakout-board-uv-ir-visible-sensor)
* [SIM800 GPRS modem](https://www.ebay.com/itm/SIM800L-GPRS-GSM-Module-Micro-SIM-Card-Board-Quad-band-TTL-Serial-Port-Arduino/323211994162?hash=item4b40efa432:g:PtwAAOSwqbxaRbTw)
* [LM2596 Step down switcing DC/DC PSU](https://www.ebay.com/itm/2-Pieces-3A-DC-DC-Adjustable-Converter-Step-down-Power-Supply-replace-NI-LM2596S/282226498932?hash=item41b6029d74:g:gBUAAOSwBahVJV-S)

License: [MIT](https://tldrlegal.com/license/mit-license)