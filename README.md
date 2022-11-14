# Weather Alerts Library

## A library written in TypeScript for recieving weather alerts from countries around the world.

### Currently supported countries

- [x] United Kingdom (Met Office)
- [x] United States (National Weather Service)
- [ ] Canada (Enviroment Canada / Alert Ready)
- [x] New Zealand (MetService)
- [x] Australia (Bureau of Meteorology) *1
- [x] Ireland (Met Éireann)
- [ ] All European Union member states (MeteoAlarm)*2\*3

*1 - The Bureau of Meteorology code is written, however, it results in a 403 error. I am 100% sure this is BoM's fault. However if you have any ideas on how to fix this, please let me know.  
*2 - And it threw a 406 error. How is it not acceptable? I have no idea. I am working on a fix for this.  
*3 - Austria, Belgium, Bulgaria, Croatia, Republic of Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain and Sweden.

### How to use

NodeJS:

```javascript
const { MeteoAlarm } = require("weather-alerts"); // Import the MeteoAlarm class

MeteoAlarm.getAlerts("Belgium").then((alerts) => { // Get the alerts for Belgium
  console.log(alerts); // Log the alerts
});
```

TypeScript:

```typescript
import { MetOffice } from "weather-alerts"; // Import the MetOffice class

MetOffice.getAlerts("East Midlands").then(alerts => { // Get the alerts for the East Midlands of the UK
    console.log(alerts); // Log the alerts
});
```

### Notices

- Most of the time, the meterological offices in the supported countries will require you to link to any active alerts. Please check the terms and conditions of the weather alert service you are using before using this library.
- This library is not affiliated with any of the weather alert services listed above.
- Some of the alerts may not be in English. This is due to the fact that the weather alert services do not provide an English translation of the alert. This library will return the alert in the language it is provided in. However, the following countries do provide an English translation of the alert: United Kingdom, United States, New Zealand, Australia, Ireland.
