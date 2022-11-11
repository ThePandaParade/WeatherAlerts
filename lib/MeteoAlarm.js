"use strict";
// Handles all EU member states.
// Doesn't mean my sanity is intact.
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
// List of known alert images.
const alertImages = {
    "Red Flash_Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t12.png",
    "Red Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t11.png",
    "Red Rain": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t10.png",
    "Red Avalanche": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t9.png",
    "Red Forest_Fire": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t8.png",
    "Red Coastal_Event": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t7.png",
    "Red Low_Trempreature": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t6.png",
    "Red Excessive_Heat": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t5.png",
    "Red Fog": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t4.png",
    "Red Thunderstorm": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t3.png",
    "Red Snow/Ice": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t2.png",
    "Red Wind": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t1.png",
    "Amber Flash_Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t12.png",
    "Amber Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t11.png",
    "Amber Rain": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t10.png",
    "Amber Avalanche": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t9.png",
    "Amber Forest_Fire": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t8.png",
    "Amber Coastal_Event": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t7.png",
    "Amber Low_Trempreature": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t6.png",
    "Amber Excessive_Heat": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t5.png",
    "Amber Fog": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t4.png",
    "Amber Thunderstorm": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t3.png",
    "Amber Snow/Ice": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t2.png",
    "Amber Wind": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t1.png",
    "Yellow Flash_Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t12.png",
    "Yellow Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t11.png",
    "Yellow Rain": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t10.png",
    "Yellow Avalanche": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t9.png",
    "Yellow Forest_Fire": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t8.png",
    "Yellow Coastal_Event": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t7.png",
    "Yellow Low_Trempreature": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t6.png",
    "Yellow Excessive_Heat": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t5.png",
    "Yellow Fog": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t4.png",
    "Yellow Thunderstorm": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t3.png",
    "Yellow Snow/Ice": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t2.png",
    "Yellow Wind": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t1.png",
};
module.exports.getAlerts = function getAlerts(country) {
    return __awaiter(this, void 0, void 0, function* () {
        const feed = yield parser.parseURL(`https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-rss-europe`);
        const alerts = [];
        feed.items.forEach(item => {
            // Check the country by checking if the country is in the title
            if (item.title.includes(country)) {
                // Now, whoever wrote this feed and decided to use RAW HTML in the description, I hate you. So fucking much.
                // Grab the alert by searching for images in the description, then comparing the image to a list of known images.
                let alert = item.description.substring(item.description.indexOf("<img src=") + 10, item.description.indexOf(" alt=") - 1);
                alert = Object.keys(alertImages).find(key => alertImages[key] === alert);
                // Replace the _ with a space
                alert = alert.replace(/_/g, " ");
                // Grab the "from" date by searching for the <i> tag after the alert image, and after "From"
                let from = item.description.substring(item.description.indexOf(alert) + alert.length + 10, item.description.indexOf("</i>"));
                // Remove "from" from the string, and remove the <b> and </b> tags
                from = from.replace("From", "").replace("<b>", "").replace("</b>", "");
                // Do the same with the "until" date
                let until = item.description.substring(item.description.indexOf("Until") + 6, item.description.indexOf("</i>", item.description.indexOf("Until")));
                until = until.replace("<b>", "").replace("</b>", "");
                // Add the alert to the array
                // Cuz this is a legacy feed, we don't have the "level" of the alert, so we just set it to 0
                // Grab the severity from everything before the first space in the alert
                const alertObject = {
                    region: item.title,
                    alert: alert,
                    start_date: from,
                    end_date: until,
                    description: `${alert} alert for ${item.title} from ${from} until ${until}`,
                    severity: alert.substring(0, alert.indexOf(" ")),
                    link: item.link,
                    published: item.pubDate,
                    raw: item.description
                };
                alerts.push(alertObject);
            }
        });
        return alerts;
    });
};
