# Weather Alerts Library

## A library written in TypeScript for recieving weather alerts from several different countries.

### Currently supported countries:

- [x] United Kingdom (Met Office)
- [x] United States (National Weather Service)
- [ ] Canada (Enviroment Canada / Alert Ready)
- [x] New Zealand (MetService)
- [ ] Australia (Bureau of Meteorology) *1
- [ ] Ireland (Met Éireann)
- [ ] Germany (Deutscher Wetterdienst)
- [ ] France (Météo France)
- [ ] Netherlands (KNMI)
- [ ] Belgium (Royal Meteorological Institute of Belgium)
- [ ] Denmark (Meteorological Institute of Denmark)
- [ ] Norway (Meteorological Institute of Norway)
- [ ] Sweden (SMHI)
- [ ] Finland (Finnish Meteorological Institute)
- [ ] Spain (AEMET)
- [ ] Portugal (IPMA)
- [ ] Italy (Agenzia Nazionale per le Forecast e la Meteorologia)
- [ ] Switzerland (MeteoSwiss)
- [ ] Austria (ZAMG)
- [ ] Poland (Polish Meteorological Service)

*1 - The Bureau of Meteorology code is written, however, it results in a 403 error. I am unsure if this is my fault or TBOM's fault.

### How to use:

```typescript
import { MetOffice } from "weather-alerts";

const metOffice = new MetOffice();

metOffice.getAlerts().then(alerts => {
console.log(alerts);
});
```
