// Export everything as a module from the lib directory

declare module "weatheralerts"

export const BureauOfMeteorology = require('./lib/BureauOfMeteorology');
export const MeteoAlarm = require('./lib/MeteoAlarm');
export const MetOffice = require('./lib/MetOffice');
export const MetService = require('./lib/MetService');
export const NationalWeatherService = require('./lib/NationalWeatherService');

export const BOM = BureauOfMeteorology;
export const MA = MeteoAlarm;
export const MO = MetOffice;
export const MS = MetService;
export const NWS = NationalWeatherService;

export const Australia = BureauOfMeteorology;
export const Europe = MeteoAlarm;
export const UK = MetOffice;
export const NewZealand = MetService;
export const US = NationalWeatherService;
