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
const parser = new Parser({
    // This is required to grab the data prefixed with "cap:"
    customFields: {
        item: [
            ['cap:event', 'alert'],
            ['cap:effective', 'start_date'],
            ['cap:expires', 'end_date'],
            ['cap:areaDesc', 'region'],
            ['cap:severity', 'severity'],
            ['cap:urgency', 'urgency'],
            ['cap:certainty', 'certainty'],
            ['cap:status', 'status'],
            ['cap:msgType', 'msgType']
        ]
    }
});
module.exports.getAlerts = function getAlerts(region) {
    return __awaiter(this, void 0, void 0, function* () {
        // As the NWS has a list for National, then State, then County, we cannot check if the region is valid.
        // Instead, we will just catch the error if it is invalid.
        try {
            const feed = yield parser.parseURL(`https://alerts.weather.gov/cap/${region}.php?x=1`);
            const alerts = [];
            feed.items.forEach(item => {
                // After reading the docs, I managed to grab all the missing data from the feed.
                let alert = item.alert;
                // Grab the regions by splitting the region string by semi-colons.
                let regions = item.region.split(';');
                const alertObj = {
                    severity: item.severity,
                    alert: alert,
                    region: regions,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    link: item.link,
                    description: item.summary,
                    issueDate: new Date(item.pubDate),
                    urgency: item.urgency,
                    certainty: item.certainty,
                    status: item.status,
                    msgType: item.msgType,
                    author: item.author
                };
                //console.log(item)
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
