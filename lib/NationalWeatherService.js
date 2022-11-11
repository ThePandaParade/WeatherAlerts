"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser = require('rss-parser');
const parser = new Parser();
module.exports.getAlerts = function getAlerts(region) {
    return __awaiter(this, void 0, void 0, function* () {
        // As the NWS has a list for National, then State, then County, we cannot check if the region is valid.
        // Instead, we will just catch the error if it is invalid.
        try {
            const feed = yield parser.parseURL(`https://alerts.weather.gov/cap/${region}.php?x=1`);
            const alerts = [];
            feed.items.forEach(item => {
                // For some reason, the parser won't parse anything with the "cap:" prefix, so I can't get the full data.
                // If anyone knows how to fix this, please contribute to the project!
                // Grab the alert by grabbing everything before "issued" in the title
                let alert = item.title.substring(0, item.title.indexOf("issued"));
                // Remove any trailing whitespace
                alert = alert.trim();
                const alertObj = {
                    severity: "Unknown",
                    alert: alert,
                    region: "Unknown",
                    start_date: "Unknown",
                    end_date: "Unknown",
                    link: item.link,
                    description: item.summary,
                    issueDate: new Date(item.pubDate)
                };
                alerts.push(alertObj);
            });
            return alerts;
        }
        catch (err) {
            console.log(err);
            throw new Error("Invalid region provided. Please check the region and try again. For a list of regions, see https://alerts.weather.gov/ and click on the ATOM link.");
        }
    });
};
