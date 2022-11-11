# Weather Alerts Library

## A library written in TypeScript for recieving weather alerts from several different countries.

### Currently supported countries:

- [x] United Kingdom (Met Office)
- [x] United States (National Weather Service)
- [ ] Canada (Enviroment Canada / Alert Ready)
- [x] New Zealand (MetService)
- [ ] Australia (Bureau of Meteorology) *1
- [x] Ireland (Met Éireann)
- [ ] Germany (Deutscher Wetterdienst)*2
- [ ] France (Météo France)*2
- [ ] Netherlands (KNMI)*2
- [ ] Belgium (Royal Meteorological Institute of Belgium)*2
- [ ] Denmark (Meteorological Institute of Denmark)*2
- [ ] Norway (Meteorological Institute of Norway)*2
- [ ] Sweden (SMHI)*2
- [ ] Finland (Finnish Meteorological Institute)*2
- [ ] Spain (AEMET)*2
- [ ] Portugal (IPMA)*2
- [ ] Italy (Agenzia Nazionale per le Forecast e la Meteorologia)*2
- [ ] Switzerland (MeteoSwiss)*2
- [ ] Austria (ZAMG)*2
- [ ] Poland (Polish Meteorological Service)*2

*1 - The Bureau of Meteorology code is written, however, it results in a 403 error. I am unsure if this is my fault or TBOM's fault.  
*2 - MeteoAlarm is used for these countries. And it threw a 406 error. How is it not acceptable? I have no idea. I am working on a fix for this.

### How to use:

```typescript
import { MetOffice } from "weather-alerts";

MetOffice.getAlerts().then(alerts => {
    console.log(alerts);
});
```

### Notices:

- Most of the time, the meterological offices in the supported countries will require you to link to any active alerts. Please check the terms and conditions of the weather alert service you are using before using this library.
- This library is not affiliated with any of the weather alert services listed above.
- Some of the alerts may not be in English. This is due to the fact that the weather alert services do not provide an English translation of the alert. This library will return the alert in the language it is provided in. However, the following countries do provide an English translation of the alert: United Kingdom, United States, New Zealand, Australia, Ireland.
