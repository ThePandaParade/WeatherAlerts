const Parser = require('rss-parser');
const parser = new Parser();

import { NWSAlert } from "./WeatherAlert";

module.exports.getAlerts = async function getAlerts(region) {
    // As the NWS has a list for National, then State, then County, we cannot check if the region is valid.
    // Instead, we will just catch the error if it is invalid.
    try {
        const feed = await parser.parseURL(`https://alerts.weather.gov/cap/${region}.php?x=1`);
        const alerts = [];
        feed.items.forEach(item => {
            // For some reason, the parser won't parse anything with the "cap:" prefix, so I can't get the full data.
            // If anyone knows how to fix this, please contribute to the project!
            
            // Grab the alert by grabbing everything before "issued" in the title
            let alert = item.title.substring(0, item.title.indexOf("issued"));
            // Remove any trailing whitespace
            alert = alert.trim();

            const alertObj: NWSAlert = {
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
}