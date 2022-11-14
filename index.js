// the "main" file
// this is my first npm package i don't know what i'm doing lol

// Export all files in the "lib" folder
exports.BureauOfMeteorology = require('./lib/BureauOfMeteorology');
exports.MeteoAlarm = require('./lib/MeteoAlarm');
exports.MetOffice = require('./lib/MetOffice');
exports.MetService = require('./lib/MetService');
exports.NationalWeatherService = require('./lib/NationalWeatherService');

// Aliases
exports.BOM = exports.BureauOfMeteorology;
exports.MA = exports.MeteoAlarm;
exports.MO = exports.MetOffice;
exports.MS = exports.MetService;
exports.NWS = exports.NationalWeatherService;

module.exports = exports;

// CommonJS ftw!